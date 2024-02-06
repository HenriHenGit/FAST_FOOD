using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Microsoft.CodeAnalysis;
using Microsoft.AspNetCore.Authorization;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceDetailsController : ControllerBase
    {
        private readonly APIServerContext _context;

        public InvoiceDetailsController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/InvoiceDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvoiceDetail>>> GetInvoiceDetails()
        {
            return await _context.InvoiceDetails.Include(p=>p.Combo).ThenInclude(p =>p.Images)
                                                .Include(p => p.Product)
                                                .ToListAsync();
        }

        // GET: api/InvoiceDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceDetail>> GetInvoiceDetail(int id)
        {
            var invoiceDetail = await _context.InvoiceDetails.FindAsync(id);

            if (invoiceDetail == null)
            {
                return NotFound();
            }

            return invoiceDetail;
        }

        // PUT: api/InvoiceDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoiceDetail(int id, InvoiceDetail invoiceDetail)
        {
            if (id != invoiceDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoiceDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceDetailExists(id))
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

        //POST: api/InvoiceDetails
        //To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<InvoiceDetail>> PostInvoiceDetail(int? productId, int? comboId, int quantity, int unitPrice)
        {
            int? lastInvoiceId = await GetLastId();

            if (!lastInvoiceId.HasValue)
            {
                // Xử lý trường hợp GetLastId trả về giá trị null
                return BadRequest("Unable to retrieve a valid InvoiceId.");
            }

            InvoiceDetail invoidetail = new InvoiceDetail()
            {
                InvoiceId = lastInvoiceId.Value,
                ProductId = productId,
                ComboId = comboId,
                Quantity = quantity,
                UnitPrice = unitPrice
            };

            _context.InvoiceDetails.Add(invoidetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoiceDetail", new { id = invoidetail.Id }, invoidetail);
        }

        // DELETE: api/InvoiceDetails/5
        [HttpDelete("{id}")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> DeleteInvoiceDetail(int id)
        {
            var invoiceDetail = await _context.InvoiceDetails.FindAsync(id);
            if (invoiceDetail == null)
            {
                return NotFound();
            }

            _context.InvoiceDetails.Remove(invoiceDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceDetailExists(int id)
        {
            return _context.InvoiceDetails.Any(e => e.Id == id);
        }
        private async Task<int> GetLastId()
        {
            var lastProduct = await _context.Invoices.OrderByDescending(p => p.Id)
                .Select(p => p.Id)
                .FirstOrDefaultAsync();


            return lastProduct ;
        }
    }
}
