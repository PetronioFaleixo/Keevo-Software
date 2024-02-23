using APIWeb.Data;
using APIWeb.Models;
using APIWeb.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Repository.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly SistemaTarefaDBContext _context;
        public UsuarioRepository(SistemaTarefaDBContext context)
        {
            _context = context;
        }
        public async Task<List<UsuarioModel>> Listar()
        {
            return await _context.Usuarios.ToListAsync();
        }

        public async Task<UsuarioModel> Buscar(long id)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Salvar(UsuarioModel usuario)
        {
            if (usuario.Id != 0)
            {
                _context.Usuarios.Update(usuario);
            }
            else
            {
                _context.Usuarios.Add(usuario);
            }
            await _context.SaveChangesAsync();
        }

        public async Task Remove(long id)
        {
            var usuario = await Buscar(id);
            if (usuario == null)
            {
                throw new Exception($"Usuário para o ID : {id} não foi encontrado");
            }
            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

        }
    }
}
