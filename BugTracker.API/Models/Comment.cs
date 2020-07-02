using System;

namespace BugTracker.API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public User Commenter { get; set; }
    }
}