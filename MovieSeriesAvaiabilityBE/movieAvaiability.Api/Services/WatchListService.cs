using Microsoft.EntityFrameworkCore;
using movieAvaiability.Api.Models;

namespace movieAvaiability.Api.Services;

public class WatchListService : IWatchListService
{
    private readonly ShowContext _showContext;

    public WatchListService(ShowContext showContext)
    {
        _showContext = showContext;
    }

    
    public async Task<bool> AddToWatchList(WatchListItem item)
    {
        var existingItem = await _showContext.WatchListItems.FirstOrDefaultAsync(w => w.Term == item.Term && w.Title == item.Title);
        if (existingItem != null)
        {
            return false;
        }

        _showContext.WatchListItems.Add(item);
        await _showContext.SaveChangesAsync();
        return true;
    }

    public async Task RemoveFromWatchList(string movieId)
    {
        var item = await _showContext.WatchListItems.FirstOrDefaultAsync(x => x.MovieId == movieId);
        if (item != null)
        {
            _showContext.WatchListItems.Remove(item);
            await _showContext.SaveChangesAsync();
        }
    }
    
    public async Task<IEnumerable<WatchListItem>> GetWatchLists()
    {
        var watchListItems = await _showContext.WatchListItems.ToListAsync();
        return watchListItems;
    }

    
    
}