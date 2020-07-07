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
            var query = _context.Users.Include(u => u.UserTickets).AsQueryable();

            if(isCurrentUser)
                query = query.IgnoreQueryFilters();

            var user = await query.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
           var users = await _context.Users.OrderBy(u => u.UserName).ToListAsync();
           return users;
        }
    }
}