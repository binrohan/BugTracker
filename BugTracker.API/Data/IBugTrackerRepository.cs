using System.Collections.Generic;
using System.Threading.Tasks;
using BugTracker.API.Helpers;
using BugTracker.API.Models;

namespace BugTracker.API.Data
{
    public interface IBugTrackerRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();

        Task<User> GetUser(string id, bool isCurrentUser);
        Task<IEnumerable<User>> GetUsers(UserParams userParams);


        Task<Project> GetProject(int id);
        Task<IEnumerable<Project>> GetProjects(ProjectParams projectParams);
        Task<IEnumerable<User>> GetProjectUsers(int id, UserParams userParams);


        Task<Ticket> GetTicket(int id);
        Task<IEnumerable<Ticket>> GetTickets(TicketParams ticketParams);
        Task<IEnumerable<Ticket>> GetProjectTickets(int id, TicketParams ticketParams);
        Task<IEnumerable<Ticket>> GetUserTickets(string id, TicketParams ticketParams);


        Task<Comment> GetComment(int id);
        Task<IEnumerable<Comment>> GetComments(int ticketId, CommentParams commentParams);

        Task<IEnumerable<Category>> GetCategories();
        Task<Category> GetCategory(int id);
        Task<IEnumerable<Status>> GetStatuses();
        Task<Status> GetStatus(int id);
        Task<IEnumerable<Priority>> GetPriorities();
        Task<Priority> GetPriority(int id);
    }
}