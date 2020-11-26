package chat.service.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.huaiye.plugin.plat.util.ModelSqlHolder;

import chat.bean.BaseResult;
import chat.service.SqlService;
import utils.PUtils;

public class ModelSqlService extends SqlService {

	private static final Logger LOG = Logger.getLogger(ModelSqlService.class);

	public List<ModelSqlHolder> getList(ModelSqlHolder bean) {
		Connection conn = null;
		Statement stmt = null;
		List<ModelSqlHolder> list = new ArrayList<ModelSqlHolder>();
		try {
			conn = getConn();
			stmt = conn.createStatement();
			String sql = "select t_model_sql.* from t_model_sql where 1=1 ";
			if (!StringUtils.isEmpty(bean.getModelID())) {
				sql = sql + " and t_model_sql.model_id = '" + bean.getModelID() + "'";
			}
            sql = sql + " order by create_time";
			LOG.debug(" query sql : " + sql);
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				ModelSqlHolder holder = new ModelSqlHolder();
				holder.setId(rs.getString("id"));
				holder.setName(rs.getString("name"));
				holder.setModelID(rs.getString("model_id"));
				holder.setClassName(rs.getString("class_name"));
				holder.setComment(rs.getString("comment"));
				holder.setSql(rs.getString("str_sql"));
				holder.setCreateTime(rs.getString("create_time"));
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

	public BaseResult insert(ModelSqlHolder holder) {
		Connection conn = null;
		PreparedStatement stmt = null;
		BaseResult result = new BaseResult();
		try {
			conn = getConn();
			stmt = conn.prepareStatement("INSERT INTO t_model_sql VALUES(?,?,?,?,?,?,?)");
			stmt.setString(1, holder.getId());
			stmt.setString(2, holder.getComment());
			stmt.setString(3, holder.getClassName());
			stmt.setString(4, holder.getName());
			stmt.setString(5, holder.getSql());
			stmt.setString(6, holder.getModelID());
			stmt.setString(7, PUtils.dateTimeToStr(new Date()));
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

	public BaseResult modify(ModelSqlHolder holder) {
		Connection conn = null;
		PreparedStatement stmt = null;
		BaseResult result = new BaseResult();
		try {
			conn = getConn();
			String set = " id = '" + holder.getId() + "'";
			if (!StringUtils.isEmpty(holder.getClassName())) {
				set = set + ", class_name = '" + holder.getClassName() + "'";
			}
			if (!StringUtils.isEmpty(holder.getComment())) {
				set = set + ", comment = '" + holder.getComment() + "'";
			}
			if (!StringUtils.isEmpty(holder.getModelID())) {
				set = set + ", model_id = '" + holder.getModelID() + "'";
			}
			if (!StringUtils.isEmpty(holder.getName())) {
				set = set + ", name = '" + holder.getName() + "'";
			}
			if (!StringUtils.isEmpty(holder.getSql())) {
				set = set + ", str_sql = \"" + holder.getSql() + "\"";
			}

			String sql = "update t_model_sql set " + set + " where t_model_sql.id = \"" + holder.getId() + "\"";
			LOG.debug(sql);
			stmt = conn.prepareStatement(sql);
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

	public BaseResult delete(ModelSqlHolder bean) {

		Connection conn = null;
		PreparedStatement stmt = null;
		BaseResult result = new BaseResult();
		try {
			conn = getConn();
			stmt = conn.prepareStatement("delete from t_model_sql where id = ?");
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
