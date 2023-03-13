using movieAvaiability.Api.Models;

namespace movieAvaiability.Api.Services;

public interface IWatchListService
{
    Task AddItemToWatchList(WatchListItem item);
    Task RemoveItemFromWatchList(int id);
}