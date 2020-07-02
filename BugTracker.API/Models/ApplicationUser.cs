using Microsoft.AspNetCore.Identity; 

namespace BugTracker.API.Models
{
    public class Userss : IdentityUser
    {
        public string FirstName { get; set; }  
        public string LastName { get; set; }
    }
}