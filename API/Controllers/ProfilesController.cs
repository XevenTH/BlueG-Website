using Application.Profiles;
using Application.Profiles.DTO;
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

    [HttpGet("{username}/activities")]
    public async Task<IActionResult> ProfileActivities(string username, [FromQuery] string predicate)
    {
        var result = await Mediator.Send(new ProfileActivity.Query { UserName = username, Predicate = predicate });

        return ResultValidatorsHandler(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateBio(AboutDTO aboutValue)
    {
        var result = await Mediator.Send(new Edit.Command { AboutValue = aboutValue });

        return ResultValidatorsHandler(result);
    }
}
