using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BugTracker.API.Data;
using BugTracker.API.Dtos;
using BugTracker.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IBugTrackerRepository _repo;
        private readonly UserManager<User> _userManager;
        public ProjectsController(IBugTrackerRepository repo, IMapper mapper, UserManager<User> userManager)
        {
            _userManager = userManager;
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var project = await _repo.GetProject(id);
            var projectToReturn = _mapper.Map<ProjectsForDetailed>(project);
            foreach (var user in projectToReturn.Users)
            {
                var userTemp = await _userManager.FindByEmailAsync(user.Email);
                var roles = await _userManager.GetRolesAsync(userTemp);
                user.Roles = roles;
            }
            return Ok(projectToReturn);
        }

        [HttpGet("list/{isArchived}")]
        public async Task<IActionResult> GetProjects(bool isArchived)
        {
            var projects = await _repo.GetProjects(isArchived);
            var projectsForReturn = _mapper.Map<IEnumerable<ProjectShortDto>>(projects);

            return Ok(projectsForReturn);
        }

        [HttpPost("{id}/add")]
        public async Task<IActionResult> AddProject(string id, ProjectToCreateDto projectToCreate)
        {
            if (!id.Equals((User.FindFirst(ClaimTypes.NameIdentifier)).Value))
                return Unauthorized();

            var newProject = _mapper.Map<Project>(projectToCreate);

            _repo.Add(newProject);

            if (await _repo.SaveAll())
            {
                var projectToReturn = _mapper.Map<ProjectsForDetailed>(newProject);
                return Ok(projectToReturn);
            }

            throw new Exception("Project can't created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, ProjectForUpdateDto projectForUpdate)
        {
            var projectFormRepo = await _repo.GetProject(id);

            if (projectFormRepo.isArchived)
                BadRequest("Project is Archived");

            _mapper.Map(projectForUpdate, projectFormRepo);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"updating project {id} failed to update");
        }

        [HttpPut("{id}/assign")]
        public async Task<IActionResult> AssignUsers(int id, AssignedUsersDto assignedUsers)
        {
            var projectFromRepo = await _repo.GetProject(id);
            if (projectFromRepo.isArchived)
                return BadRequest("Project is Archived");


            // if(projectFromRepo.isManagerAssinged)
            //     return BadRequest("Manager Already Assinged");
            
            // var managerFromRepo = await _repo.GetUser(assignedUsers.ManagerId, false);
            // managerFromRepo.project = projectFromRepo;
            // projectFromRepo.isManagerAssinged = true;


            foreach (var userId in assignedUsers.userId)
            {
                var userFromRepo = await _repo.GetUser(userId, false);
                if (userFromRepo.project == null)
                {
                    userFromRepo.project = await _repo.GetProject(id);
                }
                else if(userFromRepo.project != null)
                {
                    if(userFromRepo.Tickets.Count > 0)
                    {
                        continue;
                    }
                    userFromRepo.project = null;
                }
                    

                if (!await _repo.SaveAll())
                    return BadRequest("Failed on Save");
            }

            return NoContent();
        }
    }
}