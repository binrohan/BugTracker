using BugTracker.API.Models;

namespace BugTracker.API.Dtos
{
    public class UserShortDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }       
    }
}