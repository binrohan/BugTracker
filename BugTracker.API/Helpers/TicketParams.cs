namespace BugTracker.API.Helpers
{
    public class TicketParams
    {
        public string OrderBy { get; set; } 
        public string StateBy { get; set; }
        public string Filter { get; set; }

        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public int Length { get; set; }

        public TicketParams()
        {
            
        }
    }
}