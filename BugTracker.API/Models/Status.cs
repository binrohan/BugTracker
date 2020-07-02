using System.Collections.Generic;

namespace BugTracker.API.Models
{
    public class Status
    {
        public int Id { get; set; }
        public string TicketStatus { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}