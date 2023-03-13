namespace movieAvaiability.Api.Services;

public interface IUtellyService
{
    Task<string> GetStream(string term);

}