using BugTracker.API.Models;

namespace BugTracker.API.Dtos
{
    public class TicketShortDto
    {
        public int Id { get; set; } 
        public string Title { get; set; }


        public bool isArchived { get; set; }
        public bool isDeveloperPassed { get; set; }
        public bool isManagerPassed { get; set; }



        public string Category { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
    }
}