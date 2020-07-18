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
        public DateTime SubmissionDate { get; set; }
        public bool isArchived { get; set; }
        public bool isDeveloperPassed { get; set; }
        public bool isManagerPassed { get; set; }

        public ProjectShortDto project { get; set; }

        public UserShortDto User { get; set; }
        public ICollection<CommentForTicketDto> Comments { get; set; }
        public Category Category { get; set; }
        public Priority Priority { get; set; }
        public Status Status { get; set; }
    }
}

//Ticket details with List of Co responding Users

//This send to end point when one Ticket detailed is required