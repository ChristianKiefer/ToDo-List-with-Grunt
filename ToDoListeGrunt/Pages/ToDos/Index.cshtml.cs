using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ToDoListe.Models;

namespace ToDoListe.Pages.ToDos
{
    using System.Linq;

    public class IndexModel : PageModel
    {
        private readonly ToDoListe.Models.ToDoListeContext _context;

        public IndexModel(ToDoListe.Models.ToDoListeContext context)
        {
            _context = context;
        }

        public IList<ToDo> ToDo { get;set; }

        public async Task OnGetAsync()
        {
            var toDo = await _context.ToDo.ToListAsync();

            ToDo = toDo.OrderBy(x => x.DateToDo).ToList();
        }
    }
}
