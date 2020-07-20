using System;

namespace BugTracker.API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool IsDeteled { get; set; }
        public User Commenter { get; set; }
        public Ticket Ticket { get; set; }
    }
}