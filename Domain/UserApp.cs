using Microsoft.AspNetCore.Identity;

namespace Domain;

public class UserApp : IdentityUser
{
    public string DisplayName { get; set; }
    public string Bio { get; set; }
    public ICollection<UserActivities> Activities { get; set; }
}