using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using movieAvaiability.Api.Models;
using movieAvaiability.Api.Services;

namespace movieAvaiability.Api.Controllers;
[Route("api/[controller]")]
[ApiController]
public class WatchListController : ControllerBase
{
    private readonly IWatchListService _watchListService;

    public WatchListController(IWatchListService watchListService)
    {
        _watchListService = watchListService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WatchListItem>>> GetAllWatchList()
    {
        var watchListItems = await _watchListService.GetWatchLists();
        if (watchListItems == null || !watchListItems.Any())
        {
            return NotFound();
        }
        return Ok(watchListItems);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddToWatchList(WatchListItem item)
    {
        var result = await _watchListService.AddToWatchList(item);
        if (result)
        {
            return Ok();
        }
        return BadRequest("The item is already in the watchlist.");
    }

    [HttpDelete("remove")]
    public async Task RemoveFromWatchList(string id)
    {
        await _watchListService.RemoveFromWatchList(id);
    
    }
}