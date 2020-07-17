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
    [Route ("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase {
        private readonly IMapper _mapper;
        private readonly IBugTrackerRepository _repo;
        public ProjectsController (IBugTrackerRepository repo, IMapper mapper) {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var project = await _repo.GetProject(id);
            var projectToReturn = _mapper.Map<ProjectsForDetailed>(project);
            return Ok(projectToReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var projects = await _repo.GetProjects();
            var projectsForReturn =  _mapper.Map<IEnumerable<ProjectShortDto>>(projects);
            return Ok(projectsForReturn);
        }

        [HttpPost("{id}/add")]
        public async Task<IActionResult> AddProject(string id, ProjectToCreateDto projectToCreate)
        {   
            if (!id.Equals((User.FindFirst(ClaimTypes.NameIdentifier)).Value))
                return Unauthorized();

            var newProject = _mapper.Map<Project>(projectToCreate);

            _repo.Add(newProject);

            if(await _repo.SaveAll())
            {
                var projectToReturn = _mapper.Map<ProjectsForDetailed>(newProject);
                return Ok(projectToReturn);
            }

            throw new Exception("Project can't created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(string id, ProjectForUpdateDto projectForUpdate)
        {
            if(!id.Equals((User.FindFirst(ClaimTypes.NameIdentifier)).Value))
                return Unauthorized();
            
            var projectFormRepo = await _repo.GetProject(projectForUpdate.ProjectId);
            _mapper.Map(projectForUpdate,projectFormRepo);

            if(await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"updating project {projectForUpdate.ProjectId} failed to update");
        }
    }
}