using Microsoft.AspNetCore.Mvc;
using movieAvaiability.Api.Models;
using movieAvaiability.Api.Services;

namespace movieAvaiability.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class StreamController : ControllerBase
{
    private readonly IUtellyService _utellyService;

    public StreamController(IUtellyService utellyService)
    {
        _utellyService = utellyService;
    }

    [HttpGet]
    public async Task<ActionResult<UtellyResponse.UtellyLocation>> GetStreamService(string term)
    {
        var result = await _utellyService.GetStream(term);
        if (result == null)
        {
            return NotFound();
        }
        if (string.IsNullOrEmpty(result.display_name))
        {
            return BadRequest("The specified movie or TV show could not be found.");
        }
        return result;
    }
}
