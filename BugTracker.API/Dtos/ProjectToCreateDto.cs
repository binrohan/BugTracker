using System;
using System.ComponentModel.DataAnnotations;

namespace BugTracker.API.Dtos
{
    public class ProjectToCreateDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        [Required]
        public DateTime DeadTime { get; set; }
        public bool isArchived { get; set; }

        public ProjectToCreateDto()
        {   
            StartTime = DateTime.Now;
            isArchived = false;
        }
    }
}