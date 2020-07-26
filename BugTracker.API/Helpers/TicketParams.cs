namespace BugTracker.API.Helpers
{
    public class TicketParams
    {
        public string OrderBy { get; set; } 
        public string IsArchived { get; set; }
        public string Filter { get; set; }
    }
}