using System;
using System.Collections.Generic;

namespace BugTracker.API.Models
{
    public class Ticket
    {
        public int Id { get; set; } 
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public DateTime SubmissionDate { get; set; }
        public bool isArchived { get; set; }
        public bool isDeveloperPassed { get; set; }
        public bool isManagerPassed { get; set; }

        public Project project { get; set; }
        
        #nullable enable
        public User? User { get; set; }
        public ICollection<Comment>? Comments { get; set; }
        public Category? Category { get; set; }
        public Priority? Priority { get; set; }
        public Status? Status { get; set; }
        
    }
}