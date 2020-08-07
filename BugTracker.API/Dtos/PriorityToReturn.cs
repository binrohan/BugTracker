namespace BugTracker.API.Dtos
{
    public class PriorityToReturn
    {
        public int Id { get; set; }
        public string TicketPriority { get; set; }
        public int TicketCounts { get; set; }
    }
}