﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ToDoListe.Models;

namespace ToDoListe.Pages.ToDos
{
    public class DetailsModel : PageModel
    {
        private readonly ToDoListe.Models.ToDoListeContext _context;

        public DetailsModel(ToDoListe.Models.ToDoListeContext context)
        {
            _context = context;
        }

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
    }
}
