using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Rating
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public int? ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public int? ComboId { get; set; }
        [ForeignKey("ComboId")]
        public Combo Combo { get; set; }

        public int? InvoiceDetailId { get; set; }
        [ForeignKey("InvoiceDetailId")]
        public InvoiceDetail InvoiceDetail { get; set; }

        public int? InvoiceId { get; set; }
        [ForeignKey("InvoiceId")]
        public Invoice Invoice { get; set; }

        public float Score { get; set; }

        public string Comment { get; set; }

        public DateTime RatingTime { get; set; }

        public bool Status { get; set;}
    }
}
