using System;
using BugTracker.API.Models;

namespace BugTracker.API.Dtos
{
    public class CommentsToReturn
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public string UserName { get; set; }
        public string commenterId { get; set; }
    }
}