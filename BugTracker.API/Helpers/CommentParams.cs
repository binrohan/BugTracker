namespace BugTracker.API.Helpers
{
    public class CommentParams
    {
        public string OrderBy { get; set; }
        public string Filter { get; set; }
        public int PageSize { get; set; }
        public int pageIndex { get; set; }
        public int Length { get; set; }
    }
}