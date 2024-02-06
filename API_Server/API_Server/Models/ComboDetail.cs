using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class ComboDetail
    {
        public int Id { get; set; }

        public int ComboId { get; set; }
        [ForeignKey("ComboId")]
        public Combo Combo { get; set; }

        public int? ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public string Description { get; set; }
        
    }
}
