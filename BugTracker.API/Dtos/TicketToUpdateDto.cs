using System;
using BugTracker.API.Models;

namespace BugTracker.API.Dtos
{
    public class TicketToUpdateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Updated { get; set; } //Auto
        public DateTime SubmissionDate { get; set; }
        public bool isArchived { get; set; }
        public bool isDeveloperPassed { get; set; }
        public bool isManagerPassed { get; set; }

        
        public string userId { get; set; }
        public Category Category { get; set; }
        public Priority Priority { get; set; }
        public Status Status { get; set; }

        public TicketToUpdateDto()  
        {
            Updated = DateTime.Now;
        }

    }
}