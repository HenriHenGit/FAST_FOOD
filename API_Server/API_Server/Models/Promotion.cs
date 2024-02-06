namespace API_Server.Models
{
    public class Promotion
    {
        public int Id { get; set; }

        public string PromotionName { get; set; }

        public string Description { get; set; }

        public int PromotionValue { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool Status { get; set; }


    }
}
