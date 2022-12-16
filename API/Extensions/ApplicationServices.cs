using Application.Activities;
using Application.Core;
using Application.Interface;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Claudinary;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServices
    {
        public static IServiceCollection UseAppServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });

            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.
                    AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:3000");
                });
            });

            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();

            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddSignalR();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));

            services.AddScoped<IUserNameAccessor, UserNameAccessor>();
            services.AddScoped<IPhotosAccessor, PhotoAccessor>();

            return services;
        }
    }
}