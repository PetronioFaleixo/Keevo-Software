using APIWeb.Models;
using APIWeb.Repository.Interface;
using APIWeb.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    
    [ApiController]
    public class TarefaController : ControllerBase
    {
        private readonly ITarefaRepository _repository;
        private readonly ITarefaService _service;
        public TarefaController(ITarefaRepository repository, ITarefaService service)
        {
            _repository = repository;
            _service = service;
        }
        [HttpGet]
        public async Task<IActionResult> Listar(long? status, long? usuario)
        {
            return Ok(await _service.Listar(status, usuario));
        }
        [HttpGet]
        public async Task<IActionResult> Buscar(long id)
        {
            return Ok(await _repository.Buscar(id));
        }

        [HttpPost]
        public async Task Salvar(TarefaModel dto)
        {
            await _repository.Salvar(dto);
        }
        [HttpDelete]
        public async Task Remove(long id)
        {
            await _repository.Remove(id);
        }
    }
}
