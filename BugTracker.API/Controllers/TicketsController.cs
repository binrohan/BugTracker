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

        [HttpGet]
        public async Task<IActionResult> GetTickets()
        {
            var tickets = await _repo.GetTickets();
            var ticketsForReturn =  _mapper.Map<IEnumerable<TicketShortDto>>(tickets);
            return Ok(ticketsForReturn);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> AddTicket(string id, TicketToCreateDto ticketToCreate)
        {
            if (!id.Equals((User.FindFirst(ClaimTypes.NameIdentifier)).Value))
                return Unauthorized();

            if(await _repo.GetUser(ticketToCreate.userId, false) == null)
                return BadRequest();
            
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

        [HttpPut("{uId}/update/{ticketId}")]
        public async Task<IActionResult> UpdateTicket(string uId, int ticketId, TicketToUpdateDto ticketToUpdate)
        {
            if (!uId.Equals((User.FindFirst(ClaimTypes.NameIdentifier)).Value))
                return Unauthorized();
            
            var ticketFromRepo =await _repo.GetTicket(ticketId);

            ticketFromRepo.User = await _repo.GetUser(ticketToUpdate.userId, false);
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