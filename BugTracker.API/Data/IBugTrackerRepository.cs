using System.Collections.Generic;
using System.Threading.Tasks;
using BugTracker.API.Models;

namespace BugTracker.API.Data
{
    public interface IBugTrackerRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<User> GetUser(string id, bool isCurrentUser);
        Task<IEnumerable<User>> GetUsers();
        Task<Project> GetProject(int id);
        Task<IEnumerable<Project>> GetProjects();
        Task<Ticket> GetTicket(int id);
        Task<IEnumerable<Ticket>> GetTickets();
    }
}