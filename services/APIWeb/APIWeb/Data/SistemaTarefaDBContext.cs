using APIWeb.Data.Map;
using APIWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Data
{
    public class SistemaTarefaDBContext : DbContext
    {
        public SistemaTarefaDBContext(DbContextOptions<SistemaTarefaDBContext> options) : base(options) { }

        public DbSet<UsuarioDTO> Usuarios { get; set; }
        public DbSet<TarefaDTO> Tarefas { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration( new UsuarioMap());
            modelBuilder.ApplyConfiguration( new TarefaMap());
            base.OnModelCreating(modelBuilder);
        }
    }
}
