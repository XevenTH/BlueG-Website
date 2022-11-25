using Application.Comments.DTO;
using Application.Core;
using Application.Interface;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments;

public class Create
{
    public class Command : IRequest<ResultValidators<CommentDTO>>
    {
        public string Body { get; set; }
        public Guid ActivityId { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Body).NotEmpty();
        }
    }

    public class Handler : IRequestHandler<Command, ResultValidators<CommentDTO>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserNameAccessor _userNameAccessor;

        public Handler(DataContext dataContext, IMapper mapper, IUserNameAccessor userNameAccessor)
        {
            _context = dataContext;
            _mapper = mapper;
            _userNameAccessor = userNameAccessor;
        }

        public async Task<ResultValidators<CommentDTO>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.ActivityId);
            if(activity == null) return null;

            var user = await _context.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userNameAccessor.GetUserName()); 
            if(user == null) return null;

            var comment = new Comment
            {
                Author = user,
                Activity = activity,
                Body = request.Body,
            };

            activity.Comments.Add(comment);

            var result = await _context.SaveChangesAsync() > 0;

            return result ? ResultValidators<CommentDTO>.Valid(_mapper.Map<CommentDTO>(comment))
                : ResultValidators<CommentDTO>.InValid("Failed Add Comment");
        }
    }
}
