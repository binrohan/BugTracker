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
            CreateMap<User, UserShortDto>()
                .ForMember(dest => dest.ProjectId, opt => 
                    opt.MapFrom(src => src.project.Id));
            CreateMap<UserForRegisterDto, User>();
            CreateMap<UserToUpdateDto, User>();
            CreateMap<Ticket,TicketShortDto>()
                .ForMember(dest => dest.Category, opt =>
                    opt.MapFrom(src => src.Category.TicketCategory))
                .ForMember(dest => dest.Status, opt =>
                    opt.MapFrom(src => src.Status.TicketStatus))
                .ForMember(dest => dest.Priority, opt =>
                    opt.MapFrom(src => src.Priority.TicketPriority))
                .ForMember(dest => dest.ProjectName, opt => 
                    opt.MapFrom(src => src.project.Title));
            CreateMap<Ticket, TicketsForDetailed>();
            CreateMap<TicketToCreateDto, Ticket>();
            CreateMap<TicketToUpdateDto, Ticket>();

            CreateMap<Project, ProjectsForDetailed>()
            .ForMember(dest => dest.TicketCount, opt => 
                    opt.MapFrom(src => src.Tickets.Count));
            CreateMap<Project, ProjectShortDto>()
                .ForMember(dest => dest.TicketCount, opt => 
                    opt.MapFrom(src => src.Tickets.Count));
            CreateMap<ProjectToCreateDto, Project>();
            CreateMap<ProjectForUpdateDto, Project>();

            CreateMap<Comment, CommentForTicketDto>();
            CreateMap<Comment, CommentsToReturn>()
                .ForMember(dest => dest.commenterId, opt => 
                    opt.MapFrom(src => src.Commenter.Id))
                .ForMember(dest => dest.UserName, opt =>
                    opt.MapFrom(src => src.Commenter.UserName));
            CreateMap<CommentToCreateDto, Comment>();
            CreateMap<CategoryToReturn, Category>();
            CreateMap<Category, CategoryToReturn>()
                .ForMember(dest => dest.TicketCounts, opt => 
                    opt.MapFrom(src => src.Tickets.Count));
            CreateMap<Status, StatusToReturn>().ReverseMap();
            CreateMap<Priority, PriorityToReturn>().ReverseMap();

            CreateMap<User, mockUser>();
            CreateMap<Project, ProjectForUpdateDto>();

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