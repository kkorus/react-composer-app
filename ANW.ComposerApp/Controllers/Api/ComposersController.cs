using System.Threading.Tasks;
using System.Web.Http;
using ANW.ComposerApp.Services;

namespace ANW.ComposerApp.Controllers.Api
{
    public class ComposersController : ApiController
    {
        private readonly IComposerService _composerService;

        public ComposersController(IComposerService composerService)
        {
            _composerService = composerService;
        }

        [HttpGet]
        [Route("composers")]
        public async Task<IHttpActionResult> GetComposers()
        {
            var compoers = await _composerService.GetComposersAsync();
            return Ok(compoers);
        }

        [HttpGet]
        [Route("composers/{id:int}")]
        public async Task<IHttpActionResult> GetComposer(int id)
        {
            var compoer = await _composerService.GetComposerByIdAsync(id);
            if (compoer == null)
            {
                return NotFound();
            }

            return Ok(compoer);
        }
    }
}
