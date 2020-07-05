using System;
using System.Collections.Generic;
using BugTracker.API.Models;

namespace BugTracker.API.Dtos
{
    public class TicketsForDetailed
    {
        public int Id { get; set; } 
        public string Title { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        
        // public bool isArchived { get; set; }
        public bool isDeveloperPassed { get; set; }
        public bool isManagerPassed { get; set; }

        public Project project { get; set; }
        public int ProjectID { get; set; }
        public ICollection<UserTicket> UserTickets { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public Category Category { get; set; }
        public Priority Priority { get; set; }
        public Status Status { get; set; }
    }
}