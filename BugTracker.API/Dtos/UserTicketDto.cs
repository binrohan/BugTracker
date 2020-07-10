namespace BugTracker.API.Models
{
    public class UserTicketDto
    {
        public string UserId { get; set; }
        public User User { get; set; }
    }
}