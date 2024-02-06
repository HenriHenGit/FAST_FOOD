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
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComboesController : ControllerBase
    {
        private readonly APIServerContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ComboesController(APIServerContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        private async Task<int> GetLastComBoId()
        {
            var lastCombo = await _context.Combo.OrderByDescending(p => p.Id)
                .Select(p => p.Id)
                .FirstOrDefaultAsync();


            return lastCombo;
        }

        // GET: api/Comboes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Combo>>> GetCombo()
        {
            return await _context.Combo.Include(p => p.Images)
                                        .Include(p => p.ProductType)
                                        .Where(p => p.Status == true)
                .ToListAsync();
        }

        // GET: api/Comboes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Combo>> GetCombo(int id, int productTypeId)
        {
            var combo = await _context.Combo
                        .Include(c => c.Images)
                        .Include(c=>c.ProductType)
                        .Where(c => c.Id == id && c.ProductTypeId == productTypeId)
                        .FirstOrDefaultAsync();

            if (combo == null)
            {
                return NotFound();
            }

            return combo;
        }

        // PUT: api/Comboes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutCombo(int id, Combo combo)
        {
            if (id != combo.Id)
            {
                return BadRequest();
            }

            _context.Entry(combo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComboExists(id))
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
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<Combo>> PostCombo([FromForm] Combo pFrom)
        {
            
            int lastComboId = await GetLastComBoId() + 1;


            Combo combo = new Combo()
            {
                ProductTypeId = pFrom.ProductTypeId,
                Name = pFrom.Name,
                Image = ("CP" + lastComboId.ToString()),
                Price = pFrom.Price,
                Status = pFrom.Status
            };
            if ( pFrom.ImageFile.Length > 0)
            {

                // Lấy tên file
                string fileName = pFrom.ImageFile.FileName;
                // Đường dẫn lưu file trong thư mục wwwroot
                string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "Images", fileName);
                // Kiểm tra xem tệp đã tồn tại chưa
                if (System.IO.File.Exists(uploadPath))
                {
                    // Nếu tồn tại, xóa hoặc đổi tên tệp
                    System.IO.File.Delete(uploadPath);
                }
                // Lưu file vào thư mục wwwroot
                using (var stream = new FileStream(uploadPath, FileMode.Create))
                {
                    await pFrom.ImageFile.CopyToAsync(stream);
                }
                Image image = new Image()
                {
                    Id = ("CP" + lastComboId.ToString()),
                    ImageId = lastComboId,
                    Img = pFrom.ImageFile.FileName.ToString()
                };
                _context.Images.Add(image);
            }
            else
            {
                return NotFound();
            }
            await _context.SaveChangesAsync();
            _context.Combo.Add(combo);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCombo", new { id = combo.Id }, combo);






        }

        // POST: api/Comboes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //[Authorize(Roles = "Admin")]
        //public async Task<ActionResult<Combo>> PostCombo(Combo combo)
        //{
        //    _context.Combo.Add(combo);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetCombo", new { id = combo.Id }, combo);
        //}

        // DELETE: api/Comboes/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCombo(int id)
        {
            var combo = await _context.Combo.FindAsync(id);
            if (combo == null)
            {
                return NotFound();
            }

            _context.Combo.Remove(combo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("ByProductTypeId/{productTypeId}")]
        public async Task<ActionResult<IEnumerable<Combo>>> GetCombosByProductTypeId(int productTypeId)
        {
            var combos = await _context.Combo//đây 
                .Include(p => p.ProductType)//đây
                .Include(p => p.Images)
                .Where(combo => combo.ProductTypeId == productTypeId)
                .ToListAsync();

            if (combos == null || combos.Count == 0)
            {
                return NotFound();
            }

            return combos;
        }
        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Combo>>> SearchComboes([FromQuery] string query, int producttype, int? price, int? priceMax)
        {

            if (string.IsNullOrWhiteSpace(query) && producttype == 0 && !price.HasValue && !priceMax.HasValue)
            {
                // If the query is empty, return all products
                return await GetCombo();
            }

            // Use the query parameter to filter products based on SKU, Name, or Description
            var products = await _context.Combo
                .Include(p => p.Images)
                .Include(p => p.ProductType)
                .Where(p => p.Status == true &&
                            (p.Name.Contains(query) &&
                            (producttype == 0 || p.ProductType.Id == producttype) &&
                            (!price.HasValue || p.Price >= price) &&
                            (!priceMax.HasValue || p.Price <= priceMax)))
                .ToListAsync();

            if (products == null || products.Count == 0)
            {
                return NotFound();
            }

            return products;
        }
        private bool ComboExists(int id)
        {
            return _context.Combo.Any(e => e.Id == id);
        }
    }
}
