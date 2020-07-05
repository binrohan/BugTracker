using System;
using System.ComponentModel.DataAnnotations;

namespace BugTracker.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [StringLength(8,MinimumLength = 4, ErrorMessage = "You Must Input 4 character password")]
        public string Password { get; set; }
        [Required]
        public string Gender { get; set; }
        public DateTime Joined { get; set; }
        [Required]
        public string Adrs_Local { get; set; }
        [Required]
        public string Adrs_City { get; set; }
        [Required]
        public string Adrs_Division { get; set; }
        [Required]
        public string Adrs_Country { get; set; }

        public UserForRegisterDto()
        {   
            Joined = DateTime.Now;
        }
    }
}