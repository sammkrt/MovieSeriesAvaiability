namespace movieAvaiability.Api.Models;

public class Show
{
    public int ID { get; set; }
    public string DisplayName { get; set; }
    public string Overview { get; set; }
    public bool Listed { get; set; }
}