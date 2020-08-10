namespace BugTracker.API.Helpers
{
    public class Counts
    {
        public int ActiveTickets { get; set; }
        public int ArchivedTickets { get; set; }
        public int TotalTickets { get; set; }
        public int PassedTickets { get; set; }
        public int ApprovedTickets { get; set; }
        public int ProjectActiveTickets { get; set; }   // Manager and Dev
        public int ProjectArchivedTickets { get; set; }     // Manager and Dev
        public int DevActiveTickets { get; set; }   // Dev
        public int DevArchivedTickets { get; set; }     // Dev


        public int ActiveProjects { get; set; }
        public int ArchivedProjects { get; set; }
        public int TotalProjects { get; set; }
        public int ProjectId { get; set; }  // Manager and Dev
        public string ProjectTitle { get; set; } // Manager and Dev

        public int TotalUsers { get; set; }
        public int FreeUsers { get; set; }
        public int BusyUsers { get; set; }
        public int ProjectUsers { get; set; }   // Manager and Dev

        public int Comments { get; set; }
        public int Projectcomments { get; set; }    // Manager and Dev
        public int DevComments { get; set; }    // Dev
    }
}