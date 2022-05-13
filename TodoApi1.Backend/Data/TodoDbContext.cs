using Microsoft.EntityFrameworkCore;
using TodoApi1.Models;

namespace TodoApi1.Data
{
    public class TodoDbContext : DbContext
    {
        public DbSet<TodoItem> TodoItems { get; set; }

        public TodoDbContext(DbContextOptions<TodoDbContext> options) :
            base(options) {
            Database.EnsureCreated();
        }

    }
}
