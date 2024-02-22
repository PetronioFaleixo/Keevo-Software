
namespace APIWeb.Models
{
    public class UsuarioDTO
    {
        public long Id { get; set; }
        public string Nome { get; set; }
        public string Codigo { get; set; }
        public string Email { get; set; }
        //public List<TarefaDTO> Tarefas { get; set; } = new List<TarefaDTO>();
    }
}
