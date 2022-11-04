using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            var result = await Mediator.Send(new List.Query());

            return ResultValidatorsHandler(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivitiesById(Guid id)
        {
            var result = await Mediator.Send(new SingleActivity.Query { Id = id });

            return ResultValidatorsHandler(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            var result = await Mediator.Send(new Create.Command { Activity = activity });

            return ResultValidatorsHandler(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            var result = await Mediator.Send(new Edit.Command { Activity = activity });

            return ResultValidatorsHandler(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });

            return ResultValidatorsHandler(result);
        }
    }
}