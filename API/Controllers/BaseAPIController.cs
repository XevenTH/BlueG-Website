using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Core;

namespace API.Controllers
{
    [ApiController]
    [Route("Api/[Controller]")]
    public class BaseAPIController : ControllerBase {
        
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult ResultValidatorsHandler<T>(ResultValidators<T> result)
        {
            if(result == null) return NotFound();
            if(result.isSucces && result.Value != null) return Ok(result.Value);
            if(result.isSucces && result.Value == null) return NotFound();

            return BadRequest(result.Error);
        }
     }
}