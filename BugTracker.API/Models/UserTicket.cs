namespace BugTracker.API.Models
{
    public class UserTicket
    {
        public string UserId { get; set; }
        public int TicketId { get; set; }
        public User User { get; set; }
        public Ticket Ticket { get; set; }
    }
}