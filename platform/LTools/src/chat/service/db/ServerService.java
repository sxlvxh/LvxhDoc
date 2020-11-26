package chat.service.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import chat.bean.BaseResult;
import chat.bean.ServerHolder;
import chat.service.SqlService;

public class ServerService extends SqlService {

	private static final Logger LOG = Logger.getLogger(ServerService.class);

	public List<ServerHolder> getList(ServerHolder bean) {
		Connection conn = null;
		Statement stmt = null;
		List<ServerHolder> list = new ArrayList<ServerHolder>();
		try {
			conn = getConn();
			stmt = conn.createStatement();
			String sql = "SELECT * FROM t_server where 1 = 1 ";
			if (!StringUtils.isEmpty(bean.getName())) {
				sql = sql + " and name like '%" + bean.getName() + "%'";
			}
			if (!StringUtils.isEmpty(bean.getIp())) {
				sql = sql + " and name like '%" + bean.getIp() + "%'";
			}
			LOG.debug(" query sql : " + sql);
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				ServerHolder holder = new ServerHolder();
				holder.setId(rs.getString("id"));
				holder.setIp(rs.getString("ip"));
				holder.setName(rs.getString("name"));
				holder.setPwd(rs.getString("pwd"));
				holder.setType(rs.getString("type"));
				holder.setUser(rs.getString("user"));
				holder.setGateway(rs.getString("gateway"));
				holder.setMac(rs.getString("mac"));
				holder.setMask(rs.getString("mask"));
				list.add(holder);
			}

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		} finally {
			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(), e);
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(), e);
				}
			}
		}
		return list;
	}

	public BaseResult insert(ServerHolder holder) {
		Connection conn = null;
		PreparedStatement stmt = null;
		BaseResult result = new BaseResult();
		try {
			conn = getConn();
			stmt = conn.prepareStatement("INSERT INTO t_server VALUES(?,?,?,?,?,?,?,?,?)");
			stmt.setString(1, holder.getId());
			stmt.setString(2, holder.getName());
			stmt.setString(3, holder.getIp());
			stmt.setString(4, holder.getType());
			stmt.setString(5, holder.getUser());
			stmt.setString(6, holder.getPwd());
			stmt.setString(7, holder.getMac());
			stmt.setString(8, holder.getMask());
			stmt.setString(9, holder.getGateway());
			stmt.execute();
			result.setCode(0);
			result.setDesc("操作成功！");

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			result.setCode(1);
			result.setDesc("操作失败！");
		} finally {
			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(), e);
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(), e);
				}
			}
		}
		return result;
	}

	public BaseResult modify(ServerHolder holder) {
		Connection conn = null;
		PreparedStatement stmt = null;
		BaseResult result = new BaseResult();
		try {
			conn = getConn();
			String set = " id = '" + holder.getId() + "'";
			if (!StringUtils.isEmpty(holder.getName())) {
				set = set + ", name = '" + holder.getName() + "'";
			}
			if (!StringUtils.isEmpty(holder.getIp())) {
				set = set + ", ip = '" + holder.getIp() + "'";
			}
			if (!StringUtils.isEmpty(holder.getPwd())) {
				set = set + ", pwd = '" + holder.getPwd() + "'";
			}
			if (!StringUtils.isEmpty(holder.getType())) {
				set = set + ", type = '" + holder.getType() + "'";
			}
			if (!StringUtils.isEmpty(holder.getUser())) {
				set = set + ", user = '" + holder.getUser() + "'";
			}
			if (!StringUtils.isEmpty(holder.getMac())) {
				set = set + ", mac = '" + holder.getMac() + "'";
			}
			if (!StringUtils.isEmpty(holder.getMask())) {
				set = set + ", mask = '" + holder.getMask() + "'";
			}
			if (!StringUtils.isEmpty(holder.getGateway())) {
				set = set + ", gateway = '" + holder.getGateway() + "'";
			}
			String sql = "update t_server set " + set + " where t_server.id = '" + holder.getId() + "'";
			LOG.debug(sql);
			stmt = conn.prepareStatement(sql);
			if (stmt.execute()) {
				result.setCode(0);
				result.setDesc("操作成功！");
			} else {
				result.setCode(1);
				result.setDesc("操作失败！");
			}

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			result.setCode(1);
			result.setDesc("操作失败！");
		} finally {
			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(), e);
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(), e);
				}
			}
		}
		return result;
	}

	public BaseResult delete(ServerHolder bean) {

		Connection conn = null;
		PreparedStatement stmt = null;
		BaseResult result = new BaseResult();
		try {
			conn = getConn();
			stmt = conn.prepareStatement("delete from t_server where id = ?");
			stmt.setString(1, bean.getId());

			if (stmt.execute()) {
				result.setCode(0);
				result.setDesc("操作成功！");
			} else {
				result.setCode(1);
				result.setDesc("操作失败！");
			}

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			result.setCode(1);
			result.setDesc("操作失败！");
		} finally {
			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(), e);
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(), e);
				}
			}
		}
		return result;

	}
}
