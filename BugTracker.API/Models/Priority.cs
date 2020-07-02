using System.Collections.Generic;

namespace BugTracker.API.Models
{
    public class Priority
    {
        public int Id { get; set; }
        public string TicketPriority { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
    }
}