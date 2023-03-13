using movieAvaiability.Api.Models;

namespace movieAvaiability.Api.Services;

public interface IUtellyService
{
    Task<UtellyResponse.UtellyLocation> GetStream(string term);

}