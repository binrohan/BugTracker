using System.Collections.Generic;

namespace BugTracker.API.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string TicketCategory { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}