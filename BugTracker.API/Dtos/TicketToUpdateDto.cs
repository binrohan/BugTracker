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

        
        public int CategoryId { get; set; }
        public int PriorityId { get; set; }
        public int StatusId { get; set; }

        public TicketToUpdateDto()  
        {
            Updated = DateTime.Now;
        }

    }
}