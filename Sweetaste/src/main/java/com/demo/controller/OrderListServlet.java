package com.demo.controller;

import com.demo.domain.Order;
import com.demo.domain.OrderItem;
import com.google.gson.Gson;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.WebServlet;

import java.io.*;
import java.sql.*;
import java.util.*;

public class OrderListServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        response.setContentType("application/json;charset=UTF-8");
        int memberId = Integer.parseInt(request.getParameter("memberId"));

        List<Order> orderList = new ArrayList<>();

        try (
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/sweetast?serverTimezone=Asia/Taipei", "root", "12345678");
        ) {
            // 查詢訂單主表
        	String orderSQL = """
        		    SELECT o.*, m.name AS member_name, m.phone, o.shipping_status
        		    FROM orders o
        		    JOIN members m ON o.member_id = m.id
        		    WHERE o.member_id = ?
        		    ORDER BY o.order_date DESC
        		""";
            PreparedStatement stmt = conn.prepareStatement(orderSQL);
            stmt.setInt(1, memberId);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Order order = new Order();
                int orderId = rs.getInt("id");
                order.setId(orderId);

                Timestamp ts = rs.getTimestamp("order_date");
                String formattedDate = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(ts);
                order.setOrderDate(formattedDate);

                order.setAddress(rs.getString("address"));
                order.setInvoiceType(rs.getString("invoice_type"));
                order.setInvoiceInfo(rs.getString("invoice_info"));
                order.setRecipientName(rs.getString("recipient_name"));
                order.setRecipientPhone(rs.getString("recipient_phone"));
                order.setShippingStatus(rs.getString("shipping_status"));
                order.setSubtotal(rs.getInt("subtotal"));
                order.setFreight(rs.getInt("freight"));
                order.setTotal(rs.getInt("total"));

                // 查詢對應的訂單明細
                String itemSQL = "SELECT * FROM order_items WHERE order_id = ?";
                PreparedStatement itemStmt = conn.prepareStatement(itemSQL);
                itemStmt.setInt(1, orderId);
                ResultSet itemRs = itemStmt.executeQuery();

                List<OrderItem> items = new ArrayList<>();
                while (itemRs.next()) {
                    OrderItem item = new OrderItem();
                    item.setProductName(itemRs.getString("product_name"));
                    item.setPrice(itemRs.getInt("price"));
                    item.setQuantity(itemRs.getInt("quantity"));
                    items.add(item);
                }
                order.setItems(items);
                orderList.add(order);
            }

            String json = new Gson().toJson(orderList);
            response.getWriter().write(json);

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\"}");
        }
    }
}

