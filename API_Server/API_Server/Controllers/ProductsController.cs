using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using System.Xml.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   

    public class ProductsController : ControllerBase
    {
        private readonly APIServerContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductsController(APIServerContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.Include(p => p.Images)
                                           .Include(p => p.ProductType)
                                           .Where(p => p.Status == true)
                .ToListAsync();
        }
        //GETLast: api/Products
        //[HttpGet("Last")]
       
        private async Task<int> GetLastId()
        {
            var lastProduct = await _context.Products.OrderByDescending(p => p.Id)
                .Select(p => p.Id)
                .FirstOrDefaultAsync();


            return lastProduct;
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.Images)
                .Include(c => c.ProductType)
               .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }
        // GET: api/Products/ByProductTypeId/5
        [HttpGet("ByProductTypeId/{productTypeId}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByProductTypeId(int productTypeId)
        {
            var products = await _context.Products
                .Include(p => p.Images)
                .Include(p => p.ProductType)//đây
                .Where(product => product.ProductTypeId == productTypeId)
                .ToListAsync();

            if (products == null || products.Count == 0)
            {
                return NotFound();
            }

            return products;
        }
        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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
        //[HttpPost]
        //public async Task<ActionResult<Product>> PostProduct(Product product)
        //{
        //    _context.Products.Add(product);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        //}
        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // 
        //[HttpPost("data")]
        //public async Task<ActionResult<Product>> PostProduct([Bind("PromotionId,SKU,Name,Description,Price,ProductTypeId,Status")] Product data)
        //{
        //    int lastProductId = await GetLastId() + 1;
        //    Product product = new Product()
        //    {
        //        PromotionId = data.PromotionId,
        //        SKU = data.SKU,
        //        Name = data.Name,
        //        Description = data.Description,
        //        Price = data.Price,
        //        ProductTypeId = data.ProductTypeId,
        //        Image = lastProductId,
        //        Status = data.Status
        //    };
        //    _context.Products.Add(product);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        //}
        //[HttpPost]
        //[Route("Files")]
        //public async Task<IActionResult> PostProductFiles( [FromForm] List<IFormFile> Images)
        //{
        //    int lastProductId = await GetLastId() + 1;

        //    if (Images.Count > 0)
        //    {
        //        foreach (var item in Images)
        //        {
        //            // Lấy tên file
        //            string fileName = item.FileName;
        //            // Đường dẫn lưu file trong thư mục wwwroot
        //            string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "Images", fileName);
        //            // Lưu file vào thư mục wwwroot
        //            using (var stream = new FileStream(uploadPath, FileMode.Create))
        //            {
        //                await item.CopyToAsync(stream);
        //            }
        //            Image image = new Image()
        //            {
        //                ImageId = lastProductId,
        //                Img = item.FileName.ToString()
        //            };
        //            _context.Images.Add(image);
        //        }
        //    }
        //    else
        //    {
        //        return NotFound();
        //    }
        //    await _context.SaveChangesAsync();

        //    return Ok(new { Message = "Files uploaded successfully", Status = "OK" });
        //[HttpPost]
        //public async Task<ActionResult<Product>> PostProduct(Product product)
        //{
        //    _context.Products.Add(product);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        //}    
        //public async Task<IActionResult> PostProduct([FromForm] Product pFrom)//}
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<Product>> PostProduct([FromForm] Product pFrom)
        {
            int lastImageId = await GetLastId() + 1;
            
          
                Product product = new Product()
                {
                    PromotionId = pFrom.PromotionId,
                    SKU = pFrom.SKU,
                    Name = pFrom.Name,
                    Description = pFrom.Description,
                    Price = pFrom.Price,
                    ProductTypeId = pFrom.ProductTypeId,
                    Image = ("SP" + lastImageId.ToString()),
                    Status = pFrom.Status
                };
                if (pFrom.ImageFile.Length > 0)
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
                            Id = ("SP" + lastImageId.ToString()),
                            ImageId = lastImageId,
                            Img = pFrom.ImageFile.FileName.ToString()
                        };
                        _context.Images.Add(image);
                }
                else
                {
                    return NotFound();
                }
                await _context.SaveChangesAsync();
                _context.Products.Add(product);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            product.Status = false;
            //_context.Products.Remove(product);
            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Product>>> SearchProducts([FromQuery] string query, int producttype, int? price, int? priceMax)
        {

            if (string.IsNullOrWhiteSpace(query) && producttype == 0 && !price.HasValue && !priceMax.HasValue)
            {
                // If the query is empty, return all products
                return await GetProducts();
            }

            // Use the query parameter to filter products based on SKU, Name, or Description
            var products = await _context.Products
                .Include(p => p.Images)
                .Include(p => p.ProductType)
                .Where(p => p.Status == true &&
                            ((p.SKU.Contains(query) ||
                            p.Name.Contains(query) ||
                            p.Description.Contains(query)) &&
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
        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
