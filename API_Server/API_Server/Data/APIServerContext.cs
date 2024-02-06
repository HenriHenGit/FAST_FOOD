using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using API_Server.Models;
    
namespace API_Server.Data
{
    public class APIServerContext : IdentityDbContext<User>
    {
        public APIServerContext(DbContextOptions<APIServerContext> options)
           : base(options)
        {
        }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceDetail> InvoiceDetails { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public object Product { get; internal set; }
        public DbSet<Combo> Combo { get; set; }
        public DbSet<ComboDetail> ComboDetails { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
    }
}
