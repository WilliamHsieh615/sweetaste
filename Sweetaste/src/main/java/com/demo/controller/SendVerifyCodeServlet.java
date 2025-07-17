// Gmail SMTP 版本
package com.demo.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Properties;
import java.util.Random;

import jakarta.mail.*;
import jakarta.mail.internet.*;

public class SendVerifyCodeServlet extends HttpServlet {

	private static final String SMTP_HOST = "smtp.gmail.com";
	private static final int SMTP_PORT = 587;
	private static final String USERNAME = "best5946@gmail.com";
	private static final String APP_PASSWORD = "mwkr utzq pzul pjvm";

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json;charset=UTF-8");

		String account = request.getParameter("account");

		try (PrintWriter out = response.getWriter()) {

			if (account == null || account.trim().isEmpty()) {
				out.print("{\"success\":false, \"message\":\"請輸入 Email\"}");
				return;
			}

			// 產生四位數驗證碼
			String code = String.format("%04d", new Random().nextInt(10000));

			HttpSession session = request.getSession();
			session.setAttribute("verifyCode", code);
			session.setAttribute("verifyEmail", account);

			// 設定郵件屬性
			Properties props = new Properties();
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.smtp.host", SMTP_HOST);
			props.put("mail.smtp.port", String.valueOf(SMTP_PORT));

			Session mailSession = Session.getInstance(props, new Authenticator() {
				@Override
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(USERNAME, APP_PASSWORD);
				}
			});

			Message message = new MimeMessage(mailSession);
			message.setFrom(new InternetAddress(USERNAME));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(account));
			message.setSubject("【Sweetaste】您的驗證碼");
			message.setHeader("Content-Type", "text/plain; charset=UTF-8");
			message.setText("您好，您的驗證碼為：" + code + "，請於三分鐘內輸入完成驗證。");

			Transport.send(message);

			out.print("{\"success\":true}");

		} catch (MessagingException e) {
			e.printStackTrace();
			response.getWriter().print("{\"success\":false, \"message\":\"寄送失敗，請稍後再試\"}");
		}
	}
}

// mailtrap 版本
//package com.demo.controller;
//
//import jakarta.servlet.ServletException;
//import jakarta.servlet.annotation.WebServlet;
//import jakarta.servlet.http.*;
//import java.io.IOException;
//import java.io.PrintWriter;
//import java.util.Properties;
//import java.util.Random;
//
//import jakarta.mail.*;
//import jakarta.mail.internet.*;
//
//public class SendVerifyCodeServlet extends HttpServlet {
//
//    private static final String SMTP_HOST = "sandbox.smtp.mailtrap.io";
//    private static final int SMTP_PORT = 587;
//    private static final String USERNAME = "21e150c307d656"; // Mailtrap 帳號
//    private static final String PASSWORD = "72dbb8a817361a"; // Mailtrap 密碼
//
//    
//    @Override
//    protected void doPost(HttpServletRequest request, HttpServletResponse response)
//            throws ServletException, IOException {
//
//        // 設定回傳 JSON 格式
//        response.setContentType("application/json;charset=UTF-8");
//        PrintWriter out = response.getWriter();
//
//        String account = request.getParameter("account");
//
//        if (account == null || account.isEmpty()) {
//            out.print("{\"success\":false, \"message\":\"請輸入 Email\"}");
//            return;
//        }
//
//        // 產生四位數驗證碼
//        String code = String.format("%04d", new Random().nextInt(10000));
//
//        HttpSession session = request.getSession();
//        session.setAttribute("verifyCode", code);
//        session.setAttribute("verifyEmail", account);
//
//        // 寄出 Email
//        Properties props = new Properties();
//        props.put("mail.smtp.auth", "true");
//        props.put("mail.smtp.starttls.enable", "true");
//        props.put("mail.smtp.host", SMTP_HOST);
//        props.put("mail.smtp.port", SMTP_PORT);
//
//        jakarta.mail.Session mailSession = jakarta.mail.Session.getInstance(props, new Authenticator() {
//            protected PasswordAuthentication getPasswordAuthentication() {
//                return new PasswordAuthentication(USERNAME, PASSWORD);
//            }
//        });
//
//        try {
//            Message message = new MimeMessage(mailSession);
//            message.setFrom(new InternetAddress("verify@sweetast.com"));
//            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(account));
//            message.setSubject("【Sweetaste】您的驗證碼");
//            message.setContent("您好，您的驗證碼為：" + code + "，請於三分鐘內輸入完成驗證。", "text/plain; charset=UTF-8");
//
//            Transport.send(message);
//
//            // 回傳 JSON 格式
//            out.print("{\"success\":true}");
//        } catch (MessagingException e) {
//            e.printStackTrace();
//            out.print("{\"success\":false, \"message\":\"寄送失敗，請稍後再試\"}");
//        }
//    }
//}
