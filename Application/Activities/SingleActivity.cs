using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class SingleActivity
    {
        public class Query : IRequest<ResultValidators<Activity>> 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ResultValidators<Activity>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ResultValidators<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                return ResultValidators<Activity>.Valid(activity);
            }
        }
    }
}