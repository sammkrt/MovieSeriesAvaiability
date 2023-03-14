using movieAvaiability.Api.Models;

namespace movieAvaiability.Api.Services;

public interface IWatchListService
{
    Task<bool> AddToWatchList(WatchListItem item);
    Task RemoveFromWatchList(int id);
    Task<IEnumerable<WatchListItem>> GetWatchLists();
}