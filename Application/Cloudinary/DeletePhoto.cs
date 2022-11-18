using Application.Core;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Cloudinary;

public class DeletePhoto
{
    public class Command : IRequest<ResultValidators<Unit>>
    {
        public string photoId { get; set; }
    }

    public class Handler : IRequestHandler<Command, ResultValidators<Unit>>
    {
        private readonly DataContext _context;
        private readonly IPhotosAccessor _photoAccessor;
        private readonly IUserNameAccessor _userNameAccessor;

        public Handler(DataContext context, IPhotosAccessor photoAccessor, IUserNameAccessor userNameAccessor)
        {
            _userNameAccessor = userNameAccessor;
            _photoAccessor = photoAccessor;
            _context = context;
        }

        public async Task<ResultValidators<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userNameAccessor.GetUserName());
            if(user == null) return null;

            var dbPhotos = await _context.Photos.FirstOrDefaultAsync(x => x.Id == request.photoId);
            if(user == null) return null;

            var photo = user.Photos.FirstOrDefault(p => p.Id == request.photoId);
            if(user == null) return null;

            if(photo.IsMain) return ResultValidators<Unit>.InValid("You Cannot Delete Your Main Photo");

            var result = await _photoAccessor.DeletePhoto(photo.Id);
            if(result == null) return ResultValidators<Unit>.InValid("Problem Deleting Photo");

            user.Photos.Remove(photo);
            _context.Photos.Remove(dbPhotos);

            var DbResult = await _context.SaveChangesAsync() > 0;

            return DbResult ? ResultValidators<Unit>.Valid(Unit.Value) 
                : ResultValidators<Unit>.InValid("Server In Problem");
        }
    }
}
