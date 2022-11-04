using Microsoft.EntityFrameworkCore;
using MediatR;
using Domain;
using Persistence;
using Application.Core;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<ResultValidators<List<Activity>>> { }

        public class Handler : IRequestHandler<Query, ResultValidators<List<Activity>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ResultValidators<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return ResultValidators<List<Activity>>.Valid(await _context.Activities.ToListAsync());
            }
        }
    }
}