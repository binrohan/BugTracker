using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BugTracker.API.Data;
using BugTracker.API.Dtos;
using BugTracker.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.API.Controllers {
    // [ServiceFilter(typeof(logUserActivity))]
    [Route ("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase {
        private readonly IBugTrackerRepository _repo;
        private readonly IMapper _mapper;
        public UsersController (IBugTrackerRepository repo, IMapper mapper) {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet ("{id}")]
        public async Task<IActionResult> GetUser (string id) 
        {
            var currentUserId = (User.FindFirst (ClaimTypes.NameIdentifier).Value);
            bool isCurrentUser = String.Equals (currentUserId, id);
            var user = await _repo.GetUser (id, isCurrentUser);
            var userToReturn = _mapper.Map<UserForDetailed> (user);
            return Ok (userToReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers () {
            var users = await _repo.GetUsers ();
            var usersForReturn = _mapper.Map<IEnumerable<UserShortDto>> (users);
            
            return Ok (usersForReturn);
        }
    }
}