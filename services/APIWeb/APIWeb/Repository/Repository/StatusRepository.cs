using APIWeb.Data;
using APIWeb.Models;
using APIWeb.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Repository.Repository
{
    public class StatusRepository : IStatusRepository
    {
        private readonly SistemaTarefaDBContext _context;
        public StatusRepository(SistemaTarefaDBContext context)
        {
            _context = context;
        }
        public async Task<List<StatusModel>> Listar()
        {
            return await _context.Status.ToListAsync();
        }

        public async Task<StatusModel> Buscar(long id)
        {
            return await _context.Status.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Salvar(StatusModel usuario)
        {
            if (usuario.Id != 0)
            {
                _context.Status.Update(usuario);
            }
            else
            {
                _context.Status.Add(usuario);
            }
            await _context.SaveChangesAsync();
        }

        public async Task Remove(long id)
        {
            var stats = await Buscar(id);
            if (stats == null)
            {
                throw new Exception($"Status para o ID : {id} não foi encontrado");
            }
            _context.Status.Remove(stats);
            await _context.SaveChangesAsync();

        }
    }
}
