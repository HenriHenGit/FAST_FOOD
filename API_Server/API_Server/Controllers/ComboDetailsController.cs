using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Microsoft.AspNetCore.Authorization;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComboDetailsController : ControllerBase
    {
        private readonly APIServerContext _context;

        public ComboDetailsController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/ComboDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ComboDetail>>> GetComboDetails()
        {
            return await _context.ComboDetails.ToListAsync();
        }

        // GET: api/ComboDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ComboDetail>> GetComboDetail(int id)
        {
            var comboDetail = await _context.ComboDetails.FindAsync(id);

            if (comboDetail == null)
            {
                return NotFound();
            }

            return comboDetail;
        }



        // PUT: api/ComboDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutComboDetail(int id, ComboDetail comboDetail)
        {
            if (id != comboDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(comboDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComboDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ComboDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ComboDetail>> PostComboDetail(ComboDetail comboDetail)
        {
            _context.ComboDetails.Add(comboDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComboDetail", new { id = comboDetail.Id }, comboDetail);
        }

        // DELETE: api/ComboDetails/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteComboDetail(int id)
        {
            var comboDetail = await _context.ComboDetails.FindAsync(id);
            if (comboDetail == null)
            {
                return NotFound();
            }

            _context.ComboDetails.Remove(comboDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ComboDetailExists(int id)
        {
            return _context.ComboDetails.Any(e => e.Id == id);
        }
    }
}
