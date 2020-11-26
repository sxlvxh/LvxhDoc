package chat.service;

import java.sql.Connection;
import java.sql.DriverManager;

import org.apache.log4j.Logger;

import chat.Login;

public abstract class SqlService {

	private static final Logger LOG = Logger.getLogger(SqlService.class);

	public Connection getConn() {
		Connection conn = null;
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			conn = DriverManager.getConnection(
					"jdbc:mysql://" + Login.CONF_PRO.getProperty("db.host") + ":"+Login.CONF_PRO.getProperty("db.port")+"/"
							+ Login.CONF_PRO.getProperty("db.schema")+"?useUnicode=true&characterEncoding=utf8",
					Login.CONF_PRO.getProperty("db.user"), Login.CONF_PRO.getProperty("db.password"));
			LOG.debug(" connection successful! ");
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		return conn;
	}

}
