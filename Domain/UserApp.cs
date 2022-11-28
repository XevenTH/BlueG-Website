using Microsoft.AspNetCore.Identity;

namespace Domain;

public class UserApp : IdentityUser
{
    public string DisplayName { get; set; }
    public string Bio { get; set; }
    public ICollection<Photo> Photos { get; set; }
    public ICollection<UserActivities> Activities { get; set; }
    public ICollection<UserFollow> Followings { get; set; }
    public ICollection<UserFollow> Followers { get; set; }
}