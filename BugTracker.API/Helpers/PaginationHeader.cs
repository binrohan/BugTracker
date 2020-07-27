namespace BugTracker.API.Helpers
{
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }

        public PaginationHeader(int currentPage, int pageSize, int totalItems, int totalPages)
        {
            this.CurrentPage =currentPage;
            this.PageSize = pageSize;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
        }
    }
}