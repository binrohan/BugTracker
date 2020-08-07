namespace BugTracker.API.Dtos
{
    public class CategoryToReturn
    {
        public int Id { get; set; }
        public string TicketCategory { get; set; }
        public int TicketCounts { get; set; }
    }
}