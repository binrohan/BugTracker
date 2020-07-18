using System;
using System.Collections.Generic;
using BugTracker.API.Models;

namespace BugTracker.API.Dtos
{
    public class TicketToCreateDto
    {

        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; } //Auto
        public DateTime Updated { get; set; } //Auto
        public DateTime SubmissionDate { get; set; }
        public bool isArchived { get; set; } //Auto
        public bool isDeveloperPassed { get; set; } //Auto
        public bool isManagerPassed { get; set; } //Auto
        public int projectId { get; set; }
        
        #nullable enable
        public string? userId { get; set; }
        public Category? Category { get; set; }
        public Priority? Priority { get; set; }
        public Status? Status { get; set; }

        public TicketToCreateDto()
        {
            Created = DateTime.Now;
            Updated = DateTime.Now;
            isArchived = false;
            isDeveloperPassed = false;
            isManagerPassed = false;
        }
    }
}