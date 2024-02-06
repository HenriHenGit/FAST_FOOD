using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class ProductViewModel
    {
        public int Id { get; set; }

        public int? PromotionId { get; set; }
        [ForeignKey("PromotionId")]
        public Promotion Promotion { get; set; }

        public string SKU { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Price { get; set; }

        public int? ProductTypeId { get; set; }
        [ForeignKey("ProductTypeId")]
        public ProductType ProductType { get; set; }

        public int? Image { get; set; }
        [ForeignKey("Image")]
        public List<IFormFile> Images { get; set; }

        public bool Status { get; set; }
    }
}
