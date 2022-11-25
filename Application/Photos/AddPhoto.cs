using Application.Core;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos;

public class AddPhoto
{
    public class Command : IRequest<ResultValidators<Photo>>
    {
        public IFormFile File { get; set; }
    }

    public class Handler : IRequestHandler<Command, ResultValidators<Photo>>
    {
        private readonly DataContext _context;
        private readonly IUserNameAccessor _userNameAccessor;
        private readonly IPhotosAccessor _photosAccessor;

        public Handler(DataContext context, IUserNameAccessor userNameAccessor, IPhotosAccessor photosAccessor)
        {
            _photosAccessor = photosAccessor;
            _userNameAccessor = userNameAccessor;
            _context = context;
        }

        public async Task<ResultValidators<Photo>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userNameAccessor.GetUserName());
            if(user == null) return null;

            var photoResult = await _photosAccessor.UploadPhoto(request.File);

            var newPhoto = new Photo
            {
                Id = photoResult.PublicId,
                Url = photoResult.Url
            };

            if(!user.Photos.Any(x => x.IsMain)) newPhoto.IsMain = true;

            user.Photos.Add(newPhoto);

            var result = await _context.SaveChangesAsync() > 0;

            return result ? ResultValidators<Photo>.Valid(newPhoto) 
                : ResultValidators<Photo>.InValid("Error Adding Photos");
        }
    }
}
