using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();

            CreateMap<Activity, ActivityDTO>()
                .ForMember(ad => ad.HostUserName, 
                            o => o.MapFrom(a => a.Attendees.FirstOrDefault(x => x.IsHost).Users.UserName));
            
            CreateMap<UserActivities, Profiles.Profile>()
                .ForMember(p => p.DisplayName, o => o.MapFrom(a => a.Users.DisplayName))
                .ForMember(p => p.UserName, o => o.MapFrom(a => a.Users.UserName))
                .ForMember(p => p.Bio, o => o.MapFrom(a => a.Users.Bio));
        }
    }
}