using APIWeb.Models;

namespace APIWeb.Repository.Interface
{
    public interface IUsuarioRepository
    {
        Task<List<UsuarioDTO>> Listar();
        Task<UsuarioDTO> Buscar(long id);
        Task Salvar(UsuarioDTO usuario);
        Task Remove(long id);
    }
}
