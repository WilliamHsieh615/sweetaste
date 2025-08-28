package com.demo.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.*;

import java.io.IOException;

public class AuthFilter implements Filter {

	// 白名單路徑：登入、註冊、首頁、靜態資源
	private static final String[] WHITELIST = { "/login", "/login.jsp", "/register", "/register.jsp",
			"/SendVerifyCodeServlet", "/VerifyCodeServlet", "/logout", "/index.jsp", "/index.html", "/style.css",
			"/bundle.js", "/assets/", "/components/", "/images/", "/css/", "/js/" };

	private boolean isWhitelisted(String path) {
		for (String white : WHITELIST) {
			if (path.startsWith(white))
				return true;
		}
		return false;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;

		String path = req.getRequestURI().substring(req.getContextPath().length());
		HttpSession session = req.getSession(false);
		String account = (session != null) ? (String) session.getAttribute("account") : null;

		// 若登入或在白名單內，放行
		if (account != null || isWhitelisted(path)) {
			chain.doFilter(request, response);
		} else {
			// 未登入則導向 login.jsp
			res.sendRedirect(req.getContextPath() + "/login.jsp");
		}
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void destroy() {
	}
}
