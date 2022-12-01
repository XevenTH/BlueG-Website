using System.Text.Json.Serialization;

namespace Application.Profiles.DTO;

public class ProfileActivityDTO
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public DateTime Date { get; set; }
    public string Category { get; set; }
    [JsonIgnore]
    public string HostUserName { get; set; }
}
