using APIWeb.Models;

namespace APIWeb.Repository.Interface
{
    public interface IStatusRepository
    {
        Task<List<StatusModel>> Listar();
        Task<StatusModel> Buscar(long id);
        Task Salvar(StatusModel status);
        Task Remove(long id);
    }
}

