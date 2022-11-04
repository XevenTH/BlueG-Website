using Domain;
using MediatR;
using Persistence;
using Application.Core;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<ResultValidators<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command, ResultValidators<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ResultValidators<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                bool result = await _context.SaveChangesAsync() > 0;

                if(!result) ResultValidators<Unit>.InValid("Data Is Not Valid");

                return ResultValidators<Unit>.Valid(Unit.Value);
            }
        }
    }
}