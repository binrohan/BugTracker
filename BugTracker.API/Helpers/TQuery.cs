using System.Linq;
using BugTracker.API.Models;

namespace BugTracker.API.Helpers
{
    public static class TQuery
    {
        public static IQueryable<Ticket> TicketQuery (TicketParams ticketParams, IQueryable<Ticket> tickets) 
        {
            if(!string.IsNullOrEmpty(ticketParams.Filter))
            {
                tickets = tickets.Where(t => t.Title.Contains(ticketParams.Filter));
            }
            

            if(!string.IsNullOrEmpty(ticketParams.StateBy))
            {
                switch(ticketParams.StateBy)
                {
                    case "archived":
                        tickets = tickets.Where(t => t.isArchived);
                        break;
                    case "active":
                        tickets = tickets.Where(t => !t.isArchived);
                        break;
                    case "live":
                        tickets = tickets.Where(t => !t.isArchived && !t.isManagerPassed && !t.isDeveloperPassed);
                        break;
                    case "all":
                        tickets = tickets.Where(t => !t.isArchived || t.isArchived);
                        break;
                    case "approved":
                        tickets = tickets.Where(t => !t.isArchived && t.isManagerPassed);
                        break;
                    case "passed":
                        tickets = tickets.Where(t => !t.isArchived || t.isDeveloperPassed);
                        break;
                    case "unassigned":
                        tickets = tickets.Where(t => !t.isArchived && t.User == null);
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
                    case "updatedasc":
                        tickets = tickets.OrderBy(t => t.Updated);
                        break;
                    case "updateddesc":
                        tickets = tickets.OrderByDescending(t => t.Updated);
                        break;
                    case "createdasc":
                        tickets = tickets.OrderBy(t => t.Created);
                        break;
                    case "createddesc":
                        tickets = tickets.OrderByDescending(t => t.Created);
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
                    case "userasc":
                        tickets = tickets.OrderBy(t => t.User.UserName);
                        break;
                    case "userdesc":
                        tickets = tickets.OrderByDescending(t => t.User.UserName);
                        break;
                    default:
                        tickets = tickets.OrderByDescending(t => t.Created);
                        break;
                }
            }
            
            tickets = tickets.Skip(ticketParams.PageIndex*ticketParams.PageSize).Take(ticketParams.PageSize).Select(t => t);

            return tickets;
        }
        public static IQueryable<Project> ProjectQuery (ProjectParams projectParams, IQueryable<Project> projects)
        {
            return null;
        }
    }
}