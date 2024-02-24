using APIWeb.Data.Map;
using APIWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Data
{
    public class SistemaTarefaDBContext : DbContext
    {
        public SistemaTarefaDBContext(DbContextOptions<SistemaTarefaDBContext> options) : base(options) { }

        public DbSet<UsuarioModel> Usuarios { get; set; }
        public DbSet<TarefaModel> Tarefas { get; set; }
        public DbSet<StatusModel> Status { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration( new UsuarioMap());
            modelBuilder.ApplyConfiguration( new TarefaMap());
            modelBuilder.ApplyConfiguration( new StatusMap());
            base.OnModelCreating(modelBuilder);
        }
    }
}
