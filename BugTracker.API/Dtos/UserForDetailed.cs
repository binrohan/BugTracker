using System;
using System.Collections.Generic;
using BugTracker.API.Models;

namespace BugTracker.API.Dtos
{
    public class UserForDetailed
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public DateTime Joined { get; set; }
        public string Description { get; set; }
        public string Adrs_Local { get; set; }
        public string Adrs_City { get; set; }
        public string Adrs_Division { get; set; }
        public string Adrs_Country { get; set; }
        public string Phone { get; set; }

        public ProjectShortDto project { get; set; }
        public ICollection<TicketShortDto> Tickets { get; set; }
        public Role Role { get; set; }
    }
}
// Detail of user included list of Ticket co responding to the user