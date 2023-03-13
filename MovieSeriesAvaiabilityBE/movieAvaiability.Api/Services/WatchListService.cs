using movieAvaiability.Api.Models;

namespace movieAvaiability.Api.Services;

public class WatchListService : IWatchListService
{
    private readonly ShowContext _showContext;

    public WatchListService(ShowContext showContext)
    {
        _showContext = showContext;
    }

    
    public async Task AddItemToWatchList(WatchListItem item)
    {
        await _showContext.WatchListItems.AddAsync(item);
        await _showContext.SaveChangesAsync();
    }

    public async Task RemoveItemFromWatchList(int id)
    {
        var item = await _showContext.WatchListItems.FindAsync(id);
        if (item != null)
        {
            _showContext.WatchListItems.Remove(item);
            await _showContext.SaveChangesAsync();
        }
    }
    
    
}