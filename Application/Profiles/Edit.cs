using Application.Core;
using Application.Interface;
using Application.Profiles.DTO;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class Edit
{
    public class Command : IRequest<ResultValidators<Unit>>
    {
        public AboutDTO AboutValue { get; set; }
    }

    public class Handler : IRequestHandler<Command, ResultValidators<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserNameAccessor _userNameAccessor;
        private readonly IMapper _mapper;
        public Handler(DataContext context, IUserNameAccessor userNameAccessor, IMapper mapper)
        {
            _context = context;
            _userNameAccessor = userNameAccessor;
            _mapper = mapper;
        }

        public async Task<ResultValidators<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var userApp = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userNameAccessor.GetUserName());
            if(userApp == null) return null;

            _mapper.Map(request.AboutValue, userApp);

            var result = await _context.SaveChangesAsync() > 0;

            return result ? ResultValidators<Unit>.Valid(Unit.Value) 
                : ResultValidators<Unit>.InValid("Error Change Bio");
        }
    }
}
