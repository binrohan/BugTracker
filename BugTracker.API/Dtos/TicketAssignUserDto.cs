namespace BugTracker.API.Dtos
{
    public class TicketAssignUserDto
    {
        public string UserId { get; set; }
        public bool toRemove { get; set; }
    }
}