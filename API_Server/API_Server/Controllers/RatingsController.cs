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
    public class RatingsController : ControllerBase
    {
        private readonly APIServerContext _context;

        public RatingsController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/Ratings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rating>>> GetRatings()
        {
            return await _context.Ratings
                .Include(r => r.Product)
                .Include(r => r.Combo)
                .Include(r => r.InvoiceDetail)
                .Select(r => new Rating
                {
                    // Copy các trường từ đối tượng Rating
                    Id = r.Id,
                    ProductId = r.ProductId,
                    ComboId = r.ComboId,
                    InvoiceDetailId = r.InvoiceDetailId,
                    InvoiceDetail = new InvoiceDetail { Id = r.InvoiceDetail.Id, InvoiceId = r.InvoiceDetail.InvoiceId },
                    InvoiceId = r.InvoiceId,
                    Comment = r.Comment,
                    Score = r.Score,
                    RatingTime = r.RatingTime,
                    User = new User { UserName = r.User.UserName, FirtName = r.User.FirtName ,LastName = r.User.LastName }
                })
                .ToListAsync();
        }

        // GET: api/Ratings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rating>> GetRating(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);

            if (rating == null)
            {
                return NotFound();
            }

            return rating;
        }

        // PUT: api/Ratings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutRating(int id, Rating rating)
        {
            if (id != rating.Id)
            {
                return BadRequest();
            }

            _context.Entry(rating).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RatingExists(id))
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

        // POST: api/Ratings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Rating>> PostRating(Rating rating)
        {
            //string userId, int? productId, int? comboId, DateTime?
            //ratingTime, float score, string? comment, int invoiceId, int invoiceDetailId, bool status
            var user = await _context.Users.FindAsync(rating.UserId);
            if (user == null)
            {
                return BadRequest("Lỗi không có tài ");
            }
            //Rating rating = new Rating()
            //{
            //    UserId = userId,
            //    ProductId = productId,
            //    ComboId = comboId,
            //    RatingTime = DateTime.Now,
            //    Score = score,
            //    Comment = comment,
            //    InvoiceId = invoiceId,
            //    InvoiceDetailId = invoiceDetailId,
            //    Status = status
            //};
            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRating", new { id = rating.Id }, rating);
        }

        // DELETE: api/Ratings/5
        [HttpDelete("{id}")]
        [Authorize (Roles ="Admin")]
        public async Task<IActionResult> DeleteRating(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);
            if (rating == null)
            {
                return NotFound();
            }

            _context.Ratings.Remove(rating);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RatingExists(int id)
        {
            return _context.Ratings.Any(e => e.Id == id);
        }
    }
}
