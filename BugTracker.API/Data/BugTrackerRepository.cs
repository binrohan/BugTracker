using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BugTracker.API.Helpers;
using BugTracker.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.API.Data
{
    public class BugTrackerRepository : IBugTrackerRepository
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        public BugTrackerRepository(DataContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
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
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.Include(u => u.UserRoles).AsQueryable();
            if(!string.IsNullOrEmpty(userParams.StateBy))
            {
                switch(userParams.StateBy)
                {
                    case "free":
                        users = users.Where(u => u.project == null);
                        break;
                    case "assigned":
                        users = users.Where(u => u.project != null);
                        break;
                }
            }
            
            if(!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch(userParams.OrderBy)
                {
                    case "Namedesc":
                        users = users.OrderByDescending(u => u.UserName);
                        break;
                    case "Nameasc":
                        users = users.OrderBy(u => u.UserName);
                        break;
                    case "Emailasc":
                        users = users.OrderBy(u => u.Email);
                        break;
                    case "Emaildesc":
                        users = users.OrderByDescending(u => u.Email);
                        break;
                    default:
                        users = users.OrderBy(u => u.Id);
                        break;
                }
            }
            
            
            
            
            
            return await users.ToListAsync();
        }



        public async Task<Project> GetProject(int id)
        {
            var query = _context.Projects.Include(p => p.Tickets).Include(p => p.Users).ThenInclude(u => u.UserRoles).AsQueryable();

            var project = await query.FirstOrDefaultAsync(p => p.Id == id);

            return project;
        }

        public async Task<IEnumerable<Project>> GetProjects(bool isArchived)
        {
            var projects = await _context.Projects.Include(p => p.Tickets).ToListAsync();
            if(isArchived)
                projects = projects.Where(p => p.isArchived == true).ToList();
            if(!isArchived)
                projects = projects.Where(p => p.isArchived == false).ToList();

            return projects;
        }

        public async Task<Ticket> GetTicket(int id)
        {
            var ticket = await _context.Tickets
                .Include(t => t.User)
                .Include(t => t.project)
                .Include(t => t.Status)
                .Include(t => t.Category)
                .Include(t => t.Priority)
                .Include(t => t.Comments)
                .FirstOrDefaultAsync(u => u.Id == id);


            return ticket;
        }


        public async Task<IEnumerable<Ticket>> GetTickets(bool isArchived)
        {
            var tickets = await _context.Tickets
                                .OrderBy(t => t.SubmissionDate)
                                .Include(t => t.Status)
                                .Include(t => t.Category)
                                .Include(t => t.Priority)
                                .Include(t => t.project)
                                .ToListAsync();
            if(isArchived)
                tickets = tickets.Where(t => t.isArchived == true).ToList();
            if(!isArchived)
                tickets = tickets.Where(t => t.isArchived == false).ToList();

            return tickets;
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            var categories = await _context.Categories
                                            .Include(c => c.Tickets)
                                            .ToListAsync();

            return categories;
        }

        public async Task<Category> GetCategory(int id)
        {
            var category = await _context.Categories
                                    .Include(c => c.Tickets)
                                    .FirstOrDefaultAsync(c => c.Id == id);

            return category;
        }

        public async Task<IEnumerable<Status>> GetStatuses()
        {
            var statuses = await _context.Statuses.ToListAsync();

            return statuses;
        }

        public async Task<Status> GetStatus(int id)
        {
            var status = await _context.Statuses
                                    .Include(c => c.Tickets)
                                    .FirstOrDefaultAsync(c => c.Id == id);

            return status;
        }

        public async Task<IEnumerable<Priority>> GetPriorities()
        {
            var priorites = await _context.Priorities.ToListAsync();

            return priorites;
        }

        public async Task<Priority> GetPriority(int id)
        {
            var priority = await _context.Priorities
                                    .Include(c => c.Tickets)
                                    .FirstOrDefaultAsync(c => c.Id == id);

            return priority;
        }

        public async Task<Comment> GetComment(int id)
        {
            var comment = await _context.Comments
                                    .FirstOrDefaultAsync(c => c.Id == id);
            return comment;
        }
    }
}