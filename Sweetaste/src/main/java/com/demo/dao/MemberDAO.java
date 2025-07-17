package com.demo.dao;

import java.sql.*;

import com.demo.domain.Member;
import com.demo.util.DBUtil;

public class MemberDAO {

	public Member findByAccount(String account) {
		Member member = null;
		
		System.out.println("[MemberDAO] 查詢帳號：" + account);

		String sql = "SELECT * FROM members WHERE account = ?";

		try (Connection conn = DBUtil.getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, account);
			ResultSet rs = stmt.executeQuery();

			if (rs.next()) {
				member = new Member();
				member.setId(rs.getInt("id"));
				member.setAccount(rs.getString("account"));
				member.setPassword(rs.getString("password"));
				member.setName(rs.getString("name"));
				member.setPhone(rs.getString("phone"));
				member.setBirthday(rs.getDate("birthday"));
				member.setPromotionalInfo(rs.getBoolean("promotional_info"));
				member.setCreatedAt(rs.getTimestamp("created_at"));
			} else {
				System.out.println("[MemberDAO] 找不到帳號密碼符合的使用者");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return member;
	}
}
