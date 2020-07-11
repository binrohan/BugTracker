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


            CreateMap<User, UserForSend>();
            CreateMap<UserTicket, UserWithTicketDto>()
            .ForMember(dest => dest.TUser, opt => 
            opt.MapFrom(src => src.User));
            CreateMap<Ticket, TicketsForDetailed>()
            .ForMember(dest => dest.UserTicketDto, opt =>
            opt.MapFrom(src => src.UserTickets));


            CreateMap<Ticket, TicketForSend>();
            CreateMap<UserTicket, TicketWithUserDto>()
            .ForMember(dest => dest.UTicket, opt => 
            opt.MapFrom(src => src.Ticket));
            CreateMap<User, UserForDetailed>()
            .ForMember(dest => dest.TicketForUser, opt =>
            opt.MapFrom(src => src.UserTickets));
        }
    }
}