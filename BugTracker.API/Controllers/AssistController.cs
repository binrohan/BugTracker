using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BugTracker.API.Data;
using BugTracker.API.Dtos;
using BugTracker.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.API.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AssistController : ControllerBase {
        private readonly IMapper _mapper;
        private readonly IBugTrackerRepository _repo;
        public AssistController (IMapper mapper, IBugTrackerRepository repo) {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("cate")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _repo.GetCategories();
            var categoriesToReturn = _mapper.Map<IEnumerable<CategoryToReturn>>(categories);
            

            return Ok(categoriesToReturn);
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpPost("cate")]
        public async Task<IActionResult> SetCategory(CategoryToReturn categoryToCreate)
        {
            var newCategory = _mapper.Map<Category>( categoryToCreate);
            _repo.Add(newCategory);
            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception ("Can not be created"); 
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpDelete("cate/{id}")]
        public async Task<IActionResult> RemoveCategory(int id)
        {
            var categoryFromRepo = await _repo.GetCategory(id);
            _repo.Delete(categoryFromRepo);
            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception ("Delete fail");
        }

        [HttpGet("sta")]
        public async Task<IActionResult> GetStatuses()
        {
            var statuses = await _repo.GetStatuses();
            var statusesToReturn = _mapper.Map<IEnumerable<StatusToReturn>>(statuses);

            return Ok(statusesToReturn);
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpPost("sta")]
        public async Task<IActionResult> SetStatus(StatusToReturn statusToCreate)
        {
            var newStatus = _mapper.Map<Status>( statusToCreate);
            _repo.Add(newStatus );
            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception ("Can not be created"); 
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpDelete("sta/{id}")]
        public async Task<IActionResult> RemoveStatus(int id)
        {
            var statusFromRepo = await _repo.GetStatus(id);
            _repo.Delete(statusFromRepo);
            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception ("Delete fail");
        }

        [HttpGet("pri")]
        public async Task<IActionResult> GetPriorities()
        {
            var priorities = await _repo.GetPriorities();
            var prioritiesToReturn = _mapper.Map<IEnumerable<PriorityToReturn>>(priorities);

            return Ok(prioritiesToReturn);
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpPost("pri")]
        public async Task<IActionResult> SetPriority(PriorityToReturn priorityToCreate)
        {
            var newPriority = _mapper.Map<Priority>( priorityToCreate);
            _repo.Add(newPriority );
            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception ("Can not be created"); 
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpDelete("pri/{id}")]
        public async Task<IActionResult> RemovePriority(int id)
        {
            var priorityFromRepo = await _repo.GetPriority(id);
            _repo.Delete(priorityFromRepo);
            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception ("Delete fail");
        }

        [HttpGet("counts")]
        public async Task<IActionResult> GetCounts()
        {
            var counts = await _repo.Counting();
            return Ok(counts);
        }
    }
}