using API_Server.Data;
using API_Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly APIServerContext _context;

        public UsersController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, APIServerContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
            
        }
        

       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.Where(p => p.Status == true).ToListAsync();
        }

        [HttpGet("{id}")]
        
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        
        public async Task<IActionResult> ChangePassword(string userId, string newPassword)
        {
            // Lấy thông tin người dùng từ ID
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound("Người dùng không tồn tại");
            }

            // Thực hiện đổi mật khẩu
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, token, newPassword);

            if (result.Succeeded)
            {
                return Ok("Đổi mật khẩu thành công");
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }
        [HttpPut("{id}/admin")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id,string MKC,string email, [FromBody] User updatedUser)
        {
            //if (id != updatedUser.Id)
            //{
            //    return BadRequest();
            //}

            var existingUser = await _context.Users.FindAsync(id);

            //var checkemail = await _userManager.FindByEmailAsync(updatedUser.Email);

            if (existingUser == null)
            {
                return NotFound();
            }

            // Cập nhật chỉ các trường được phép
            existingUser.LastName = updatedUser.LastName;
            existingUser.FirtName = updatedUser.FirtName;
            if (!updatedUser.UserName.EndsWith("@gmail.com"))
            {
                if (!string.IsNullOrEmpty(updatedUser.Email))// đây
                {
                    var checkemail = await _userManager.FindByEmailAsync(updatedUser.Email);
                    if (checkemail != null)
                    {
                        existingUser.Email = updatedUser.Email;
                    }

                }
            }
            existingUser.Address = updatedUser.Address;
            existingUser.PhoneNumber = updatedUser.PhoneNumber;
            if (!updatedUser.UserName.EndsWith("@gmail.com"))
            {
                if (!string.IsNullOrEmpty(MKC))
                {

                    if (await _userManager.CheckPasswordAsync(existingUser, MKC))
                    {
                        var token = await _userManager.GeneratePasswordResetTokenAsync(existingUser);
                        var result = await _userManager.ResetPasswordAsync(existingUser, token, updatedUser.PasswordHash); ;
                    }
                    else
                    {
                        return BadRequest("Mật khẩu không khớp");
                    }
                }
            }
            // Thêm các trường khác cần cập nhật

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([Bind("UserName,PasswordHash")] User user1)
        {
            var user = await _userManager.FindByNameAsync(user1.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, user1.PasswordHash))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }
                // Thêm thông tin vai trò vào token
                var isAdmin = userRoles.Contains("Admin");
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    isAdmin = isAdmin
                });
            }
            return Unauthorized();
        }
        [HttpPost]
        [Route("logingg")]
        public async Task<IActionResult> Logingg([Bind("UserName,PasswordHash")] User user1, string flag)
        {
            var user = await _userManager.FindByNameAsync(user1.UserName);

            if (user != null && flag == "true")
            {
                // Check if the username contains @gmail.com
                bool isGmailUser = user1.UserName.ToLower().Contains("@gmail.com");

                if (isGmailUser)
                {
                    // If it's a Gmail user, generate JWT without checking the password
                    var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

                    var isAdmin = await _userManager.IsInRoleAsync(user, "Admin");
                    if (isAdmin)
                    {
                        authClaims.Add(new Claim(ClaimTypes.Role, "Admin"));
                    }

                    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                    var token = new JwtSecurityToken(
                        issuer: _configuration["JWT:ValidIssuer"],
                        audience: _configuration["JWT:ValidAudience"],
                        expires: DateTime.Now.AddHours(3),
                        claims: authClaims,
                        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                        isAdmin = isAdmin
                    });
                }
            }

            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(string LastName,string FirtName,string Address, string username, string password,string email, string phoneNumber, bool Status)
        {
            var userExists = await _userManager.FindByNameAsync(username);
            var userExistsEmails = userExists;
            if (email != null)
            {
                userExistsEmails = await _userManager.FindByNameAsync(email);
            }
            
            if (userExists != null)
                return BadRequest("Username đã được sử dụng, vui lòng nhập một username khác");
            else if (username.EndsWith("@gmail.com") && userExistsEmails == null && userExists != null)
                return BadRequest("Tên Username không sử dụng @gmail.com");
            if (userExistsEmails != null && userExists == null && !username.EndsWith("@gmail.com"))
                return BadRequest("Email đã được sử dụng với một tài khoản khác, vui lòng sử dụng một địa chỉ email khác");
            User user = new User()
            {
                FirtName = FirtName,
                LastName = LastName,
                Email = email,
                Address = Address,
                PhoneNumber = phoneNumber,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = username,
                Status = true
            };
            if (username.EndsWith("@gmail.com"))
            {
                // Cho phép mật khẩu null nếu tên người dùng kết thúc bằng "@gmail.com"
                var result = await _userManager.CreateAsync(user);
                if (!result.Succeeded)
                    return StatusCode(StatusCodes.Status500InternalServerError);
            }
            else
            {
                // Cho phép mật khẩu không null nếu tên người dùng không kết thúc bằng "@gmail.com"
                var result = await _userManager.CreateAsync(user, password);
                if (!result.Succeeded)
                    return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok();
        }
        


        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin(string LastName, string FirtName, string Address, string username, string password, string email, string phoneNumber, bool Status)
        {
            var userExists = await _userManager.FindByNameAsync(username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError);

            User user = new User()
            {
                FirtName = FirtName,
                LastName = LastName,
                Email = email,
                Address = Address,
                PhoneNumber = phoneNumber,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = username,
                Status = Status
            };
            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError);

            if (!await _roleManager.RoleExistsAsync("Admin"))
                await _roleManager.CreateAsync(new IdentityRole("Admin"));
            if (!await _roleManager.RoleExistsAsync("User"))
                await _roleManager.CreateAsync(new IdentityRole("User"));

            if (await _roleManager.RoleExistsAsync("Admin"))
            {
                await _userManager.AddToRoleAsync(user, "Admin");
            }

            return Ok();
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            user.Status = false;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpPost]
        [Route("forgot-password")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null )
            {
                return NotFound("Người dùng không tồn tại");
            }

            var code = ResetCodeManager.GenerateRandomCode();

            // Store the reset code using the ResetCodeManager
            ResetCodeManager.AddResetCode(email, code);

            await SendResetCodeByEmail(email, code);

            return Ok("Mã số đã được gửi đến email của bạn");
        }

        [HttpPost]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword(string email, string code, string newPassword)
        {
            // Retrieve the reset code using the ResetCodeManager
            if (ResetCodeManager.TryGetResetCode(email, out var storedCode) && code == storedCode)
            {
                var user = await _userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    return NotFound("Người dùng không tồn tại");
                }

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var result = await _userManager.ResetPasswordAsync(user, token, newPassword);

                if (result.Succeeded)
                {
                    // Remove the reset code using the ResetCodeManager after successful password reset
                    ResetCodeManager.RemoveResetCode(email);

                    return Ok("Đặt lại mật khẩu thành công");
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            else
            {
                return BadRequest("Mã số không đúng hoặc đã hết hạn");
            }
        }

        private string GenerateRandomCode()
        {
            return new Random().Next(100000, 999999).ToString();
        }

        private async Task SendResetCodeByEmail(string email, string code)
        {
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("fsatfoodldh@gmail.com", "dqfk vclr ebke wgnj"),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("fsatfoodldh@gmail.com"),
                    Subject = "Reset Password Code",
                    Body = $"Your reset password code is: {code}",
                    IsBodyHtml = false,
                };

                mailMessage.To.Add(email);

                smtpClient.SendMailAsync(mailMessage);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                Console.WriteLine($"Error sending email: {ex.Message}");
                throw; // Rethrow the exception to propagate it further if needed
            }
        }

        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
