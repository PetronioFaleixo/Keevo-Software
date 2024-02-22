using APIWeb.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace APIWeb.Data.Map
{
    public class TarefaMap : IEntityTypeConfiguration<TarefaDTO>
    {
        public void Configure(EntityTypeBuilder<TarefaDTO> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Nome).IsRequired().HasMaxLength(200);
            builder.Property(x => x.Descricao).IsRequired().HasMaxLength(1000);
            builder.Property(x => x.Status).IsRequired();
            //builder.Property(x => x.UsuarioId);

            //builder.HasOne(x => x.Usuario)
            //       .WithMany(u => u.Tarefas)
            //       .HasForeignKey(x => x.UsuarioId);
                   
        }
    }
}
