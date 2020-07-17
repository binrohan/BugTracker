using System;

namespace BugTracker.API.Dtos
{
    public class ProjectToCreateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? DeadTime { get; set; }
        public bool isArchived { get; set; }

        public ProjectToCreateDto()
        {   
            StartTime = DateTime.Now;
            DeadTime = DateTime.Now;
            isArchived = false;
        }
    }
}