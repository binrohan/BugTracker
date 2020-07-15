using BugTracker.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.API.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        // public DbSet<User> Users { get; set; }
        // public DbSet<Role> Roles { get; set; }
        // public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Category> Types { get; set; }
        public DbSet<UserTicket> UserTickets { get; set; }
        public DbSet<Project> Projects { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            builder.Entity<User>()
                .Property(u => u.Email)
                .IsRequired();


            // Define: Many to Many relation between User and Ticket
            builder.Entity<UserTicket>().HasKey(ut => new { ut.UserId, ut.TicketId });
            builder.Entity<UserTicket>()
                .HasOne(t => t.Ticket)
                .WithMany(t => t.UserTickets)
                .HasForeignKey(t => t.TicketId);
            builder.Entity<UserTicket>()
                .HasOne(t => t.User)
                .WithMany(t => t.UserTickets)
                .HasForeignKey(t => t.UserId);

            // builder.Entity<UserRole>(userRole => 
            // {
            //     userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

            //     userRole.HasOne(ur => ur.Role)
            //         .WithMany(r => r.UserRoles)
            //         .HasForeignKey(ur => ur.RoleId)
            //         .IsRequired();
                
            //     userRole.HasOne(ur => ur.User)
            //         .WithMany(r => r.UserRoles)
            //         .HasForeignKey(ur => ur.UserId)
            //         .IsRequired();
            // });
           
        }

            


            


    }
}