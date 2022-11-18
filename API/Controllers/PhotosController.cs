using Application.Cloudinary;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PhotosController : BaseAPIController
{
    [HttpPost]
    public async Task<IActionResult> Add([FromForm] AddPhoto.Command command)
    {
        var result = await Mediator.Send(command);

        return ResultValidatorsHandler(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var result = await Mediator.Send(new DeletePhoto.Command { photoId = id });

        return ResultValidatorsHandler(result);
    }

    [HttpPost("{id}/setmain")]
    public async Task<IActionResult> SetMain(string id)
    {
        var result = await Mediator.Send(new SetMainPhoto.Command { photoId = id });

        return ResultValidatorsHandler(result);
    }
}
