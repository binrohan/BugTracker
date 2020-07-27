using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BugTracker.API.Data;
using BugTracker.API.Dtos;
using BugTracker.API.Helpers;
using BugTracker.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.API.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class CommentsController : ControllerBase {
        private readonly IMapper _mapper;
        private readonly IBugTrackerRepository _repo;
        public CommentsController (IMapper mapper, IBugTrackerRepository repo) {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{ticketId}")]
        public async Task<IActionResult> GetComments(int ticketId, CommentParams commentParams)
        {
            var commentsFromRepo = await _repo.GetComments(ticketId, commentParams);
            var comments = _mapper.Map<IEnumerable<CommentsToReturn>>(commentParams);

            return Ok( new { comments, commentParams.Length });
        }

        [HttpPost]
        public async Task<IActionResult> AddComment(CommentToCreateDto commentToCreate)
        {
            var commentForAdd =  _mapper.Map<Comment>(commentToCreate);
            commentForAdd.Commenter = await _repo.GetUser(commentToCreate.CommenterId, false);
            commentForAdd.Ticket = await _repo.GetTicket(commentToCreate.TicketId);

            _repo.Add(commentForAdd);

            if(await _repo.SaveAll())
                return Ok(commentForAdd);
            
            throw new Exception ("Commect is not posted"); 
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditComment(int id, CommentToUpdateDto commentToUpdate)
        {
            var commenntFromRepo = await _repo.GetComment(id);

            if(commenntFromRepo.IsDeleted == true)
                return BadRequest();

            _mapper.Map(commenntFromRepo, commentToUpdate);

            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception ("Can't Updated");
        }
    }
}