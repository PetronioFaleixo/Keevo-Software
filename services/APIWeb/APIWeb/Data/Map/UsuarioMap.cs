using APIWeb.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace APIWeb.Data.Map
{
    public class UsuarioMap : IEntityTypeConfiguration<UsuarioDTO>
    {
        public void Configure(EntityTypeBuilder<UsuarioDTO> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Nome).IsRequired().HasMaxLength(200);
            builder.Property(x => x.Codigo).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Email).IsRequired().HasMaxLength(100);
            //builder.HasMany(u => u.Tarefas)
            //       .WithOne(t => t.Usuario)
            //       .HasForeignKey(t => t.UsuarioId)
            //       .IsRequired();
        }
    }
}
