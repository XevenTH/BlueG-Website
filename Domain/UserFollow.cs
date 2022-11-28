namespace Domain;

public class UserFollow
{
    public string ObserverId { get; set; }
    public UserApp Observer { get; set; }
    public string TargetId { get; set; }
    public UserApp Target { get; set; }
}
