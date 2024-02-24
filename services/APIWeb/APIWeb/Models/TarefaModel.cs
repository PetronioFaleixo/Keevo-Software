namespace APIWeb.Models
{
    public class TarefaModel
    {
        public long Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public long? UsuarioId { get; set; }
        public long StatusId { get; set; }
        public virtual UsuarioModel? Usuario { get; set; }
        public virtual StatusModel Status { get; set; }
    }
}
