using System;
using BugTracker.API.Models;

namespace BugTracker.API.Dtos
{
    public class CommentToCreateDto
    {
        public int TicketId { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public string CommenterId { get; set; }
    }
}