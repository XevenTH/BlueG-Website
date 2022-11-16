using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class HostRequirement : IAuthorizationRequirement { }

public class HostRequirementHandler : AuthorizationHandler<HostRequirement>
{
    private readonly DataContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public HostRequirementHandler(DataContext context, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = context;
        _httpContextAccessor = httpContextAccessor;

    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HostRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if(userId == null) return Task.CompletedTask;

        var activityId = Guid.Parse(_httpContextAccessor.HttpContext.Request
            .RouteValues.SingleOrDefault(x => x.Key == "id").Value?.ToString());

        var host = _dbContext.UserActivities
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.UserAppId == userId && x.ActivitiesId == activityId)
            .Result;

        if(host == null) return Task.CompletedTask;

        if(host.IsHost) context.Succeed(requirement);

        return Task.CompletedTask;
    }
}
