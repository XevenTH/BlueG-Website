using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<UserApp>
    {
        public DataContext(DbContextOptions options) : base(options) {}

        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivities> UserActivities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserActivities>(x => x.HasKey(ua => new {ua.UserAppId, ua.ActivitiesId}));

            builder.Entity<UserActivities>()
                .HasOne(u => u.Users)
                .WithMany(a => a.Activities)
                .HasForeignKey(ua => ua.UserAppId);

            builder.Entity<UserActivities>()
                .HasOne(u => u.Activities)
                .WithMany(a => a.Attendees)
                .HasForeignKey(ua => ua.ActivitiesId);
        }
    }
}