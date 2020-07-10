using System.Threading.Tasks;
using AutoMapper;
using BugTracker.API.Data;
using BugTracker.API.Dtos;
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
            return Ok(projects);
        }
    }
}