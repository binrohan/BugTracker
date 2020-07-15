using System.Linq;
using System.Threading.Tasks;
using BugTracker.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;
        }

        // GET api/values
        
        [HttpGet]
        public async Task<IActionResult> GetValues(){
            var values = "GEtValues";
            return Ok(values); 
        }

        // GET api/values/5
        
        [HttpGet("{id}")]
        public  async Task<IActionResult> GetValues(int id){
            var value = id;
            return Ok(value);
        }
    }
}