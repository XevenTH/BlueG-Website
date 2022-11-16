using Domain;
using MediatR;
using Persistence;
using Application.Core;
using Application.Interface;

namespace Application.Activities;

public class Create
{
    public class Command : IRequest<ResultValidators<Unit>>
    {
        public Activity Activity { get; set; }
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
            var user = _context.Users.FirstOrDefault(x => x.UserName == _userNameAccessor.GetUserName());

            var attendee = new UserActivities
            {
                Users = user,
                Activities = request.Activity,
                IsHost = true
            };

            request.Activity.Attendees.Add(attendee);

            _context.Activities.Add(request.Activity);

            bool result = await _context.SaveChangesAsync() > 0;

            if (!result) ResultValidators<Unit>.InValid("Data Is Not Valid");

            return ResultValidators<Unit>.Valid(Unit.Value);
        }
    }
}
