using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interface;

public interface IPhotosAccessor
{
    Task<PhotosUploadResult> UploadPhoto(IFormFile file);
    Task<string> DeletePhoto(string publicId);
}
