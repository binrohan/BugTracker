using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BugTracker.API.Data;
using BugTracker.API.Dtos;
using BugTracker.API.Helpers;
using BugTracker.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.API.Controllers {
    [Route("api/[Controller]")]
    [ApiController]
    public class TicketsController : ControllerBase {
        private readonly IMapper _mapper;
        private readonly IBugTrackerRepository _repo;
        public TicketsController (IBugTrackerRepository repo, IMapper mapper) {
            _repo = repo;
            _mapper = mapper;
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicket(int id)
        {
            var ticket = await _repo.GetTicket(id);
            var ticketToReturn = _mapper.Map<TicketsForDetailed>(ticket);
            return Ok(ticketToReturn);
        }

        [HttpGet("{id}/user")]
        public async Task<IActionResult> GetUserTickets(string id, [FromQuery]TicketParams ticketParams)
        {
            int pageSize = ticketParams.PageSize;
            int pageIndex = ticketParams.PageIndex;
            
            var ticketsFromRepo = await _repo.GetUserTickets(id, ticketParams);

            var tickets =  _mapper.Map<IEnumerable<TicketShortDto>>(ticketsFromRepo);

            return Ok(new {tickets, ticketParams.Length }  );
        }
        
        [HttpGet("{id}/project")]
        public async Task<IActionResult> GetProjectTickets(int id, [FromQuery]TicketParams ticketParams)
        {
            var ticketsFromRepo = await _repo.GetProjectTickets(id, ticketParams);

            var tickets =  _mapper.Map<IEnumerable<TicketShortDto>>(ticketsFromRepo);

            return Ok(new {tickets, ticketParams.Length }  );
        }

        [Authorize(Policy = "ManagerAndAdmin")]
        [HttpPost]
        public async Task<IActionResult> AddTicket(TicketToCreateDto ticketToCreate)
        {
            if(ticketToCreate.userId != null)
            {
                var userFromRepo = await _repo.GetUser(ticketToCreate.userId, false);
                if(userFromRepo == null)
                    return BadRequest();
                if(userFromRepo.project.Id != ticketToCreate.projectId)
                    return BadRequest();
            }

            
            var newTicket = _mapper.Map<Ticket>(ticketToCreate);
            newTicket.project = await _repo.GetProject(ticketToCreate.projectId);
            if(ticketToCreate.userId != null )
                newTicket.User = await _repo.GetUser(ticketToCreate.userId, false);
            if(ticketToCreate.CategoryId != 0 )
                newTicket.Status = await _repo.GetStatus(ticketToCreate.CategoryId);
            if(ticketToCreate.StatusId != 0 )
                newTicket.Category = await _repo.GetCategory(ticketToCreate.CategoryId);
            if(ticketToCreate.PriorityId != 0 )
                newTicket.Priority = await _repo.GetPriority(ticketToCreate.PriorityId);
            
            _repo.Add(newTicket);

            if(await _repo.SaveAll())
            {
                var ticketToReturn = _mapper.Map<TicketsForDetailed>(newTicket);
                return Ok(ticketToReturn);
            }

            throw new Exception("Ticket can't created");
        }

        [Authorize(Policy = "ManagerAndAdmin")]
        [HttpPut("update/{ticketId}")]
        public async Task<IActionResult> UpdateTicket(int ticketId, TicketToUpdateDto ticketToUpdate)
        {          
            var ticketFromRepo =await _repo.GetTicket(ticketId);
 
            if(ticketFromRepo.isArchived)
                BadRequest("Ticket is Archived");
            
            if(ticketToUpdate.UserId == null)
            {
                ticketFromRepo.User = null;
            }
            else if(ticketToUpdate.UserId != null)
            {
                ticketFromRepo.User = await _repo.GetUser(ticketToUpdate.UserId, false);
            }


            ticketFromRepo.Status = await _repo.GetStatus(ticketToUpdate.StatusId);
            ticketFromRepo.Category = await _repo.GetCategory(ticketToUpdate.CategoryId);
            ticketFromRepo.Priority = await _repo.GetPriority(ticketToUpdate.PriorityId);

            _mapper.Map(ticketToUpdate, ticketFromRepo);
            
            if(await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception("Cant be updated the ticket");
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpPut("archive/{ticketId}")]
        public async Task<IActionResult> ArchiveTicket(int ticketId)
        {          
            var ticketFromRepo =await _repo.GetTicket(ticketId);
 
            // if(ticketFromRepo.isArchived)
            //     BadRequest("Ticket is Archived");
            
            
            ticketFromRepo.isArchived = !ticketFromRepo.isArchived;
            //ticketFromRepo.User = null;
            //ticketFromRepo.Status = null;
            //ticketFromRepo.Priority = null;

            
            if(await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception("Cant be updated the ticket");
        }

        [Authorize(Policy = "Manager")]
        [HttpPut("approve/{ticketId}")]
        public async Task<IActionResult> ApproveTicket(int ticketId)
        {          
            var ticketFromRepo =await _repo.GetTicket(ticketId);
 
            if(ticketFromRepo.isArchived)
               return BadRequest("Ticket is Archived");
            
            if(ticketFromRepo.project.Users==null || !ticketFromRepo.project.Users.Contains(_repo.GetUser(User.FindFirst(ClaimTypes.NameIdentifier).Value, false).Result))
                return Unauthorized();
            
            
            ticketFromRepo.isManagerPassed = !ticketFromRepo.isManagerPassed;
            
            if(await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception("Cant be updated the ticket");
        }


        [Authorize(Policy = "Developer")]
        [HttpPut("pass/{ticketId}")]
        public async Task<IActionResult> PassTicket(int ticketId)
        {          
            var ticketFromRepo =await _repo.GetTicket(ticketId);
 
            if(ticketFromRepo.isArchived)
                return BadRequest("Ticket is Archived");

            if(ticketFromRepo.isManagerPassed)
                return BadRequest("Ticket is Approved already");
            
            ticketFromRepo.isDeveloperPassed = !ticketFromRepo.isDeveloperPassed;

            
            if(await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception("Cant be updated the ticket");
        }



        [Authorize(Policy = "RequiredAdminRole")]
        [HttpPut("assign/{ticketId}")]
        public async Task<IActionResult> AssignUser(int ticketId, TicketAssignUserDto ticketAssignUser)
        {
            var ticketFromRepo = await _repo.GetTicket(ticketId);
            if(ticketAssignUser.UserId == null)
            {
                ticketFromRepo.User = null;
            }
            else if(ticketAssignUser.UserId != null)
            {
                ticketFromRepo.User = await _repo.GetUser(ticketAssignUser.UserId, false);
            }
            if(await _repo.SaveAll())
                return NoContent();
            
            throw new Exception("User handle for ticket failed");
        }






        [HttpGet("cate/{cId}")]
        public async Task<IActionResult> GetCategory(int cId)
        {
            var category = await _repo.GetCategory(cId);
            return Ok (category);
        }


        [HttpGet("sta/{sId}")]
        public async Task<IActionResult> GetStatus(int sId)
        {
            var status = await _repo.GetCategory(sId);
            return Ok (status);
        }


        [HttpGet("pri/{pId}")]
        public async Task<IActionResult> GetPriority(int pId)
        {
            var priority = await _repo.GetPriority(pId);
            return Ok (priority);
        }
        
    }
}