using Microsoft.EntityFrameworkCore;
using MediatR;
using Persistence;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Interface;

namespace Application.Activities;

public class List
{
    public class Query : IRequest<ResultValidators<List<ActivityDTO>>> { }

    public class Handler : IRequestHandler<Query, ResultValidators<List<ActivityDTO>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public readonly IUserNameAccessor _userNameAccessor;

        public Handler(DataContext context, IMapper mapper, IUserNameAccessor userNameAccessor)
        {
            _userNameAccessor = userNameAccessor;
            _context = context;
            _mapper = mapper;
        }

        public async Task<ResultValidators<List<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
                .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider, 
                    new {currentUsername = _userNameAccessor.GetUserName()})
                .ToListAsync(cancellationToken);

            return ResultValidators<List<ActivityDTO>>.Valid(activity);
        }
    }
}
