package com.demo.controller;

import com.demo.domain.Order;
import com.demo.domain.OrderItem;
import com.google.gson.Gson;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.WebServlet;

import java.io.*;
import java.sql.*;
import java.util.List;

public class SubmitOrderServlet extends HttpServlet {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/sweetaste?serverTimezone=Asia/Taipei";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "12345678";

    private Gson gson;

    @Override
    public void init() throws ServletException {
        super.init();
        gson = new Gson();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("JDBC Driver 載入成功");
        } catch (ClassNotFoundException e) {
            throw new ServletException("無法載入 JDBC Driver", e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json;charset=UTF-8");

        Connection conn = null;

        try (BufferedReader reader = request.getReader()) {

            Order order = gson.fromJson(reader, Order.class);

            System.out.println("收到訂單資料:");
            System.out.println(gson.toJson(order));

            conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            conn.setAutoCommit(false);

            // 1. 插入 orders 主表
            String insertOrderSQL = "INSERT INTO orders (member_id, order_date, subtotal, freight, total, address, invoice_type, invoice_info, recipient_name, recipient_phone) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)";
            try (PreparedStatement stmt = conn.prepareStatement(insertOrderSQL, Statement.RETURN_GENERATED_KEYS)) {
                stmt.setInt(1, order.getMemberId());
                stmt.setInt(2, order.getSubtotal());
                stmt.setInt(3, order.getFreight());
                stmt.setInt(4, order.getTotal());
                stmt.setString(5, order.getAddress());
                stmt.setString(6, order.getInvoiceType());
                stmt.setString(7, order.getInvoiceInfo());
                stmt.setString(8, order.getRecipientName());
                stmt.setString(9, order.getRecipientPhone());

                int affectedRows = stmt.executeUpdate();
                if (affectedRows == 0) {
                    throw new SQLException("建立訂單失敗，沒有影響任何資料行");
                }

                try (ResultSet rs = stmt.getGeneratedKeys()) {
                    if (rs.next()) {
                        int orderId = rs.getInt(1);

                        // 2. 插入 order_items 明細
                        String insertItemSQL = "INSERT INTO order_items (order_id, product_name, price, quantity, subtotal) VALUES (?, ?, ?, ?, ?)";
                        try (PreparedStatement itemStmt = conn.prepareStatement(insertItemSQL)) {
                            List<OrderItem> items = order.getItems();
                            for (OrderItem item : items) {
                                itemStmt.setInt(1, orderId);
                                itemStmt.setString(2, item.getProductName());
                                itemStmt.setInt(3, item.getPrice());
                                itemStmt.setInt(4, item.getQuantity());

                                int itemSubtotal = item.getSubtotal() > 0 ? item.getSubtotal() : (item.getPrice() * item.getQuantity());
                                itemStmt.setInt(5, itemSubtotal);

                                itemStmt.addBatch();
                            }
                            itemStmt.executeBatch();
                        }
                    } else {
                        throw new SQLException("取得新增訂單的 ID 失敗");
                    }
                }
            }

            conn.commit();

            response.getWriter().write("{\"status\":\"success\"}");

        } catch (Exception e) {
            e.printStackTrace();

            if (conn != null) {
                try {
                    conn.rollback();
                } catch (SQLException rollbackEx) {
                    rollbackEx.printStackTrace();
                }
            }

            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write(gson.toJson(
                java.util.Map.of("status", "error", "message", e.getMessage())
            ));
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException closeEx) {
                    closeEx.printStackTrace();
                }
            }
        }
    }
}



