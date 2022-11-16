using Microsoft.EntityFrameworkCore;
using MediatR;
using Domain;
using Persistence;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Application.Activities;

public class List
{
    public class Query : IRequest<ResultValidators<List<ActivityDTO>>> { }

    public class Handler : IRequestHandler<Query, ResultValidators<List<ActivityDTO>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ResultValidators<List<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
                .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return ResultValidators<List<ActivityDTO>>.Valid(activity);
        }
    }
}
