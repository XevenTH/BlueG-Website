namespace Domain;

public class UserActivities
{
    public string UserAppId { get; set; }
    public UserApp Users { get; set; }
    public Guid ActivitiesId { get; set; }
    public Activity Activities { get; set; }
    public bool IsHost { get; set; }
}