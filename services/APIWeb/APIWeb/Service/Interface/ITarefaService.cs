using APIWeb.Models;

namespace APIWeb.Service.Interface
{
    public interface ITarefaService
    {

        Task<List<TarefaModel>> Listar(long? status, long? usuario);
    }
}
