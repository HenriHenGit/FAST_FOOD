using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class InvoiceDetail
    {
        public int Id { get; set; }

        public int? InvoiceId { get; set; }
        [ForeignKey("InvoiceId")]
        public Invoice Invoice { get; set; }
        public int? ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public int? ComboId { get; set; }
        [ForeignKey("ComboId")]
        public Combo Combo { get; set; }
        public int Quantity { get; set; }

        public int UnitPrice { get; set; }

    }
}
