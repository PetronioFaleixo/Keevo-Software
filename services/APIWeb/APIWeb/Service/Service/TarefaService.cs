using APIWeb.Models;
using APIWeb.Repository.Interface;
using APIWeb.Service.Interface;

namespace APIWeb.Service.Service
{
    public class TarefaService : ITarefaService
    {
        private readonly ITarefaRepository _repository;
        public TarefaService(ITarefaRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<TarefaModel>> Listar(long? status, long? usuario)
        {
            var retorno = await _repository.Listar();

            if (retorno == null || retorno.Count == 0)
            {
                return null;
                throw new Exception("Não há Tarefas para serem listadas");
            }
            return retorno.Where(x => (usuario == null || x.UsuarioId == usuario) && (status == null || x.StatusId == status)).ToList();
        }
    }
}
