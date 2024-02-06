using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Invoice
    {
        public int Id { get; set; }

        public int? PromotionId { get; set; }
        [ForeignKey("PromotionId")]
        public Promotion Promotion { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        public DateTime IssuedDate { get; set;}

        public string ShippingAddress { get; set; }

        public string ShippingPhone { get; set;}

        public int Total { get; set;}
        public int OrderStatusId {  get; set; }
        [ForeignKey("OrderStatusId")]
        public OrderStatus OrderStatus { get; set; }

        public bool Status { get; set; }
         
        public List<InvoiceDetail> InvoiceDetails { get; set; }



    }
}
