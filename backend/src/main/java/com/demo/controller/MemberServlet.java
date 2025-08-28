package com.demo.controller;

import com.demo.domain.Member;
import com.demo.util.PasswordUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.sql.*;

public class MemberServlet extends HttpServlet {

	private static final String DB_URL = "jdbc:mysql://localhost:3306/sweetaste?useSSL=false&serverTimezone=Asia/Taipei";
	private static final String DB_USER = "root";
	private static final String DB_PASSWORD = "12345678";

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session = request.getSession(false);
		String account = (session != null) ? (String) session.getAttribute("account") : null;

		if (account == null) {
			response.sendRedirect("login.jsp");
			return;
		}

		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
				String sql = "SELECT * FROM members WHERE account = ?";
				try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
					pstmt.setString(1, account);
					try (ResultSet rs = pstmt.executeQuery()) {
						if (rs.next()) {
							Member member = new Member();
							member.setId(rs.getInt("id"));
							member.setAccount(rs.getString("account"));
							member.setPassword(rs.getString("password"));
							member.setName(rs.getString("name"));
							member.setPhone(rs.getString("phone"));
							member.setBirthday(rs.getDate("birthday"));
							member.setPromotionalInfo(rs.getBoolean("promotional_info"));
							member.setCreatedAt(rs.getTimestamp("created_at"));

							session.setAttribute("member", member);
							request.getRequestDispatcher("member.jsp").forward(request, response);
							return;
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		response.sendRedirect("login.jsp?error=notfound");
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");

		HttpSession session = request.getSession(false);
		Member member = (session != null) ? (Member) session.getAttribute("member") : null;

		if (member == null) {
			response.sendRedirect("login.jsp");
			return;
		}

		String account = member.getAccount();
		String name = request.getParameter("name");
		String phone = request.getParameter("phone");
		String birthdayStr = request.getParameter("birthday");
		String newPassword = request.getParameter("password");
		boolean promotionalInfo = request.getParameter("promotionalInfo") != null;

		Date birthday = null;
		if (birthdayStr != null && !birthdayStr.isEmpty()) {
			birthday = Date.valueOf(birthdayStr);
		}

		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {

				// 密碼變更
				if (newPassword != null && !newPassword.trim().isEmpty()) {
					if (!newPassword.matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,12}$")) {
						request.setAttribute("errorMsg", "密碼格式錯誤，請輸入6~12碼英數字混合密碼");
						request.getRequestDispatcher("member.jsp").forward(request, response);
						return;
					}
					
					String hashedPassword = PasswordUtil.hashPassword(newPassword);
					String sql = "UPDATE members SET password = ? WHERE account = ?";
					try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
						pstmt.setString(1, hashedPassword);
						pstmt.setString(2, account);
						int rows = pstmt.executeUpdate();
						if (rows > 0) {
							member.setPassword(newPassword);
							session.setAttribute("member", member);
						} else {
							request.setAttribute("errorMsg", "密碼更新失敗");
							request.getRequestDispatcher("member.jsp").forward(request, response);
							return;
						}
					}
					response.sendRedirect("member?msg=passwordChanged");
					return;
				}

				// 會員資料更新
				String sql = "UPDATE members SET name = ?, phone = ?, birthday = ?, promotional_info = ? WHERE account = ?";
				try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
					pstmt.setString(1, name);
					pstmt.setString(2, phone);
					pstmt.setDate(3, birthday);
					pstmt.setBoolean(4, promotionalInfo);
					pstmt.setString(5, account);

					int rows = pstmt.executeUpdate();
					if (rows > 0) {
						// 同步 Session 中的 member
						member.setName(name);
						member.setPhone(phone);
						member.setBirthday(birthday);
						member.setPromotionalInfo(promotionalInfo);
						session.setAttribute("member", member);

						response.sendRedirect("member?update=success");
					} else {
						response.sendRedirect("member?update=fail");
					}
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			response.sendRedirect("member?update=error");
		}
	}
}
