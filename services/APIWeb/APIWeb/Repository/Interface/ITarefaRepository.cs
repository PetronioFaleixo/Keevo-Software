using APIWeb.Models;

namespace APIWeb.Repository.Interface
{
    public interface ITarefaRepository
    {
        Task<List<TarefaModel>> Listar();
        Task<TarefaModel> Buscar(long id);
        Task Salvar(TarefaModel usuario);
        Task Remove(long id);
    }
}
