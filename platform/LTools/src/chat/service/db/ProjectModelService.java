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
import chat.bean.ProjectModelHolder;
import chat.service.SqlService;

public class ProjectModelService extends SqlService {
	
	private static final Logger LOG = Logger.getLogger(ProjectModelService.class);
	
	public List<ProjectModelHolder> getList(ProjectModelHolder bean)
	{
		Connection conn = null;
		Statement stmt = null;
		List<ProjectModelHolder> list  = new ArrayList<ProjectModelHolder>();
		try {
			conn = getConn();
			stmt = conn.createStatement();
			String sql = "select t_project_model.* from t_project_model where 1=1 ";
			if(!StringUtils.isEmpty(bean.getModelID()))
			{
				sql = sql + " and t_project_model.model_id like '%"+bean.getModelID()+"%'";
			}
			if(!StringUtils.isEmpty(bean.getIp()))
			{
				sql = sql + " and t_server.ip like '%"+bean.getIp()+"%'";
			}
			LOG.debug( " query sql : " + sql);
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
            	ProjectModelHolder holder = new ProjectModelHolder();
            	holder.setId(rs.getString("id"));
            	holder.setIp(rs.getString("ip"));
            	holder.setPwd(rs.getString("pwd"));
            	holder.setUser(rs.getString("user"));
            	holder.setModelID(rs.getString("model_id"));
            	holder.setAuthor(rs.getString("author"));
            	holder.setCodeFolder(rs.getString("code_folder"));
            	holder.setDbSchema(rs.getString("db_schema"));
            	holder.setPackages(rs.getString("packages"));
            	holder.setUrlPrefix(rs.getString("url_prefix"));
            	holder.setVersion(rs.getString("version"));
            	list.add(holder);
            }
           
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}finally
		{
			if(stmt != null)
			{
				try {
					stmt.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(),e);
				}
			}
			if(conn != null)
			{
				try {
					conn.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(),e);
				}
			}
		}
		return list;
	}
	
	public List<ProjectModelHolder> getMobelList()
	{
		Connection conn = null;
		Statement stmt = null;
		List<ProjectModelHolder> list  = new ArrayList<ProjectModelHolder>();
		try {
			conn = getConn();
			stmt = conn.createStatement();
			String sql = "SELECT model_id FROM  t_project_model GROUP BY model_id";			
			LOG.debug( " query sql : " + sql);
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
            	ProjectModelHolder holder = new ProjectModelHolder();
            	holder.setModelID(rs.getString("model_id"));
            	list.add(holder);
            }
           
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}finally
		{
			if(stmt != null)
			{
				try {
					stmt.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(),e);
				}
			}
			if(conn != null)
			{
				try {
					conn.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(),e);
				}
			}
		}
		return list;
	}
	
	public BaseResult insert(ProjectModelHolder holder)
	{
		Connection conn = null;
		PreparedStatement stmt = null;
		BaseResult result = new BaseResult();
		try {
			conn = getConn();
			stmt = conn.prepareStatement("insert into `t_project_model` (`id`,`ip`, `model_id`, `code_folder`, `author`, `version`, `packages`, `url_prefix`, `db_schema`, `pwd`, `user`) values(?,?,?,?,?,?,?,?,?,?,?)");
			stmt.setString(1, holder.getId());
			stmt.setString(2, holder.getIp());
			stmt.setString(3, holder.getModelID());
			stmt.setString(4, holder.getCodeFolder());
			stmt.setString(5, holder.getAuthor());
			stmt.setString(6, holder.getVersion());
			stmt.setString(7, holder.getPackages());
			stmt.setString(8, holder.getUrlPrefix());
			stmt.setString(9, holder.getDbSchema());
			stmt.setString(10, holder.getPwd());
			stmt.setString(11, holder.getUser());
			
            stmt.execute();
        	result.setCode(0);
        	result.setDesc("操作成功！");
           
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			result.setCode(1);
        	result.setDesc(e.getMessage());
		}finally
		{
			if(stmt != null)
			{
				try {
					stmt.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(),e);
				}
			}
			if(conn != null)
			{
				try {
					conn.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(),e);
				}
			}
		}
		return result;
	}
	
	public BaseResult modify(ProjectModelHolder holder)
	{
		Connection conn = null;
		PreparedStatement stmt = null;
		BaseResult result = new BaseResult();
		try {
			conn = getConn();
			String set = " id = '" + holder.getId()+"'";
			if(!StringUtils.isEmpty(holder.getIp()))
			{
				set = set + ", ip = '"+holder.getIp()+"'";
			}
			if(!StringUtils.isEmpty(holder.getModelID()))
			{
				set = set + ", model_id = '"+holder.getModelID()+"'";
			}
			if(!StringUtils.isEmpty(holder.getUser()))
			{
				set = set + ", user = '"+holder.getUser()+"'";
			}
			if(!StringUtils.isEmpty(holder.getCodeFolder()))
			{
				set = set + ", code_folder = '"+holder.getCodeFolder()+"'";
			}
			if(!StringUtils.isEmpty(holder.getAuthor()))
			{
				set = set + ", author = '"+holder.getAuthor()+"'";
			}
			if(!StringUtils.isEmpty(holder.getVersion()))
			{
				set = set + ", version = '"+holder.getVersion()+"'";
			}
			if(!StringUtils.isEmpty(holder.getPackages()))
			{
				set = set + ", packages = '"+holder.getPackages()+"'";
			}
			if(!StringUtils.isEmpty(holder.getUrlPrefix()))
			{
				set = set + ", url_prefix = '"+holder.getUrlPrefix()+"'";
			}
			if(!StringUtils.isEmpty(holder.getPwd()))
			{
				set = set + ", pwd = '"+holder.getPwd()+"'";
			}	
			if(!StringUtils.isEmpty(holder.getDbSchema()))
			{
				set = set + ", db_schema = '"+holder.getDbSchema()+"'";
			}	
			
			String sql = "update t_project_model set " + set + " where t_project_model.id = '" + holder.getId()+"'";
			LOG.debug(sql);
			stmt = conn.prepareStatement(sql);
            if(stmt.execute())
            {
            	result.setCode(0);
            	result.setDesc("操作成功！");
            }
            else
            {
            	result.setCode(1);
            	result.setDesc("操作失败！");
            }
            
           
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			result.setCode(1);
        	result.setDesc("操作失败！");
		}finally
		{
			if(stmt != null)
			{
				try {
					stmt.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(),e);
				}
			}
			if(conn != null)
			{
				try {
					conn.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(),e);
				}
			}
		}
		return result;
	}
	
	public BaseResult delete(ProjectModelHolder bean) {

		Connection conn = null;
		PreparedStatement stmt = null;
		BaseResult result = new BaseResult();
		try {
			conn = getConn();
			stmt = conn.prepareStatement("delete from t_project_model where id = ?");
			stmt.setString(1, bean.getId());
			
            if(stmt.execute())
            {
            	result.setCode(0);
            	result.setDesc("操作成功！");
            }
            else
            {
            	result.setCode(1);
            	result.setDesc("操作失败！");
            }
            
           
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			result.setCode(1);
        	result.setDesc("操作失败！");
		}finally
		{
			if(stmt != null)
			{
				try {
					stmt.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(),e);
				}
			}
			if(conn != null)
			{
				try {
					conn.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(),e);
				}
			}
		}
		return result;
	
		
	}
}
