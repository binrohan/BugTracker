using System;

namespace BugTracker.API.Dtos
{
    public class ProjectForUpdateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DeadTime { get; set; }
        public bool isArchived { get; set; }
    }
}