using Application.Comments.DTO;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments;

public class List
{
    public class Query : IRequest<ResultValidators<List<CommentDTO>>>
    {
        public Guid ActivityId { get; set; }
    }

    public class Handler : IRequestHandler<Query, ResultValidators<List<CommentDTO>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext dataContext, IMapper mapper)
        {
            _context = dataContext;
            _mapper = mapper;
        }

        public async Task<ResultValidators<List<CommentDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var comment = await _context.Comments
                .Where(a => a.Activity.Id == request.ActivityId)
                .OrderBy(x => x.CreatedAt)
                .ProjectTo<CommentDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return ResultValidators<List<CommentDTO>>.Valid(comment);
        }
    }
}