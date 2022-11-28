using Application.Activities;
using Application.Activities.DTO;
using Application.Comments.DTO;
using Application.Profiles.DTO;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;

            CreateMap<Activity, Activity>();

            CreateMap<AboutDTO, UserApp>();

            CreateMap<Activity, ActivityDTO>()
                .ForMember(ad => ad.HostUserName,
                            o => o.MapFrom(a => a.Attendees.FirstOrDefault(x => x.IsHost).Users.UserName));

            CreateMap<UserActivities, AttendeeDTO>()
                .ForMember(p => p.DisplayName, o => o.MapFrom(a => a.Users.DisplayName))
                .ForMember(p => p.UserName, o => o.MapFrom(a => a.Users.UserName))
                .ForMember(p => p.Bio, o => o.MapFrom(a => a.Users.Bio))
                .ForMember(p => p.Image, o => o.MapFrom(ua => ua.Users.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(p => p.FollowersCount, o => o.MapFrom(ua => ua.Users.Followers.Count))
                .ForMember(p => p.FollowingCount, o => o.MapFrom(ua => ua.Users.Followings.Count))
                .ForMember(p => p.Following, o => o.MapFrom(s =>
                    s.Users.Followers.Any(x => x.Observer.UserName == currentUsername)));;

            CreateMap<UserApp, Profiles.Profile>()
                .ForMember(p => p.Image, o => o.MapFrom(ua => ua.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(p => p.FollowersCount, o => o.MapFrom(ua => ua.Followers.Count))
                .ForMember(p => p.FollowingCount, o => o.MapFrom(ua => ua.Followings.Count))
                .ForMember(p => p.Following, o => o.MapFrom(s =>
                    s.Followers.Any(x => x.Observer.UserName == currentUsername)));

            CreateMap<Comment, CommentDTO>()
                .ForMember(p => p.DisplayName, o => o.MapFrom(a => a.Author.DisplayName))
                .ForMember(p => p.UserName, o => o.MapFrom(a => a.Author.UserName))
                .ForMember(p => p.Image, o => o.MapFrom(ua => ua.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}