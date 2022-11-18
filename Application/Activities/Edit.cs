using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<ResultValidators<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command, ResultValidators<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ResultValidators<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                if(activity == null) return null;
                
                _mapper.Map(request.Activity, activity);
                
                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return ResultValidators<Unit>.InValid("Canno't Edit Activity");

                return ResultValidators<Unit>.Valid(Unit.Value);
            }
        }
    }
}