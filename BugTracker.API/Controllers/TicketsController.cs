using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BugTracker.API.Data;
using BugTracker.API.Dtos;
using BugTracker.API.Models;
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

        [HttpGet("list/{isArchived}")]
        public async Task<IActionResult> GetTickets(bool isArchived)
        {
            var tickets = await _repo.GetTickets(isArchived);
            var ticketsForReturn =  _mapper.Map<IEnumerable<TicketShortDto>>(tickets);
            return Ok(ticketsForReturn);
        }

        [HttpPost]
        public async Task<IActionResult> AddTicket(TicketToCreateDto ticketToCreate)
        {
            if(ticketToCreate.userId != null)
            {
                var userFromRepo = await _repo.GetUser(ticketToCreate.userId, false);
                if(userFromRepo == null)
                    return BadRequest();
                if(userFromRepo.project.Id != ticketToCreate.CategoryId)
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

        [HttpPut("update/{ticketId}")]
        public async Task<IActionResult> UpdateTicket(int ticketId, TicketToUpdateDto ticketToUpdate)
        {          
            var ticketFromRepo =await _repo.GetTicket(ticketId);
 
            if(ticketFromRepo.isArchived)
                BadRequest("Ticket is Archived");
            

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

        [HttpPut("assign/{ticketId}")]
        public async Task<IActionResult> AssignUser(int ticketId, TicketAssignUserDto ticketAssignUser)
        {Console.WriteLine("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            var ticketFromRepo = await _repo.GetTicket(ticketId);
            if(ticketAssignUser.toRemove)
            {
                ticketFromRepo.User = null;
            }
            else if(!ticketAssignUser.toRemove)
            {
                if(ticketFromRepo.User != null)
                    return BadRequest();
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