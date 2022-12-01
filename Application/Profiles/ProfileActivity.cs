using Application.Core;
using Application.Profiles.DTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class ProfileActivity
{
    public class Query : IRequest<ResultValidators<List<ProfileActivityDTO>>>
    {
        public string UserName { get; set; }
        public string Predicate { get; set; }
    }

    public class Hanlder : IRequestHandler<Query, ResultValidators<List<ProfileActivityDTO>>>
    {
        private readonly DataContext _context;
        public readonly IMapper _mapper;
        public Hanlder(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ResultValidators<List<ProfileActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = _context.UserActivities
                .Where(x => x.Users.UserName == request.UserName)
                .OrderBy(d => d.Activities.Date)
                .ProjectTo<ProfileActivityDTO>(_mapper.ConfigurationProvider)
                .AsQueryable();

            if (request.Predicate != null)
            {
                switch (request.Predicate)
                {
                    case "past":
                        query = query.Where(a => a.Date <= DateTime.Now);
                        break;
                    case "future":
                        query = query.Where(a => a.Date >= DateTime.Now);
                        break;
                    case "hosting":
                        query = query.Where(a => a.HostUserName == request.UserName);
                        break;
                }
            }

            var profileActivity = await query.ToListAsync();

            return ResultValidators<List<ProfileActivityDTO>>.Valid(profileActivity);
        }
    }
}
