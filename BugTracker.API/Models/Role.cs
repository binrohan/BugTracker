using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace BugTracker.API.Models
{
    public class Role : IdentityRole
    {
        // public ICollection<User> Users { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}