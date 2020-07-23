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

        [HttpDelete("removeUser/{id}")]
        public async Task<IActionResult> RemoveUser(string id){

            var userFromRepo =  await _userManager.FindByIdAsync(id);

            _repo.Delete(userFromRepo);

            if(await _repo.SaveAll())
                return NoContent();
            
            throw new Exception (userFromRepo.UserName+" unable to remove");
        }

        [HttpPost("editRoles/{uId}")]
        public async Task<IActionResult> EditRoles(string uId, RoleEditDto roleEdit)
        {
            var user = await _userManager.FindByIdAsync(uId);

            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = roleEdit.RoleNames;

            selectedRoles = selectedRoles ?? new string[] { };
            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded)
                return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded)
                return BadRequest("Failed to remove the roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }
    }
}