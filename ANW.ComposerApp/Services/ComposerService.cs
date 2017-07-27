using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ANW.ComposerApp.App_Data;
using ANW.ComposerApp.Models;

namespace ANW.ComposerApp.Services
{
    public class ComposerService : IComposerService
    {
        public Task<IEnumerable<Composer>> GetComposersAsync()
        {
            return Task.Factory.StartNew(() => ComposerRepository.Composers);
        }

        public Task<Composer> GetComposerByIdAsync(int id)
        {
            return Task.Factory.StartNew(() => ComposerRepository.Composers.SingleOrDefault(x => x.Id == id));
        }
    }
}