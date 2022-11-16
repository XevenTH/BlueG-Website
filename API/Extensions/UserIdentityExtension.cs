using System.Text;
using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions;

public static class UserIdentityExtension
{
    public static IServiceCollection IdentityService(this IServiceCollection services, IConfiguration config)
    {
        services.AddIdentityCore<UserApp>(opt =>
        {
            opt.Password.RequireNonAlphanumeric = false;
        })
        .AddEntityFrameworkStores<DataContext>()
        .AddSignInManager<SignInManager<UserApp>>();

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                };
            });

        services.AddAuthorization(opt =>
        {
            opt.AddPolicy("IsHost", policy =>
            {
                policy.Requirements.Add(new HostRequirement());
            });
        });

        services.AddTransient<IAuthorizationHandler, HostRequirementHandler>();
        services.AddScoped<TokenService>();

        return services;
    }
}