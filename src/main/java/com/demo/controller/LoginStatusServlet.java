package com.demo.controller;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;

public class LoginStatusServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session = request.getSession(false);
		boolean isLogin = session != null && session.getAttribute("account") != null;

		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().write("{\"isLogin\": " + isLogin + "}");
	}
}
