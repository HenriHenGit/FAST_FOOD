using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;

namespace API_Server.Models
{
    public class Combo
    {
        public int Id { get; set; }
        public int? ProductTypeId { get; set; }
        [ForeignKey("ProductTypeId")]
        public ProductType ProductType { get; set; }
        public string Name { get; set; }

        public string Image { get; set; }
        [ForeignKey("Image")]
        public Image Images { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }

        public int Price { get; set; }

        public bool Status { get; set; }




    }
}
