using System;
using System.Collections.Generic;

namespace API_Server.Data
{
    public class ResetCodeManager
    {
        private static readonly Dictionary<string, string> ResetCodes = new Dictionary<string, string>();

        public static string GenerateRandomCode()
        {
            return new Random().Next(100000, 999999).ToString();
        }

        public static void AddResetCode(string email, string code)
        {
            // Store the reset code in the dictionary
            ResetCodes[email] = code;
        }

        public static bool TryGetResetCode(string email, out string code)
        {
            // Retrieve the reset code from the dictionary
            return ResetCodes.TryGetValue(email, out code);
        }

        public static void RemoveResetCode(string email)
        {
            // Remove the reset code from the dictionary
            ResetCodes.Remove(email);
        }
    }
}
