using movieAvaiability.Api.Models;
using Newtonsoft.Json;

namespace movieAvaiability.Api.Services;

public class UtellyService : IUtellyService
{
    public async Task<UtellyResponse.UtellyLocation> GetStream(string term)
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term={term}&country=uk"),
            Headers =
            {
                { "X-RapidAPI-Key", "768e2ffec2mshc77beb3a261be85p1c6e06jsnce1fe0dc3063" },
                { "X-RapidAPI-Host", "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com" },
            },
        };
        using (var response = await client.SendAsync(request))
        {
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();
            var responseObj = JsonConvert.DeserializeObject<UtellyResponse>(body);
            var displayName = responseObj.results[0].locations[0];
            return displayName;
            
        }
    }
}