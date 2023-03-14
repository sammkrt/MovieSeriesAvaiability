using movieAvaiability.Api.Models;

namespace movieAvaiability.Api.Services;

public interface IWatchListService
{
    Task<bool> AddToWatchList(WatchListItem item);
    Task RemoveFromWatchList(string movieId);
    Task<IEnumerable<WatchListItem>> GetWatchLists();
}