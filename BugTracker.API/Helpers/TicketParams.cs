namespace BugTracker.API.Helpers
{
    public class TicketParams
    {
        public bool isArchived { get; set; }
        public bool isDeveloperPassed { get; set; }
        public bool isManagerPassed { get; set; }
    }
}