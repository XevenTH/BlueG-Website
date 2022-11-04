using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<ResultValidators<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, ResultValidators<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ResultValidators<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Activity activity = await _context.Activities.FindAsync(request.Id);

                _context.Remove(activity);
                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return ResultValidators<Unit>.InValid("Cannot Delete The Activity");
                
                return  ResultValidators<Unit>.Valid(Unit.Value);
            }
        }
    }
}