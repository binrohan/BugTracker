using System;

namespace BugTracker.API.Dtos
{
    public class UserToUpdateDto
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public string Description { get; set; }
        public string Adrs_Local { get; set; }
        public string Adrs_City { get; set; }
        public string Adrs_Division { get; set; }
        public string Adrs_Country { get; set; }
        public string Phone { get; set; }
    }
}