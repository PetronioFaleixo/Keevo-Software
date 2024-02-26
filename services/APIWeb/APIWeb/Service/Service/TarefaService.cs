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

        public async Task<List<TarefaModel>> Listar(long? status = null, long? usuario = null)
        {
            var retorno = await _repository.Listar();

            if (retorno == null || retorno.Count == 0)
            {
                throw new Exception("Não há Tarefas para serem listadas");
            }

            if (status != null && usuario != null)
            {
                return retorno.Where(x => x.UsuarioId == usuario && x.StatusId == status).ToList();
            }
            else if (status != null)
            {
                return retorno.Where(x => x.StatusId == status).ToList();
            }
            else if (usuario != null)
            {
                return retorno.Where(x => x.UsuarioId == usuario).ToList();
            }

            return retorno;
        }
    }
}
