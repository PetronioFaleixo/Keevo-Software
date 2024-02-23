using APIWeb.Models;

namespace APIWeb.Repository.Interface
{
    public interface IUsuarioRepository
    {
        Task<List<UsuarioModel>> Listar();
        Task<UsuarioModel> Buscar(long id);
        Task Salvar(UsuarioModel usuario);
        Task Remove(long id);
    }
}
