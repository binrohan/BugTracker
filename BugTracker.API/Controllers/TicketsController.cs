using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BugTracker.API.Data;
using BugTracker.API.Dtos;
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
        public async Task<IActionResult> GetProjects()
        {
            var tickets = await _repo.GetTickets();
            var ticketsForReturn =  _mapper.Map<IEnumerable<TicketShortDto>>(tickets);
            return Ok(ticketsForReturn);
        }
        
    }
}