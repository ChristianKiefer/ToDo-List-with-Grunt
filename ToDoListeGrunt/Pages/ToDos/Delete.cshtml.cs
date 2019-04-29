using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ToDoListe.Models;

namespace ToDoListe.Pages.ToDos
{
    public class DeleteModel : PageModel
    {
        private readonly ToDoListe.Models.ToDoListeContext _context;

        public DeleteModel(ToDoListe.Models.ToDoListeContext context)
        {
            _context = context;
        }

        [BindProperty]
        public ToDo ToDo { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            ToDo = await _context.ToDo.FirstOrDefaultAsync(m => m.ID == id);

            if (ToDo == null)
            {
                return NotFound();
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            ToDo = await _context.ToDo.FindAsync(id);

            if (ToDo != null)
            {
                _context.ToDo.Remove(ToDo);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
