using Microsoft.EntityFrameworkCore;
using MediatR;
using Persistence;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Interface;
using Application.Core.Paging;

namespace Application.Activities;

public class List
{
    public class Query : IRequest<ResultValidators<PagedList<ActivityDTO>>>
    {
        public ActivityParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, ResultValidators<PagedList<ActivityDTO>>>
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

        public async Task<ResultValidators<PagedList<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = _context.Activities
                .Where(d => d.Date >= request.Params.StartDate)
                .OrderBy(d => d.Date)
                .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider,
                    new { currentUsername = _userNameAccessor.GetUserName() })
                .AsQueryable();

            if(!request.Params.IsHost && request.Params.IsGoing)
                query = query.Where(d => d.Attendees.Any(a => a.UserName == _userNameAccessor.GetUserName()));
            if(request.Params.IsHost && !request.Params.IsGoing)
                query = query.Where(q => q.HostUserName == _userNameAccessor.GetUserName());

            return ResultValidators<PagedList<ActivityDTO>>.Valid(
                await PagedList<ActivityDTO>.CreateAsync(query, request.Params.PageNumber, request.Params.limit)
            );
        }
    }
}
