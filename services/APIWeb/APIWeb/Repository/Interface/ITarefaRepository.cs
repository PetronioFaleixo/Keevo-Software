using APIWeb.Models;

namespace APIWeb.Repository.Interface
{
    public interface ITarefaRepository
    {
        Task<List<TarefaDTO>> Listar();
        Task<TarefaDTO> Buscar(long id);
        Task Salvar(TarefaDTO usuario);
        Task Remove(long id);
    }
}
