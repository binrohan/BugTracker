namespace BugTracker.API.Helpers
{
    public class UserParams
    {
        public string OrderBy { get; set; }
        public string StateBy { get; set; }
        public string Filter { get; set; }
        public int pageSize { get; set; }
        public int pageIndex { get; set; }
        public int Length { get; set; }
    }
}