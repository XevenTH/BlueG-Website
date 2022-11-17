using Application.Core;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public class UpdateAttendees
{
    public class Command : IRequest<ResultValidators<Unit>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, ResultValidators<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserNameAccessor _userNameaccessor;

        public Handler(DataContext context, IUserNameAccessor userNameaccessor)
        {
            _context = context;
            _userNameaccessor = userNameaccessor;
        }

        public async Task<ResultValidators<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
                .Include(a => a.Attendees).ThenInclude(u => u.Users)
                .SingleOrDefaultAsync(x => x.Id == request.Id);
            if(activity == null) return null;

            var requestUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userNameaccessor.GetUserName());
            if(requestUser == null) return null;


            var hostUserName = activity.Attendees.FirstOrDefault(x => x.IsHost)?.Users?.UserName;

            var user = activity.Attendees.FirstOrDefault(x => x.Users.UserName == requestUser.UserName);

            if(hostUserName != null && hostUserName == requestUser.UserName)
                activity.IsCancelled = !activity.IsCancelled;

            if(hostUserName != null && hostUserName != requestUser.UserName)
                activity.Attendees.Remove(user);
                
            if(user == null)
            {
                user = new UserActivities
                {
                    Users = requestUser,
                    Activities = activity,
                    IsHost = false,
                };

                activity.Attendees.Add(user);
            }

            var result = await _context.SaveChangesAsync() > 0;

            return result ? ResultValidators<Unit>.Valid(Unit.Value) : ResultValidators<Unit>.InValid("Error Joining Activities");
        }
    }
}
