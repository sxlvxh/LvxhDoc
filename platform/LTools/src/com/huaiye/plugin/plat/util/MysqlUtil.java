package com.huaiye.plugin.plat.util;

/**
 * @author ：陶伟基 ，微博：http://weibo.com/taoandtao
 * @date ：2012/12/11
 * @place：广州大学华软软件学院
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;

import chat.Login;
import chat.bean.ProjectModelHolder;

public class MysqlUtil {
	private final static Logger LOG = Logger.getLogger(MysqlUtil.class);
	
	public static void main(String[] args) throws Exception {

	}

	public static DataBase  getData(Properties pro,List<ModelSqlHolder> lists){
		
		
		DataBase base = new DataBase();
		Connection conn = null;
		try {
		
		
		String url = "jdbc:mysql://"+pro.getProperty("db.host")+":3306/"+pro.getProperty("db.schema")+"?user="+pro.getProperty("db.user")+"&password="+pro.getProperty("db.password")+"&useUnicode=true&characterEncoding=UTF8";
		

			Class.forName("com.mysql.jdbc.Driver");// 动态加载mysql驱动
			LOG.debug("成功加载MySQL驱动程序");
			conn = DriverManager.getConnection(url);
			base.setName(pro.getProperty("db.schema"));
			List<Table> list = new ArrayList<Table>();
			base.setTable(list);
			PreparedStatement p = conn.prepareStatement("SHOW TABLE STATUS");
			ResultSet r = p.executeQuery();// executeUpdate语句会返回一个受影响的行数，如果返回-1就没有成功
			while (r.next()) {
                  Table table = new Table();
                  table.setName(r.getString("name"));
                  table.setComment(r.getString("comment"));
                  table.setClassName(LUtil.toJavaName(table.getName()));
                  if(table.getName().startsWith(pro.getProperty("project_name")))
                  {
                	  /*PreparedStatement pp = conn.prepareStatement("drop table " + table.getName());
          			  pp.execute();// executeUpdate语句会返回一个受影响的行数，如果返回-1就没有成功
*/                 
                	  list.add(table);                	  
                	  }else
                  {
                  }
			}
			for(Table table : list)
			{
				PreparedStatement stmt = conn.prepareStatement("SHOW FULL COLUMNS  FROM " + table.getName());
//				stmt.set(1, table.getName());
				ResultSet res = stmt.executeQuery();// executeUpdate语句会返回一个受影响的行数，如果返回-1就没有成功
				
				List<Field> fl = new ArrayList<Field>();
				table.setField(fl);
				while (res.next()) {
					Field field = new Field();
					field.setCollation(res.getString("collation"));
					field.setName(res.getString("field"));
					field.setType(res.getString("type"));
					field.setComment(res.getString("comment"));
					field.setJavaName(LUtil.toJavaName(field.getName()));
					field.setJavaType(LUtil.toJavaType(field.getType()));
					fl.add(field);
				}
			}
			
			procSql(conn, list,lists);
			
			//LOG.debug(json.toJson(base));
			//Gson json = new Gson();
			
					
		} catch (SQLException e) {
			LOG.error("MySQL操作错误",e);
		} catch (Exception e) {
			LOG.error("MySQL操作错误",e);
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				LOG.debug("MySQL操作错误");
			}
		}
		return base;
	}
public static DataBase  getData(ProjectModelHolder pro,List<ModelSqlHolder> lists){
		
		
		DataBase base = new DataBase();
		Connection conn = null;
		try {
		
		
		String url = "jdbc:mysql://"+pro.getIp()+":"+Login.CONF_PRO.getProperty("db.port")+"/"+pro.getDbSchema()+"?user="+pro.getUser()+"&password="+pro.getPwd()+"&useUnicode=true&characterEncoding=UTF8";
		

			Class.forName("com.mysql.jdbc.Driver");// 动态加载mysql驱动
			LOG.debug("成功加载MySQL驱动程序");
			conn = DriverManager.getConnection(url);
			base.setName(pro.getDbSchema());
			List<Table> list = new ArrayList<Table>();
			base.setTable(list);
			PreparedStatement p = conn.prepareStatement("SHOW TABLE STATUS");
			ResultSet r = p.executeQuery();// executeUpdate语句会返回一个受影响的行数，如果返回-1就没有成功
			while (r.next()) {
                  Table table = new Table();
                  table.setName(r.getString("name"));
                  table.setComment(r.getString("comment"));
                  table.setClassName(LUtil.toJavaName(table.getName()));
                  if(table.getName().startsWith(pro.getModelID()))
                  {
                	  list.add(table);                	  
                	  }else
                  {
                  }
			}
			for(Table table : list)
			{
				PreparedStatement stmt = conn.prepareStatement("SHOW FULL COLUMNS  FROM " + table.getName());
//				stmt.set(1, table.getName());
				ResultSet res = stmt.executeQuery();// executeUpdate语句会返回一个受影响的行数，如果返回-1就没有成功
				
				List<Field> fl = new ArrayList<Field>();
				table.setField(fl);
				while (res.next()) {
					Field field = new Field();
					field.setCollation(res.getString("collation"));
					field.setName(res.getString("field"));
					field.setType(res.getString("type"));
					field.setComment(res.getString("comment"));
					field.setJavaName(LUtil.toJavaName(field.getName()));
					field.setJavaType(LUtil.toJavaType(field.getType()));
					fl.add(field);
				}
			}
			
			procSql(conn, list,lists);
			
			//LOG.debug(json.toJson(base));
			
					
		} catch (SQLException e) {
			LOG.error("MySQL操作错误",e);
		} catch (Exception e) {
			LOG.error("MySQL操作错误",e);
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				LOG.debug("MySQL操作错误");
			}
		}
		return base;
	}

	private static void procSql(Connection conn, List<Table> list,List<ModelSqlHolder> lists)
			throws SQLException {
		if(lists != null && lists.size()>0)
		{
			for(ModelSqlHolder holder: lists)
			{
				String sql11=holder.getSql();
				String sql22=holder.getSql();
                if(holder.getParams() != null)
                {
                	int length = holder.getParams().length;
                	String sql2[] = new String[length];
                	String sql3[] = new String[length];
                	for(int i=0;i<holder.getParams().length;i++)
                	{
                		sql2[i] = "";
                		sql3[i] = "]]>"+holder.getParams()[i]+"<![CDATA[";
                	}
                	/*sql11 = MessageFormat.format(holder.getSql(), sql3);
                	sql22= MessageFormat.format(holder.getSql(), sql2);*/
                }
				Table table = new Table();
				table.setSql(sql11);
				table.setSqlType("sql");
				table.setName(holder.getName());
				table.setComment(holder.getComment());
				table.setClassName(holder.getClassName());
				list.add(table);
				System.out.println(sql22);
				PreparedStatement stmt = conn.prepareStatement(sql22);
				ResultSet res = stmt.executeQuery();// executeUpdate语句会返回一个受影响的行数，如果返回-1就没有成功
				ResultSetMetaData meta = res.getMetaData();
				int count = meta.getColumnCount();
				List<Field> fl = new ArrayList<Field>();
				table.setField(fl);
				if(count > 0)
				{
					for (int i = 1; i <= count; i++) {
						Field field = new Field();
						field.setCollation("");
						field.setName(meta.getColumnLabel(i).trim());
						field.setType(meta.getColumnTypeName(i));
						field.setComment("");
						field.setJavaName(LUtil.toJavaName(field.getName()));
						field.setJavaType(LUtil.toJavaType(field.getType()));
						fl.add(field);
					}
				}
			}
		}
	}

}