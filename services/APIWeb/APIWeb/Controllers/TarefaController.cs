using APIWeb.Models;
using APIWeb.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    
    [ApiController]
    public class TarefaController : ControllerBase
    {
        private readonly ITarefaRepository _repository;
        public TarefaController(ITarefaRepository repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            return Ok(await _repository.Listar());
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
