using System;

namespace BugTracker.API.Dtos
{
    public class CommentToUpdateDto
    {

        public string Content { get; set; }
        public DateTime Updated { get; set; }
        public bool IsDeteled { get; set; }

        public CommentToUpdateDto()
        {
            Updated = DateTime.Now;
        }
    }
}