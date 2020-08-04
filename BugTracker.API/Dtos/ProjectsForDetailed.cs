using System;
using System.Collections.Generic;
using BugTracker.API.Models;

namespace BugTracker.API.Dtos
{
    public class ProjectsForDetailed
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; } 
        public DateTime DeadTime { get; set; }
        public bool isArchived { get; set; }

        public int TicketCount { get; set; }


        public ICollection<TicketShortDto> Tickets { get; set; }
        public ICollection<UserShortDto> Users { get; set; }
    }
}