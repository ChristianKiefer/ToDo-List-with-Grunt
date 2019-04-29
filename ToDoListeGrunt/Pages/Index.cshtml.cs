using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ToDoListe.Models;

namespace ToDoListe.Pages
{
    using System;
    using System.Linq;

    public class IndexModel : PageModel
    {
        private readonly ToDoListeContext _context;

        public IndexModel(ToDoListeContext context)
        {
            _context = context;
        }

        public IList<ToDo> ToDo { get;set; }

        public async Task OnGetAsync()
        {
            var toDo = await _context.ToDo.ToListAsync();
            var date = DateTime.Now;
            ToDo = toDo
                .Where(x => x.DateToDo.Month == date.Month && x.DateToDo.Year == date.Year)
                .OrderBy(x => x.DateToDo)
                .ToList();
        }
    }
}
