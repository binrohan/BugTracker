namespace BugTracker.API.Helpers
{
    public class Counts
    {
        public int ActiveTickets { get; set; }
        public int ArchivedTickets { get; set; }
        public int TotalTickets { get; set; }
        public int PassedTickets { get; set; }
        public int ApprovedTickets { get; set; }

        public int ActiveProjects { get; set; }
        public int ArchivedProjects { get; set; }
        public int TotalProjects { get; set; }

        public int TotalUsers { get; set; }
        public int FreeUsers { get; set; }
        public int BusyUsers { get; set; }

        public int Comments { get; set; }
    }
}