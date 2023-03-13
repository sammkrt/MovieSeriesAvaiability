using Microsoft.AspNetCore.Mvc;
using movieAvaiability.Api.Models;
using movieAvaiability.Api.Services;
using Newtonsoft.Json;

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
       return result;
    }
}
