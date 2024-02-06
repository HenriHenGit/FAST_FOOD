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
    

    public class InvoicesController : ControllerBase
    {
        private readonly APIServerContext _context;

        public InvoicesController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/Invoices
        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            return await _context.Invoices.Include(p => p.Promotion)
                                           .Include(p => p.User)
                                           .Include(p => p.OrderStatus)
                                           .Where(p => p.Status == true)
                                            .ToListAsync();
        }

        [HttpGet("Status")]
        
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoicesStatus(int id, string username)
        {

            return await _context.Invoices.AsNoTracking().Include(p => p.Promotion)
                        .Include(p => p.User)
                        .Include(p => p.OrderStatus)
                        .Include(p => p.InvoiceDetails)
                              
                               .ThenInclude(d => d.Product)
                                    .ThenInclude(p => p.Images)
                              .Include(p => p.InvoiceDetails)
                                .ThenInclude(d => d.Combo)
                                    .ThenInclude(c => c.Images)


                        .Where(p => p.Status == true)
                        .Where(p => p.OrderStatusId == id)
                        .Where(p => p.UserId == username)
                        .Select(p => new Invoice
                        {
                            Id = p.Id,
                            Total = p.Total,
                            PromotionId = p.PromotionId,
                            Promotion = p.Promotion,
                            IssuedDate = p.IssuedDate,
                            OrderStatusId = p.OrderStatusId,

                            // Copy other properties as needed
                            InvoiceDetails = p.InvoiceDetails.Select(d => new InvoiceDetail
                            {
                                // Copy properties from InvoiceDetail as needed
                                Product = d.Product,
                                Combo = d.Combo,
                               Quantity = d.Quantity,
                               UnitPrice = d.UnitPrice
                            }).ToList()
                        })
                        .ToListAsync();
        }
    



            // GET: api/Invoices/5
        [HttpGet("{id}")]
        

        public async Task<ActionResult<Invoice>> GetInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }

        // PUT: api/Invoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize (Roles ="Admin")]
        

        public async Task<IActionResult> PutInvoice(int id, Invoice invoice)
        {
            if (id != invoice.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
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

        // POST: api/Invoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]

        public async Task<ActionResult> PostInvoice(Invoice invoice)
        {

            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoice", new { id = invoice.Id }, invoice);
        }

        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }
            invoice.OrderStatusId = 5;

            _context.Invoices.Update(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceExists(int id)
        {
            return _context.Invoices.Any(e => e.Id == id);
        }
       
    }
}
