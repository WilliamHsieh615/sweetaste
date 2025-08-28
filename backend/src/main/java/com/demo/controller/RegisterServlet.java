package com.demo.controller;

import jakarta.servlet.ServletException;

import jakarta.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

import com.demo.util.PasswordUtil;

public class RegisterServlet extends HttpServlet {

	private static final String DB_URL = "jdbc:mysql://localhost:3306/sweetaste?useSSL=false&serverTimezone=Asia/Taipei";
	private static final String DB_USER = "root";
	private static final String DB_PASSWORD = "12345678";

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json;charset=UTF-8");
		PrintWriter out = response.getWriter();

		// 接收前端資料
		String account = request.getParameter("account");
		String password = request.getParameter("password");
		String promotionalInfoParam = request.getParameter("promotionalInfo");

		boolean promotionalInfo = promotionalInfoParam != null;

		// 驗證欄位
		if (account == null || account.isEmpty() || password == null || password.isEmpty()) {
			out.print("{\"success\":false, \"message\":\"帳號與密碼不得為空\"}");
			return;
		}

		// 驗證碼
		String code1 = request.getParameter("code1");
		String code2 = request.getParameter("code2");
		String code3 = request.getParameter("code3");
		String code4 = request.getParameter("code4");

		if (code1 == null || code2 == null || code3 == null || code4 == null) {
			out.print("{\"success\":false, \"message\":\"請輸入完整的驗證碼\"}");
			return;
		}

		String inputCode = code1 + code2 + code3 + code4;

		// 從 Session 中取得伺服器寄出的驗證碼與帳號
		HttpSession session = request.getSession();
		String sessionCode = (String) session.getAttribute("verifyCode");
		String sessionEmail = (String) session.getAttribute("verifyEmail");

		// debug 印出 Session 內驗證碼與帳號
		System.out.println("sessionCode: " + sessionCode);
		System.out.println("sessionEmail: " + sessionEmail);
		System.out.println("inputCode: " + inputCode);

		if (sessionCode == null || sessionEmail == null || !sessionEmail.equals(account)
				|| !sessionCode.equals(inputCode)) {
			out.print("{\"success\":false, \"message\":\"驗證碼錯誤或已過期\"}");
			return;
		}

		// 資料庫處理
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");

			try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {

				// 檢查帳號是否已存在
				String checkSql = "SELECT COUNT(*) FROM members WHERE account = ?";
				try (PreparedStatement checkStmt = conn.prepareStatement(checkSql)) {
					checkStmt.setString(1, account);
					ResultSet rs = checkStmt.executeQuery();
					rs.next();
					if (rs.getInt(1) > 0) {
						out.print("{\"success\":false, \"message\":\"帳號已存在\"}");
						return;
					}
				}

				// 寫入新會員資料
				String hashedPassword = PasswordUtil.hashPassword(password);
				String insertSql = "INSERT INTO members (account, password, promotional_info) VALUES (?, ?, ?)";
				try (PreparedStatement pstmt = conn.prepareStatement(insertSql)) {
					pstmt.setString(1, account);
					pstmt.setString(2, hashedPassword);
					pstmt.setBoolean(3, promotionalInfo); // 將布林轉為 tinyint(1)

					int rows = pstmt.executeUpdate();
					if (rows > 0) {
						session.removeAttribute("verifyCode");
						session.removeAttribute("verifyEmail");
						out.print("{\"success\":true}");
					} else {
						out.print("{\"success\":false, \"message\":\"註冊失敗，請稍後再試\"}");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			out.print("{\"success\":false, \"message\":\"系統錯誤，請聯絡管理員\"}");
		}
	}
}
