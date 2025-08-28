package com.demo.util;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtil {
    
    // 加密密碼
    public static String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }

    // 驗證密碼
    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }
}
