using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Core;
using API.Extensions;
using Application.Core.Paging;

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

        protected ActionResult PagedResultHandler<T>(ResultValidators<PagedList<T>> result)
        {
            if(result == null) return NotFound();
            if(result.isSucces && result.Value != null) 
            {
                Response.AddPaginationHeader(result.Value.CurrentPage, result.Value.PageSize, 
                    result.Value.TotalCount, result.Value.TotalPages);
                return Ok(result.Value);
            }
            if(result.isSucces && result.Value == null) return NotFound();

            return BadRequest(result.Error);
        }
     }
}