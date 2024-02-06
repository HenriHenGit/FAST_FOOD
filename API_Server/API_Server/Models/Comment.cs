using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public int? ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }

        public string Content { get; set; }

        public DateTime CommentTime { get; set; }

        public int? CommentId { get; set; }
        [ForeignKey("CommentId")]
        public Comment ParentComment { get; set; }

        public bool Status { get; set; }


    }
}
