using Application.Activities;
using Application.Activities.DTO;
using Application.Profiles.DTO;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();

            CreateMap<AboutDTO, UserApp>();

            CreateMap<Activity, ActivityDTO>()
                .ForMember(ad => ad.HostUserName, 
                            o => o.MapFrom(a => a.Attendees.FirstOrDefault(x => x.IsHost).Users.UserName));
            
            CreateMap<UserActivities, AttendeeDTO>()
                .ForMember(p => p.DisplayName, o => o.MapFrom(a => a.Users.DisplayName))
                .ForMember(p => p.UserName, o => o.MapFrom(a => a.Users.UserName))
                .ForMember(p => p.Bio, o => o.MapFrom(a => a.Users.Bio))
                .ForMember(p => p.Image, o => o.MapFrom(ua => ua.Users.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<UserApp, Profiles.Profile>()
                .ForMember(p => p.Image, o => o.MapFrom(ua => ua.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}