using System.Collections.Generic;

namespace BugTracker.API.Dtos
{
    public class AssignedUsersDto
    {
        public List<string> userId { get; set; }
        public string ManagerId { get; set; }
    }
}