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
    public async Task<ActionResult<IEnumerable<Show>>> GetShow()
    {
        if (_watchListService.Shows == null)
        {
            return NotFound();
        }
        return await _context.Shows.ToListAsync();
    }
    
    [HttpPost("watchlist")]
    public async Task<IActionResult> AddToWatchList(WatchListItem item, [FromServices] IWatchListService watchListService)
    {
        try
        {
            await _watchListService.AddItemToWatchList(item);
            return Ok();
        }
        catch (Exception ex)
        {
            // handle the exception
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpDelete("watchlist/{id}")]
    public async Task<IActionResult> RemoveFromWatchList(int id, [FromServices] IWatchListService watchListService)
    {
        try
        {
            await watchListService.RemoveItemFromWatchList(id);
            return Ok();
        }
        catch (Exception ex)
        {
            // handle the exception
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}