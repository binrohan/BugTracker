using System.Threading.Tasks;
using BugTracker.API.Data;
using BugTracker.API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Dashboard : ControllerBase
    {   
        private readonly IBugTrackerRepository _repo;
        public Dashboard(IBugTrackerRepository repo)
        {
            _repo = repo;
        }

        
    }
}