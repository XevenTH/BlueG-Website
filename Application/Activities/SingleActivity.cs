using Application.Core;
using Application.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class SingleActivity
    {
        public class Query : IRequest<ResultValidators<ActivityDTO>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ResultValidators<ActivityDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserNameAccessor _userNameAccessor;

            public Handler(DataContext context, IMapper mapper, IUserNameAccessor userNameAccessor)
            {
                _userNameAccessor = userNameAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<ResultValidators<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider,
                        new { currentUsername = _userNameAccessor.GetUserName() })
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return ResultValidators<ActivityDTO>.Valid(activity);
            }
        }
    }
}