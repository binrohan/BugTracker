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

        //User Segment
        public async Task<User> GetUser(string id, bool isCurrentUser)
        {
            var user = await _context.Users
                .Include(u => u.Tickets)
                .Include(u => u.project)
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetProjectUsers(int id, UserParams userParams)
        {
            var users = _context.Users.Where(u => u.project.Id == id).AsQueryable();
            if(!string.IsNullOrEmpty(userParams.Filter))
            {
                users = users.Where(t => t.UserName.Contains(userParams.Filter));
            }


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
            
            userParams.Length = users.Count();
            users = users.Skip(userParams.pageSize*userParams.pageIndex).Take(userParams.pageSize);
            
            return await users.ToListAsync();
        }

        public async Task<IEnumerable<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.Include(u => u.UserRoles).AsQueryable();

            if(!string.IsNullOrEmpty(userParams.Filter))
            {
                users = users.Where(t => t.UserName.Contains(userParams.Filter));
            }


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
            
            userParams.Length = users.Count();
            users = users.Skip(userParams.pageSize*userParams.pageIndex).Take(userParams.pageSize);
            
            return await users.ToListAsync();
        }


        // Project Segments
        public async Task<Project> GetProject(int id)
        {
            var query = _context.Projects.Include(p => p.Tickets).Include(p => p.Users).ThenInclude(u => u.UserRoles).AsQueryable();

            var project = await query.FirstOrDefaultAsync(p => p.Id == id);

            return project;
        }

        public async Task<IEnumerable<Project>> GetProjects(ProjectParams projectParams)
        {
            var projects =  _context.Projects.Include(p => p.Tickets).AsQueryable();

            if(!string.IsNullOrEmpty(projectParams.StateBy))
            {
                switch (projectParams.StateBy)
                {
                    case "active":
                        projects = projects.Where(p => p.isArchived == false);
                        break;
                    case "archived":
                        projects = projects.Where(p => p.isArchived == true);
                        break;
                    case "all":
                        break;
                    default:
                        projects = projects.Where(p => p.isArchived == false);
                        break;
                }
            }

            if(!string.IsNullOrEmpty(projectParams.Filter))
            {
                projects = projects.Where(p => p.Title.Contains(projectParams.Filter));
            }

            projectParams.Length = projects.Count();

            if(!string.IsNullOrEmpty(projectParams.OrderBy))
            {
                switch (projectParams.OrderBy)  
                {
                    case "Titleasc":
                        projects = projects.OrderBy(p => p.Title);
                        break;
                    case "Titledesc":
                        projects = projects.OrderByDescending(p => p.Title);
                        break;
                        case "Startedasc":
                        projects = projects.OrderBy(p => p.StartTime);
                        break;
                    case "Starteddesc":
                        projects = projects.OrderByDescending(p => p.StartTime);
                        break;
                        case "Deadlineasc":
                        projects = projects.OrderBy(p => p.DeadTime);
                        break;
                    case "Deadlinedesc":
                        projects = projects.OrderByDescending(p => p.DeadTime);
                        break;
                        case "Ticketsasc":
                        projects = projects.OrderBy(p => p.Tickets.Count);
                        break;
                    case "Ticketsdesc":
                        projects = projects.OrderByDescending(p => p.Tickets.Count);
                        break;
                    default:
                        projects = projects.OrderBy(p => p.Id);
                        break;
                }
            }
            if(projectParams.PageSize != 0)
                projects = projects.Skip(projectParams.PageIndex*projectParams.PageSize).Take(projectParams.PageSize).Select(p => p);

            return await projects.ToListAsync();
        }



        // Ticket Segment
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

        public async Task<IEnumerable<Ticket>> GetTickets(TicketParams ticketParams)
        {
            var tickets =    _context.Tickets
                                .OrderBy(t => t.SubmissionDate)
                                .Include(t => t.Status)
                                .Include(t => t.Category)
                                .Include(t => t.Priority)
                                .Include(t => t.project)
                                .AsQueryable();

            int length = 0;
            foreach (var ticket in tickets){ length++;}

            if(!string.IsNullOrEmpty(ticketParams.Filter))
            {
                tickets = tickets.Where(t => t.Title.Contains(ticketParams.Filter));
            }
            

            if(!string.IsNullOrEmpty(ticketParams.IsArchived))
            {
                switch(ticketParams.IsArchived)
                {
                    case "true":
                        tickets = tickets.Where(t => t.isArchived);
                        break;
                    default:
                        tickets = tickets.Where(t => !t.isArchived);
                        break;
                }
            }
            


            if(!string.IsNullOrEmpty(ticketParams.OrderBy))
            {
                switch(ticketParams.OrderBy)
                {
                    case "idasc":
                        tickets = tickets.OrderBy(t => t.Id);
                        break;
                    case "iddesc":
                        tickets = tickets.OrderByDescending(t => t.Id);
                        break;
                    case "titleasc":
                        tickets = tickets.OrderBy(t => t.Title);
                        break;
                    case "titledesc":
                        tickets = tickets.OrderByDescending(t => t.Title);
                        break;
                    case "projectNameasc":
                        tickets = tickets.OrderBy(t => t.project.Title);
                        break;
                    case "projectNamedesc":
                        tickets = tickets.OrderByDescending(t => t.project.Title);
                        break;
                    case "submissionDateasc":
                        tickets = tickets.OrderBy(t => t.SubmissionDate);
                        break;
                    case "submissionDatedesc":
                        tickets = tickets.OrderByDescending(t => t.SubmissionDate);
                        break;
                    case "categoryasc":
                        tickets = tickets.OrderBy(t => t.Category.TicketCategory);
                        break;
                    case "categorydesc":
                        tickets = tickets.OrderByDescending(t => t.Category.TicketCategory);
                        break;
                    case "priorityasc":
                        tickets = tickets.OrderBy(t => t.Priority.TicketPriority);
                        break;
                    case "prioritydesc":
                        tickets = tickets.OrderByDescending(t => t.Priority.TicketPriority);
                        break;
                    
                    case "statusasc":
                        tickets = tickets.OrderBy(t => t.Status.TicketStatus);
                        break;
                    case "statusdesc":
                        tickets = tickets.OrderByDescending(t => t.Status.TicketStatus);
                        break;
                    default:
                        tickets = tickets.OrderBy(t => t.Id);
                        break;
                }
            }
            
            ticketParams.Length = length;
            tickets = tickets.Skip(ticketParams.pageIndex*ticketParams.PageSize).Take(ticketParams.PageSize).Select(t => t);

            return await tickets.ToListAsync();
        }

        public async Task<IEnumerable<Ticket>> GetProjectTickets(int id, TicketParams ticketParams)
        {
            var tickets =  _context.Tickets.Where(t => t.project.Id == id).AsQueryable();

            if(!string.IsNullOrEmpty(ticketParams.Filter))
            {
                tickets = tickets.Where(t => t.Title.Contains(ticketParams.Filter));
            }
            

            if(!string.IsNullOrEmpty(ticketParams.IsArchived))
            {
                switch(ticketParams.IsArchived)
                {
                    case "true":
                        tickets = tickets.Where(t => t.isArchived);
                        break;
                    default:
                        tickets = tickets.Where(t => !t.isArchived);
                        break;
                }
            }
            
            ticketParams.Length = tickets.Count();

            if(!string.IsNullOrEmpty(ticketParams.OrderBy))
            {
                switch(ticketParams.OrderBy)
                {
                    case "idasc":
                        tickets = tickets.OrderBy(t => t.Id);
                        break;
                    case "iddesc":
                        tickets = tickets.OrderByDescending(t => t.Id);
                        break;
                    case "titleasc":
                        tickets = tickets.OrderBy(t => t.Title);
                        break;
                    case "titledesc":
                        tickets = tickets.OrderByDescending(t => t.Title);
                        break;
                    case "projectNameasc":
                        tickets = tickets.OrderBy(t => t.project.Title);
                        break;
                    case "projectNamedesc":
                        tickets = tickets.OrderByDescending(t => t.project.Title);
                        break;
                    case "submissionDateasc":
                        tickets = tickets.OrderBy(t => t.SubmissionDate);
                        break;
                    case "submissionDatedesc":
                        tickets = tickets.OrderByDescending(t => t.SubmissionDate);
                        break;
                    case "categoryasc":
                        tickets = tickets.OrderBy(t => t.Category.TicketCategory);
                        break;
                    case "categorydesc":
                        tickets = tickets.OrderByDescending(t => t.Category.TicketCategory);
                        break;
                    case "priorityasc":
                        tickets = tickets.OrderBy(t => t.Priority.TicketPriority);
                        break;
                    case "prioritydesc":
                        tickets = tickets.OrderByDescending(t => t.Priority.TicketPriority);
                        break;
                    
                    case "statusasc":
                        tickets = tickets.OrderBy(t => t.Status.TicketStatus);
                        break;
                    case "statusdesc":
                        tickets = tickets.OrderByDescending(t => t.Status.TicketStatus);
                        break;
                    default:
                        tickets = tickets.OrderBy(t => t.Id);
                        break;
                }
            }
            
            tickets = tickets.Skip(ticketParams.pageIndex*ticketParams.PageSize).Take(ticketParams.PageSize).Select(t => t);

            return await tickets.ToListAsync();
        }

        public async Task<IEnumerable<Ticket>> GetUserTickets(string id,TicketParams ticketParams)
        {
            var tickets =    _context.Tickets
                                .OrderBy(t => t.SubmissionDate)
                                .Include(t => t.Status)
                                .Include(t => t.Category)
                                .Include(t => t.Priority)
                                .Include(t => t.project)
                                .Include(t => t.User)
                                .AsQueryable();


            tickets = tickets.Where(t => t.User.Id.Equals(id));


            if(!string.IsNullOrEmpty(ticketParams.Filter))
            {
                tickets = tickets.Where(t => t.Title.Contains(ticketParams.Filter));
            }
            
            

            if(!string.IsNullOrEmpty(ticketParams.IsArchived))
            {
                switch(ticketParams.IsArchived)
                {
                    case "true":
                        tickets = tickets.Where(t => t.isArchived);
                        break;
                    default:
                        tickets = tickets.Where(t => !t.isArchived);
                        break;
                }
            }
            
            ticketParams.Length = tickets.Count();

            if(!string.IsNullOrEmpty(ticketParams.OrderBy))
            {
                switch(ticketParams.OrderBy)
                {
                    case "idasc":
                        tickets = tickets.OrderBy(t => t.Id);
                        break;
                    case "iddesc":
                        tickets = tickets.OrderByDescending(t => t.Id);
                        break;
                    case "titleasc":
                        tickets = tickets.OrderBy(t => t.Title);
                        break;
                    case "titledesc":
                        tickets = tickets.OrderByDescending(t => t.Title);
                        break;
                    case "projectNameasc":
                        tickets = tickets.OrderBy(t => t.project.Title);
                        break;
                    case "projectNamedesc":
                        tickets = tickets.OrderByDescending(t => t.project.Title);
                        break;
                    case "submissionDateasc":
                        tickets = tickets.OrderBy(t => t.SubmissionDate);
                        break;
                    case "submissionDatedesc":
                        tickets = tickets.OrderByDescending(t => t.SubmissionDate);
                        break;
                    case "categoryasc":
                        tickets = tickets.OrderBy(t => t.Category.TicketCategory);
                        break;
                    case "categorydesc":
                        tickets = tickets.OrderByDescending(t => t.Category.TicketCategory);
                        break;
                    case "priorityasc":
                        tickets = tickets.OrderBy(t => t.Priority.TicketPriority);
                        break;
                    case "prioritydesc":
                        tickets = tickets.OrderByDescending(t => t.Priority.TicketPriority);
                        break;
                    
                    case "statusasc":
                        tickets = tickets.OrderBy(t => t.Status.TicketStatus);
                        break;
                    case "statusdesc":
                        tickets = tickets.OrderByDescending(t => t.Status.TicketStatus);
                        break;
                    default:
                        tickets = tickets.OrderBy(t => t.Id);
                        break;
                }
            }

            tickets = tickets.Skip(ticketParams.pageIndex*ticketParams.PageSize).Take(ticketParams.PageSize).Select(t => t);

            return await  tickets.ToListAsync();
            
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

        public async Task<IEnumerable<Comment>> GetComments(int ticketId, CommentParams commentParams)
        {
            var comments = _context.Comments.Where(c => c.Ticket.Id == ticketId && c.IsDeleted == false)
                                            .Include(c => c.Commenter)    
                                            .AsQueryable();

            int length = comments.Count();
            
            if(!string.IsNullOrEmpty(commentParams.Filter))
            {
                comments = comments.Where(c => c.Content.Contains(commentParams.Filter));
            }

            if(!string.IsNullOrEmpty(commentParams.OrderBy))
            {
                switch (commentParams.OrderBy)
                {
                    case "commenterasc":
                        comments = comments.OrderBy(c => c.Commenter);
                        break;
                    case "commenterdesc":
                        comments = comments.OrderByDescending(c => c.Commenter);
                        break;
                    case "contentasc":
                        comments = comments.OrderBy(c => c.Content);
                        break;
                    case "contentdesc":
                        comments = comments.OrderByDescending(c => c.Content);
                        break;
                    case "createdasc":
                        comments = comments.OrderBy(c => c.Created);
                        break;
                    case "createddesc":
                        comments = comments.OrderByDescending(c => c.Created);
                        break;
                    default:
                        comments = comments.OrderBy(c => c.Created);
                        break;
                }
            }

            comments = comments.Skip(commentParams.pageIndex*commentParams.PageSize).Take(commentParams.PageSize);
            commentParams.Length = length;

            return await comments.ToListAsync();
        }
    }
}