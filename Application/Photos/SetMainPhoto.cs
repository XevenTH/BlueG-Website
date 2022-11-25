using Application.Core;
using Application.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos;

public class SetMainPhoto
{
    public class Command : IRequest<ResultValidators<Unit>>
    {
        public string photoId { get; set; }
    }

    public class Handler : IRequestHandler<Command, ResultValidators<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserNameAccessor _userNameAccessor;

        public Handler(DataContext context, IUserNameAccessor userNameAccessor)
        {
            _userNameAccessor = userNameAccessor;
            _context = context;
        }

        public async Task<ResultValidators<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userNameAccessor.GetUserName());
            if(user == null) return null;

            var photo = user.Photos.FirstOrDefault(p => p.Id == request.photoId);
            if(user == null) return null;

            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);

            if(currentMain != null) currentMain.IsMain = false;

            photo.IsMain = true;

            var result  = await _context.SaveChangesAsync() > 0;

            return result? ResultValidators<Unit>.Valid(Unit.Value) 
                : ResultValidators<Unit>.InValid("Cannot Change Main Photo");
        }
    }
}
