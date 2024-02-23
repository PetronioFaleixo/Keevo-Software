using APIWeb.Data;
using APIWeb.Models;
using APIWeb.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Repository.Repository
{
    public class TarefaRepository : ITarefaRepository
    {
        private readonly SistemaTarefaDBContext _context;
        public TarefaRepository(SistemaTarefaDBContext context)
        {
            _context = context;
        }
        public async Task<List<TarefaModel>> Listar()
        {
           var retorno = await _context.Tarefas.ToListAsync();
            return retorno;
        }

        public async Task<TarefaModel> Buscar(long id)
        {
            return await _context.Tarefas.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Salvar(TarefaModel tarefa)
        {
            if (tarefa.Id != 0)
            {
                _context.Tarefas.Update(tarefa);
            }
            else
            {
                _context.Tarefas.Add(tarefa);
            }
            await _context.SaveChangesAsync();
        }

        public async Task Remove(long id)
        {
            var tarefa = await Buscar(id);
            if (tarefa == null)
            {
                throw new Exception($"Tarefa para o ID : {id} não foi encontrado");
            }
            _context.Tarefas.Remove(tarefa);
            await _context.SaveChangesAsync();

        }
    }
}
