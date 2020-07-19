using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BugTracker.API.Data;
using BugTracker.API.Dtos;
using BugTracker.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IBugTrackerRepository _repo;
        private readonly UserManager<User> _userManager;
        private readonly DataContext _context;
        private readonly RoleManager<Role> _roleManager;
        public AdminController(DataContext context, IMapper mapper, IBugTrackerRepository repo, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
            _context = context;
            _userManager = userManager;
            _repo = repo;
            _mapper = mapper;
        }


        // Remove this method later
        [HttpGet ("role")]
        public async Task<IActionResult> GetUsersRoles () {
            
            var users = await _repo.GetUsers();
            var userToReturn =  _mapper.Map<IEnumerable<UserShortDto>>(users);

            foreach (var user in userToReturn)
            {
                var userTemp = await _userManager.FindByEmailAsync(user.Email);
                var Role = await _userManager.GetRolesAsync(userTemp);
                user.Roles = Role;
            }
            return Ok(userToReturn);
        }
    }
}