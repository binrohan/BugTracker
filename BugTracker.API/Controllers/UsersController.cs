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

namespace BugTracker.API.Controllers
{
    // [ServiceFilter(typeof(logUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IBugTrackerRepository _repo;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public UsersController(IBugTrackerRepository repo, IMapper mapper, UserManager<User> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var currentUserId = (User.FindFirst(ClaimTypes.NameIdentifier).Value);
            bool isCurrentUser = String.Equals(currentUserId, id);

            var user = await _repo.GetUser(id, isCurrentUser);

            var userToReturn = _mapper.Map<UserForDetailed>(user);

            userToReturn.Roles = await _userManager.GetRolesAsync(user);
        
            return Ok(userToReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            var usersToReturn =  _mapper.Map<IEnumerable<UserShortDto>>(users);

            foreach (var user in usersToReturn)
            {
                var userTemp = await _userManager.FindByEmailAsync(user.Email);
                var roles = await _userManager.GetRolesAsync(userTemp);
                user.Roles = roles;
            }
            return Ok(usersToReturn);
        }

        [HttpGet("free")]
        public async Task<IActionResult> GetfreeUsers()
        {
            var users = await _repo.GetFreeUsers();
            var usersToReturn =  _mapper.Map<IEnumerable<UserShortDto>>(users);

            foreach (var user in usersToReturn)
            {
                var userTemp = await _userManager.FindByEmailAsync(user.Email);
                var roles = await _userManager.GetRolesAsync(userTemp);
                user.Roles = roles;
            }
            return Ok(usersToReturn);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, UserToUpdateDto userToUpdate)
        {
            if (!id.Equals(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id, false);

            _mapper.Map(userToUpdate, userFromRepo);

            if (await _repo.SaveAll())
                return Ok(userFromRepo);

            throw new Exception("Failed to save");
        }
    }
}