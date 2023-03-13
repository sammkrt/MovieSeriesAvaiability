namespace movieAvaiability.Api.Models;

public class WatchListItem
{
    public int Id { get; set; }
    public string DisplayName { get; set; }
    public string Url { get; set; }
    public string Icon { get; set; }
    public string Picture { get; set; }
    public DateTime AddedDate { get; set; }
}