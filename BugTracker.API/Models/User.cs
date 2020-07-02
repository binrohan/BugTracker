using System;
using Microsoft.AspNetCore.Identity;

namespace BugTracker.API.Models
{
    public class User : IdentityUser
    {
        public string Gender { get; set; }
        public DateTime Joined { get; set; }
        public string Description { get; set; }
        public string Adrs_Local { get; set; }
        public string Adrs_City { get; set; }
        public string Adrs_Division { get; set; }
        public string Adrs_Country { get; set; }
        public string Phone { get; set; }
    }
}