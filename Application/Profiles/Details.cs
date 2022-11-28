using Application.Core;
using Application.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class Details
{
    public class Query : IRequest<ResultValidators<Profile>>
    {
        public string UserName { get; set; }
    }

    public class Handler : IRequestHandler<Query, ResultValidators<Profile>>
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

        public async Task<ResultValidators<Profile>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .ProjectTo<Profile>(_mapper.ConfigurationProvider, 
                    new {currentUsername = _userNameAccessor.GetUserName()})
                .SingleOrDefaultAsync(x => x.UserName == request.UserName);

            return ResultValidators<Profile>.Valid(user);
        }
    }
}
