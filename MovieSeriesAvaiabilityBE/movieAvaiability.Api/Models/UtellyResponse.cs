namespace movieAvaiability.Api.Models;

public class UtellyResponse
{    public string variant { get; set; }
    public List<UtellyResult> results { get; set; }
    public string updated { get; set; }
    public string term { get; set; }
    public int status_code { get; set; }
    public class UtellyResult
    {
        public List<UtellyLocation> locations { get; set; }
        public int weight { get; set; }
        public string id { get; set; }
        public UtellyExternalIds external_ids { get; set; }
        public string picture { get; set; }
        public string provider { get; set; }
        public string name { get; set; }
    }

    public class UtellyLocation
    {
        public string display_name { get; set; }
        public string id { get; set; }
        public string url { get; set; }
        public string name { get; set; }
        public string icon { get; set; }
    }

    public class UtellyExternalIds
    {
        public UtellyId imdb { get; set; }
        public UtellyId tmdb { get; set; }
        public UtellyId iva { get; set; }
        public object facebook { get; set; }
        public object rotten_tomatoes { get; set; }
        public UtellyId wiki_data { get; set; }
        public object iva_rating { get; set; }
        public object gracenote { get; set; }
    }

    public class UtellyId
    {
        public string url { get; set; }
        public string id { get; set; }
    }
}