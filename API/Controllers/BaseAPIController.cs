using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace API.Controllers
{
    [ApiController]
    [Route("Api/[Controller]")]
    public class BaseAPIController : ControllerBase {
        
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
     }
}