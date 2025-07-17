package com.demo.util;

import java.sql.Connection;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class DBUtil {

	public static Connection getConnection() throws Exception {
		try {
			Context ctx = new InitialContext();
			DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/sweetast");
			return ds.getConnection();
		} catch (Exception e) {
			System.err.println("[DBUtil] 無法取得資料庫連線：" + e.getMessage());
			throw e;
		}
	}
}
