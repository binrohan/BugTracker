using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BugTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.API.Data
{
    public class BugTrackerRepository : IBugTrackerRepository
    {
        private readonly DataContext _context;
        public BugTrackerRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<User> GetUser(string id, bool isCurrentUser)
        {
            var user = await _context.Users
                .Include(u => u.Tickets)
                .Include(u => u.project)
                .FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
           var users = await _context.Users.OrderBy(u => u.UserName).ToListAsync();
           return users;
        }

        public async Task<Project> GetProject(int id)
        {
            var query = _context.Projects.Include(p => p.Tickets).Include(p => p.Users).AsQueryable();
            
            var project = await query.FirstOrDefaultAsync(p => p.Id == id);

            return project;
        }

        public async Task<IEnumerable<Project>> GetProjects()
        {
            var projects = await _context.Projects.ToListAsync();
            
            return projects;
        }

        public async Task<Ticket> GetTicket(int id)
        {
            var ticket = await _context.Tickets
                .Include(t => t.User)
                .Include(t => t.Comments)
                .FirstOrDefaultAsync(u => u.Id == id);
            
            
            return ticket;
        }

        
        public async Task<IEnumerable<Ticket>> GetTickets()
        {
            var tickets = await _context.Tickets.ToListAsync();
            
            return tickets;
        }
    }
}