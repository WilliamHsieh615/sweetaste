package com.demo.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

import com.demo.util.PasswordUtil;

public class RetrieveServlet extends HttpServlet {

	private static final String DB_URL = "jdbc:mysql://localhost:3306/sweetast?useSSL=false&serverTimezone=Asia/Taipei";
	private static final String DB_USER = "root";
	private static final String DB_PASSWORD = "12345678";

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json;charset=UTF-8");
		PrintWriter out = response.getWriter();

		// 先取得 session，一次取得就好
		HttpSession session = request.getSession();
		String sessionCode = (String) session.getAttribute("verifyCode");
		String sessionEmail = (String) session.getAttribute("verifyEmail");

		try {
			String action = request.getParameter("action");

			if ("verifyCode".equals(action)) {
				// 驗證驗證碼
				String code = request.getParameter("code");
				String email = request.getParameter("email");

				if (sessionCode != null && sessionEmail != null && sessionEmail.equals(email)
						&& sessionCode.equals(code)) {
					out.print("{\"success\":true}");
				} else {
					out.print("{\"success\":false, \"message\":\"驗證碼錯誤或已過期\"}");
				}
				out.flush();
				return;
			}

			// 重設密碼邏輯
			String account = request.getParameter("account");
			String password = request.getParameter("password");
			String code = request.getParameter("code");

			if (account == null || password == null) {
				out.print("{\"success\":false, \"message\":\"資料不完整\"}");
				out.flush();
				return;
			}

			if (code == null || code.length() != 4) {
				out.print("{\"success\":false, \"message\":\"請輸入完整的驗證碼\"}");
				out.flush();
				return;
			}

			// Session 驗證
			if (sessionCode == null || sessionEmail == null || !sessionEmail.equals(account)
					|| !sessionCode.equals(code)) {
				out.print("{\"success\":false, \"message\":\"驗證碼錯誤或已過期\"}");
				out.flush();
				return;
			}

			// 更新密碼到資料庫
			Class.forName("com.mysql.cj.jdbc.Driver");
			try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
				String hashedPassword = PasswordUtil.hashPassword(password);
				String sql = "UPDATE members SET password = ? WHERE account = ?";
				try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
					pstmt.setString(1, hashedPassword);
					pstmt.setString(2, account);

					int rows = pstmt.executeUpdate();
					if (rows > 0) {
						session.removeAttribute("verifyCode");
						session.removeAttribute("verifyEmail");
						out.print("{\"success\":true}");
					} else {
						out.print("{\"success\":false, \"message\":\"找不到帳號或更新失敗\"}");
					}
				}
			}
			out.flush();

		} catch (Exception e) {
			e.printStackTrace();
			out.print("{\"success\":false, \"message\":\"系統錯誤\"}");
			out.flush();
		}
	}
}
