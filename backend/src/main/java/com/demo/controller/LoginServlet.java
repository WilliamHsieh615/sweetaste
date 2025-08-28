package com.demo.controller;

import com.demo.dao.MemberDAO;
import com.demo.domain.Member;
import com.demo.util.PasswordUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.net.URLEncoder;

public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private MemberDAO memberDAO;

	@Override
	public void init() throws ServletException {
		memberDAO = new MemberDAO();
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");

		String account = request.getParameter("account");
		String password = request.getParameter("password");

		if (account != null) account = account.trim();
		if (password != null) password = password.trim();

		System.out.println("[LoginServlet] 嘗試登入帳號: " + account);

		try {
			Member member = memberDAO.findByAccount(account);

			if (member != null && PasswordUtil.checkPassword(password, member.getPassword())) {
				HttpSession session = request.getSession();
				session.setAttribute("account", member.getAccount()); 
				session.setAttribute("member", member);
				System.out.println("[LoginServlet] 登入成功，轉跳 member.jsp");
				response.sendRedirect("member.jsp?justLoggedIn=true");
			} else {
				System.out.println("[LoginServlet] 登入失敗：帳號或密碼錯誤");
				String encodedAccount = URLEncoder.encode(account, "UTF-8");
				response.sendRedirect("login.jsp?error=1&account=" + encodedAccount);
			}

		} catch (Exception e) {
			e.printStackTrace();
			response.sendRedirect("login.jsp?error=2");
		}
	}
}
