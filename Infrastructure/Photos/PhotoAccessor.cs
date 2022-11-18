using Application.Cloudinary;
using Application.Interface;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos;

public class PhotoAccessor : IPhotosAccessor
{
    private readonly Cloudinary _cloudinary;

    public PhotoAccessor(IOptions<CloudinarySettings> options)
    {
        var account = new Account(
            options.Value.CloudName,
            options.Value.ApiKey,
            options.Value.ApiSecret
        );

        _cloudinary = new Cloudinary(account);
    }

    public async Task<PhotosUploadResult> UploadPhoto(IFormFile file)
    {
        if (file.Length > 0)
        {
            await using var readFile = file.OpenReadStream();

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.Name, readFile),
                Transformation = new Transformation().Height(500).Width(500).Crop("fill")
            };

            var result = await _cloudinary.UploadAsync(uploadParams);

            if (result.Error != null) throw new Exception(result.Error.Message);

            return new PhotosUploadResult
            {
                PublicId = result.PublicId,
                Url = result.SecureUrl.ToString()
            };
        }

        return null;
    }

    public async Task<string> DeletePhoto(string publicId)
    {
        var deletionParams = new DeletionParams(publicId);
        var result = await _cloudinary.DestroyAsync(deletionParams);
        return result.Result == "ok" ? result.Result : null;
    }
}
