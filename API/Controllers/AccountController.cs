using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<UserApp> _userManager;
        private readonly SignInManager<UserApp> _signInManager;
        private readonly TokenService _token;

        public AccountController(UserManager<UserApp> userManager,
            SignInManager<UserApp> signInManager, TokenService token)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _token = token;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> login(LoginDTO data)
        {
            var user = await _userManager.FindByEmailAsync(data.Email);

            if (user == null) return Unauthorized();

            var checker = await _signInManager.CheckPasswordSignInAsync(user, data.Password, false);

            if (checker.Succeeded)
            {
                return CreateUserDTO(user);
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await _userManager.Users.AnyAsync(data => data.Email == registerDTO.Email))
            {
                ModelState.AddModelError("Email", "Email Already Taken");
                return ValidationProblem();
            }
            if (await _userManager.Users.AnyAsync(data => data.UserName == registerDTO.UserName))
            {
                ModelState.AddModelError("UserName", "UserName Already Taken");
                return ValidationProblem();
            }

            var newUser = new UserApp
            {
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                UserName = registerDTO.UserName,
            };

            var result = await _userManager.CreateAsync(newUser, registerDTO.Password);

            if (result.Succeeded)
            {
                return CreateUserDTO(newUser);
            }

            return BadRequest("Oopss There Is A Problem");
        }

        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserDTO(user);
        }

        private UserDTO CreateUserDTO(UserApp user)
        {
            return new UserDTO
            {
                DisplayName = user.DisplayName,
                UserName = user.UserName,
                Image = null,
                Token = _token.CreateToken(user),
            };
        }
    }
}