using System;
using System.Collections.Generic;
using BugTracker.API.Models;
using Microsoft.AspNetCore.Identity;

namespace BugTracker.API.Dtos
{
    public class UserForSend 
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public DateTime Joined { get; set; }
        public string Description { get; set; }
        public string Adrs_Local { get; set; }
        public string Adrs_City { get; set; }
        public string Adrs_Division { get; set; }
        public string Adrs_Country { get; set; }
        public string Phone { get; set; }
        public Project project { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }

    }
}