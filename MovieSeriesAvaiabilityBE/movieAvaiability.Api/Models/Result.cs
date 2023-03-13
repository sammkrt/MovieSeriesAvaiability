using System.Text.Json.Serialization;

namespace movieAvaiability.Api.Models;


    public class Result
    {
        [JsonPropertyName("locations")]
        public List<Location> Locations { get; set; }

        [JsonPropertyName("weight")]
        public int Weight { get; set; }

        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("picture")]
        public string Picture { get; set; }

        [JsonPropertyName("provider")]
        public string Provider { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }

