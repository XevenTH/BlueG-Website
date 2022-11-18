using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfilesController : BaseAPIController
{
    [HttpGet("{username}")]
    public async Task<IActionResult> Profile(string username)
    {
        var result = await Mediator.Send(new Details.Query { UserName = username });

        return ResultValidatorsHandler(result);
    }
}
