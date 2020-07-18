namespace BugTracker.API.Models
{
    public class UserTickets
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }
    }
}