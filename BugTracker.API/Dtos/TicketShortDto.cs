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



        public Category Category { get; set; }
        public Priority Priority { get; set; }
        public Status Status { get; set; }
    }
}