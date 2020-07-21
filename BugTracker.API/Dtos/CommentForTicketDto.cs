using System;

namespace BugTracker.API.Dtos
{
    public class CommentForTicketDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}