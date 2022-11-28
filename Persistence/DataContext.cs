using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<UserApp>
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivities> UserActivities { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollow> UserFollows { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserActivities>(x => x.HasKey(ua => new { ua.UserAppId, ua.ActivitiesId }));

            builder.Entity<UserActivities>()
                .HasOne(u => u.Users)
                .WithMany(a => a.Activities)
                .HasForeignKey(ua => ua.UserAppId);

            builder.Entity<UserActivities>()
                .HasOne(u => u.Activities)
                .WithMany(a => a.Attendees)
                .HasForeignKey(ua => ua.ActivitiesId);

            builder.Entity<Comment>()
                .HasOne(a => a.Activity)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserFollow>(x => x.HasKey(uf => new { uf.ObserverId, uf.TargetId }));

            builder.Entity<UserFollow>()
                .HasOne(o => o.Observer)
                .WithMany(f => f.Followings)
                .HasForeignKey(o => o.ObserverId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserFollow>()
                .HasOne(o => o.Target)
                .WithMany(f => f.Followers)
                .HasForeignKey(o => o.TargetId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}