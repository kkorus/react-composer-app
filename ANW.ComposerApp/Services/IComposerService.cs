using System.Collections.Generic;
using System.Threading.Tasks;
using ANW.ComposerApp.Models;

namespace ANW.ComposerApp.Services
{
    public interface IComposerService
    {
        Task<IEnumerable<Composer>> GetComposersAsync();

        Task<Composer> GetComposerByIdAsync(int id);
    }
}