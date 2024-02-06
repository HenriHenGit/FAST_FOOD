using Microsoft.AspNetCore.Identity;
using System.ComponentModel;

namespace API_Server.Models
{
    public class User : IdentityUser 
    {
        public string  Address {  get; set; }
        public string FirtName { get; set; }
        public string LastName { get; set; }
        public bool Status {  get; set; }


       

        
    }
}
