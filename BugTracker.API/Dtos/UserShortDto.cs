using System;
using System.Collections.Generic;
using BugTracker.API.Models;

namespace BugTracker.API.Dtos
{
    public class UserShortDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime Joined { get; set; }
        public IList<string> Roles { get; set; }   

        public int ProjectId { get; set; }  
    }
}