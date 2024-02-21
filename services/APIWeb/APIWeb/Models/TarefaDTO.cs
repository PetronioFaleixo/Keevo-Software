namespace APIWeb.Models
{
    public class TarefaDTO
    {
        public long Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public bool? Status { get; set; }
    }
}
