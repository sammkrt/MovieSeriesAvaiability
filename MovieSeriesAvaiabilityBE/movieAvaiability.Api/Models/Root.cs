using System.Text.Json.Serialization;

namespace movieAvaiability.Api.Models;


    public class Root
    {
        [JsonPropertyName("variant")]
        public string Variant { get; set; }

        [JsonPropertyName("results")]
        public List<Result> Results { get; set; }

        [JsonPropertyName("updated")]
        public DateTime Updated { get; set; }

        [JsonPropertyName("term")]
        public string Term { get; set; }

        [JsonPropertyName("status_code")]
        public int StatusCode { get; set; }
    }