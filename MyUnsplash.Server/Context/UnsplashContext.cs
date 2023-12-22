using Microsoft.EntityFrameworkCore;
using MyUnsplash.Server.Models;

namespace MyUnsplash.Server.Context
{
    public class UnsplashContext : DbContext
    {
        public DbSet<Unsplash> Images { get; set; }

        public UnsplashContext(DbContextOptions<UnsplashContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Unsplash>().Property(b => b.URL).IsRequired();
        }
    }
}
