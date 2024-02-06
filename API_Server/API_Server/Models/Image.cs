using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Image
    {
        public string Id { get; set; }

        public int ImageId { get; set; }

        public string Img { get; set; }
    }
}
