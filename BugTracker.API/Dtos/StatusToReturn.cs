namespace BugTracker.API.Dtos
{
    public class StatusToReturn
    {
        public int Id { get; set; }
        public string TicketStatus{ get; set; }
        public int TicketCounts { get; set; }
    }
}