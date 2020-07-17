using System;

namespace BugTracker.API.Dtos
{
    public class ProjectShortDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; } 
        public DateTime DeadTime { get; set; }
        public bool isArchived { get; set; }
    }
}