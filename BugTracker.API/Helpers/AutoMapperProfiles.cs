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
            CreateMap<User, UserShortDto>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<Ticket,TicketShortDto>();
            CreateMap<Ticket, TicketsForDetailed>();
            CreateMap<TicketToCreateDto, Ticket>();
            CreateMap<TicketToUpdateDto, Ticket>();
            CreateMap<Project, ProjectsForDetailed>();
            CreateMap<Project, ProjectShortDto>();
            CreateMap<ProjectToCreateDto, Project>();
            CreateMap<ProjectForUpdateDto, Project>();
            CreateMap<Comment, CommentForTicketDto>();


            // CreateMap<UserTicket, UserWithTicketDto>()
            // .ForMember(dest => dest.TUser, opt => 
            // opt.MapFrom(src => src.User));
            // CreateMap<Ticket, TicketsForDetailed>()
            // .ForMember(dest => dest.UserTicketDto, opt =>
            // opt.MapFrom(src => src.UserTickets));


            // CreateMap<UserTicket, TicketWithUserDto>()
            // .ForMember(dest => dest.UTicket, opt => 
            // opt.MapFrom(src => src.Ticket));
            // CreateMap<User, UserForDetailed>()
            // .ForMember(dest => dest.TicketForUser, opt =>
            // opt.MapFrom(src => src.UserTickets));

        }
    }
}