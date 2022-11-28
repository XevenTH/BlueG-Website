using Application.Followers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class FollowController : BaseAPIController
{
    [HttpPost("{username}")]
    public async Task<IActionResult> Follow(string username)
    {
        var result = await Mediator.Send(new FollowAction.Command { TargetUsername = username });

        return ResultValidatorsHandler(result);
    }

    [HttpGet("{username}")]
    public async Task<IActionResult> GetFollowing(string username, [FromQuery] string predicate)
    {
        var result = await Mediator.Send(new List.Query{UserName = username, Predicate = predicate});

        return ResultValidatorsHandler(result);
    }
}