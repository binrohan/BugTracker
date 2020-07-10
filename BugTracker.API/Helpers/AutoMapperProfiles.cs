using AutoMapper;
using BugTracker.API.Dtos;
using BugTracker.API.Models;

namespace BugTracker.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForDetailed>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<Project, ProjectsForDetailed>();
            CreateMap<Ticket, TicketsForDetailed>();
            CreateMap<UserTicket, UserTicketDto>();
        }
    }
}