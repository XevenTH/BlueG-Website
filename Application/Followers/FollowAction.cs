using Application.Core;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers;

public class FollowAction
{
    public class Command : IRequest<ResultValidators<Unit>>
    {
        public string TargetUsername { get; set; }
    }

    public class Handler : IRequestHandler<Command, ResultValidators<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserNameAccessor _userNameAccessor;
        public Handler(DataContext context, IUserNameAccessor userNameAccessor)
        {
            _context = context;
            _userNameAccessor = userNameAccessor;
        }

        public async Task<ResultValidators<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var observer = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userNameAccessor.GetUserName());

            var target = await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.TargetUsername);
            if (target == null) return null;

            var follow = await _context.UserFollows.FindAsync(observer.Id, target.Id);

            if (follow == null)
            {
                follow = new UserFollow
                {
                    Observer = observer,
                    Target = target,
                };

                _context.UserFollows.Add(follow);
            }
            else
            {
                _context.UserFollows.Remove(follow);
            }

            var result = await _context.SaveChangesAsync() > 0;

            return result ? ResultValidators<Unit>.Valid(Unit.Value)
                : ResultValidators<Unit>.InValid("Error Follow The User");
        }
    }
}
