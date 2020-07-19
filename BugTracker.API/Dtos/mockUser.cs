using System.Collections.Generic;
using BugTracker.API.Models;

namespace BugTracker.API.Dtos
{
    public class mockUser
    {
        public string name { get; set; }
        public string UserId { get; set; }
        public string Email { get; set; }
        public IList<string> Roles { get; set; }
    }
}