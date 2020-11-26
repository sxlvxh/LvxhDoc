package com.huaiye.plugin.plat.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Properties;

import org.apache.log4j.Logger;

import chat.bean.ProjectModelHolder;
import chat.service.db.ModelSqlService;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.Version;

public class CodeGenModel {
	
	private final static Logger LOG = Logger.getLogger(CodeGenModel.class);
	
	private String codeFolder;
	private String pname;
	private String fixUrl;
	private String baseUrl;
	//private String webUrl;
	private String serviceUrl;
	private String serviceImplUrl;
	private String warUrl;
	private Configuration cfg;
	private String packageUrl;
	private DataBase base;
	public static void main(String[] args) {
		new CodeGenModel().executeFtl() ;
		
	}
	
	public void deleteTable()
	{
		base.getTable();
		for(Table t : base.getTable())
		{
			System.out.println(t.getName());
		}
	}
	
	public CodeGenModel() {
		try {
			File conf = new File("resource/ftl/deploy.properties");
			FileInputStream fis = new FileInputStream(conf);
			Properties pro = new Properties();
			pro.load(fis);
            List<ModelSqlHolder> list = new ArrayList<ModelSqlHolder>();
           /* ModelSqlHolder hh = new ModelSqlHolder();
            hh.setClassName("TestTable");
            hh.setComment("");
            hh.setName("test_table");
            hh.setSql("select * from (select * from t_server s {0} ) ss where ss.isdel = 0");
            hh.setParams((" where <if test=\"id != null and id != ''\">\r\n" + 
            		"				 s.`id` = #{id}\r\n" + 
            		"			</if>").split("$"));
            list.add(hh);*/
            
            sql(list);
            
			base = MysqlUtil.getData(pro,list);
			base.setPro(pro);
			cfg = new Configuration(new Version("2.3.0"));
			cfg.setDefaultEncoding("UTF-8");
			cfg.setDirectoryForTemplateLoading(new File("resource/ftl"));
			codeFolder = pro.getProperty("code_folder");
			pname = pro.getProperty("project_name");
			fixUrl = "";
			baseUrl = codeFolder + "/" + pname+ "/";
			//webUrl = baseUrl + pname + "-web/";
			serviceUrl = baseUrl + pname + "Interface";
			serviceImplUrl = baseUrl + pname + "Service";
			warUrl = baseUrl + pname + "Web";
			mkdir(serviceUrl);
			mkdir(warUrl);
			/*mkdir(warUrl);*/
			mkdir(warUrl + "/src/main/webapp/WEB-INF");
			mkdir(warUrl + "/src/main/webapp/WEB-INF");
			mkdir(warUrl + "/sql");
			mkdir(warUrl + "/doc");
			 
			packageUrl = LUtil.getPackageToDir(base.getPro().getProperty("package"))+ "/";
			
			base.setPackageUrl(base.getPro().getProperty("package"));
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		}
	}
	
	public CodeGenModel(ProjectModelHolder holder) {
		try {
			Properties pro = new Properties();
			ModelSqlHolder _sql = new ModelSqlHolder();
			_sql.setModelID(holder.getModelID());
			ModelSqlService sqlService = new ModelSqlService();
            List<ModelSqlHolder> list = sqlService.getList(_sql);
            
            pro.setProperty("code_folder", holder.getCodeFolder());
            pro.setProperty("author", holder.getAuthor());
            pro.setProperty("version", holder.getVersion());
            pro.setProperty("project_name", holder.getModelID());
            pro.setProperty("db.driver", "com.mysql.jdbc.Driver");
            pro.setProperty("db.url", "mysql://{0}/{1}");
            pro.setProperty("db.host", holder.getIp());
            pro.setProperty("db.schema", holder.getDbSchema());
            pro.setProperty("db.user", holder.getUser());
            pro.setProperty("db.password", holder.getPwd());
            pro.setProperty("package", holder.getPackages());
            pro.setProperty("url_prefix", holder.getUrlPrefix());
            
           // sql(list);
            
            
            
			base = MysqlUtil.getData(holder,list);
			base.setPro(pro);
			cfg = new Configuration(new Version("2.3.0"));
			cfg.setDefaultEncoding("UTF-8");
			cfg.setDirectoryForTemplateLoading(new File("resource/ftl"));
			codeFolder = pro.getProperty("code_folder");
			pname = pro.getProperty("project_name");
			fixUrl = holder.getUrlPrefix();
			baseUrl = codeFolder + "/" + pname+ "/";
			//webUrl = baseUrl + pname + "-web/";
			serviceUrl = baseUrl + pname + "Service";
			serviceImplUrl = baseUrl + pname + "ServiceImpl";
			warUrl = baseUrl + pname + "Web";
			mkdir(serviceUrl);
			mkdir(warUrl);
			/*mkdir(warUrl);*/
			mkdir(warUrl + "/src/main/webapp/WEB-INF");
			mkdir(warUrl + "/src/main/webapp/WEB-INF");
			mkdir(warUrl + "/sql");
			mkdir(warUrl + "/doc");
			 
			packageUrl = LUtil.getPackageToDir(base.getPro().getProperty("package"))+ "/";
			
			base.setPackageUrl(base.getPro().getProperty("package"));
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		}
	}
	
	public void sql(List<ModelSqlHolder> list) {
		ModelSqlHolder fourEventList = new ModelSqlHolder();
		fourEventList.setClassName("FourEventList");
		fourEventList.setComment("自和子企业道路");
		fourEventList.setName("four_event_list");
		fourEventList.setSql(SqlData.fourEventList);
		fourEventList.setParams(null);
        list.add(fourEventList);
	}

	@SuppressWarnings("unused")
	public void executeFtl() {

		try {
			Template holderTemplate = cfg.getTemplate("holder.java.ftl");
			Template serviceTemplate = cfg.getTemplate("service.java.ftl");
			Template serviceImplTemplate = cfg.getTemplate("serviceImpl.java.ftl");
			Template serviceXmlTemplate = cfg.getTemplate("serviceImpl.xml.ftl");
			Template controllerXmlTemplate = cfg.getTemplate("controller.xml.ftl");
			
			Template controllerTemplate = cfg.getTemplate("controller.java.ftl");
			Template mapperJavaTemplate = cfg.getTemplate("mapper.java.ftl");
			Template mapperXmlTemplate = cfg.getTemplate("mapper.xml.ftl");
			Template mapperSqlXmlTemplate = cfg.getTemplate("sql.mapper.xml.ftl");
			Template htmlTemplate = cfg.getTemplate("html.xml.ftl");
			Template ppomTemplate = cfg.getTemplate("parent.pom.xml.ftl");
			Template projectTemplate = cfg.getTemplate("project.ftl");
			Template jarTemplate = cfg.getTemplate("jarproject.ftl");
			Template classPathTemplate = cfg.getTemplate("classpath.ftl");
			Template pomTemplate = cfg.getTemplate("pom.xml.ftl");
			
			Template webTemplate = cfg.getTemplate("webproject.ftl");
			Template webpomTemplate = cfg.getTemplate("webpom.xml.ftl");
			Template webxmlTemplate = cfg.getTemplate("web.xml.ftl");
			
			Template warTemplate = cfg.getTemplate("warproject.ftl");
			Template warpomTemplate = cfg.getTemplate("warpom.xml.ftl");
			Template warxmlTemplate = cfg.getTemplate("war.xml.ftl");
			Template servletTemplate = cfg.getTemplate("servlet.xml.ftl");
			Template sitemeshTemplate = cfg.getTemplate("sitemesh3.xml.ftl");
			Template sqlTemplate = cfg.getTemplate("att.sql.ftl");
			Template docTemplate = cfg.getTemplate("document_html.ftl");
			Template docIndexTemplate = cfg.getTemplate("doc_html.ftl");
			
			/*writeFile(base, ppomTemplate, baseUrl + "/pom.xml");
			writeFile(base, projectTemplate, baseUrl + "/.project");
			writeFile(base, jarTemplate, jarUrl + "/.project");
			writeFile(base, classPathTemplate, jarUrl+"/.classpath");
			writeFile(base, pomTemplate, jarUrl+"/pom.xml");
			writeFile(base, webTemplate, webUrl + "/.project");
			writeFile(base, classPathTemplate, webUrl + "/.classpath");
			writeFile(base, webpomTemplate, webUrl + "/pom.xml");
			writeFile(base, webxmlTemplate, webUrl + "/src/main/webapp/WEB-INF"+ "/web.xml");
			
			writeFile(base, warTemplate, warUrl + "/.project");
			writeFile(base, classPathTemplate, warUrl + "/.classpath");
			writeFile(base, warpomTemplate, warUrl + "/pom.xml");
			writeFile(base, warxmlTemplate, warUrl + "/src/main/webapp/WEB-INF"+ "/web.xml");
			writeFile(base, servletTemplate, warUrl + "/src/main/webapp/WEB-INF/"+ pname + "-servlet.xml");
			writeFile(base, sitemeshTemplate, warUrl + "/src/main/webapp/WEB-INF"+ "/sitemesh3.xml.xml");
			writeFile(base, sqlTemplate, webUrl + "/sql"+ "/attr.sql");
			writeFile(base, docIndexTemplate, webUrl + "/doc"+ "/index.html");*/

			
			for (Table table : base.getTable()) {
				try {
					LOG.debug(table.getClassName() + " ==" + table.getName());
					table.setPro(base.getPro());
					String filePath = serviceUrl + "/src/main/java/"+ packageUrl + tableNameToJavaNameToLowerCase(table);
                    String serviceImplUrlFile = serviceImplUrl + "/src/main/java/"+ packageUrl + tableNameToJavaNameToLowerCase(table);
                    String warUrlFile = warUrl + "/src/main/java/"+ packageUrl + tableNameToJavaNameToLowerCase(table);
                    
					writeFile(table, holderTemplate,getFilePath(table, filePath, "Holder"));
					writeFile(table, serviceTemplate,getFilePath(table, filePath, "Service"));
					writeFile(table, controllerTemplate,getFilePath(table, warUrlFile, "Controller"));
					writeFile(table, docTemplate,getDocFilePath(table,  warUrl + "/doc"));
					writeFile(table, mapperJavaTemplate,getFileMapperPath(table, serviceImplUrlFile));
					writeFile(table, serviceImplTemplate,getFilePath(table, serviceImplUrlFile, "ServiceImpl"));
					if("sql".equals(table.getSqlType()))
					{
						writeFile(table, mapperSqlXmlTemplate,	getFileMapperXmlPath(table, serviceImplUrlFile));
					}
					else
					{
						writeFile(table, mapperXmlTemplate,	getFileMapperXmlPath(table, serviceImplUrlFile));
					}
					String webPath = warUrl	+ "/src/main/webapp/html/"+ tableNameToJavaNameToLowerCase(table);
					mkdir(warUrl	+ "/src/main/webapp/html/");
					writeFile(table, htmlTemplate, webPath+".jsp");
					writeFile(base, sqlTemplate, warUrl + "/sql"+ "/attr.sql");
				} catch (Exception e) {
					LOG.error(e.getMessage(),e);
				}
			}
			writeFile(base, serviceXmlTemplate, serviceImplUrl + "/serviceImpl.xml");
			writeFile(base, controllerXmlTemplate, warUrl + "/controller.xml");
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		} 
	}

	private String tableNameToJavaNameToLowerCase(Table table) {
		return LUtil.toJavaName(fixUrl + LUtil.toJavaName(table.getName())).toLowerCase(Locale.getDefault());
	}

	public  void writeFile(Object obj, Template st, String holder){
		FileOutputStream spw = null;
		Writer sout = null;
		try {
			LOG.debug(" === " + holder + "=====");
			spw = new FileOutputStream(new File(holder));
			sout = new OutputStreamWriter(spw,"UTF-8");
			st.process(obj, sout);
			sout.flush();
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
			
		} finally
		{
			if(sout != null)
			{
				try {
					sout.close();
				} catch (IOException e) {
					LOG.error(e.getMessage(),e);
				}
			}
			if(spw != null)
			{
				try {
					spw.close();
				} catch (IOException e) {
					LOG.error(e.getMessage(),e);
				}
			}
		}
	}

	public  String getFilePath(Table table,	String filePath, String name) {
		String str = filePath + "/" + name.toLowerCase(Locale.getDefault());
		return mkdir(str).getAbsolutePath() + "/" + fixUrl	+ LUtil.toJavaName(table.getName()) + name + ".java";
	}
	
	public  String getDocFilePath(Table table,	String filePath) {
		return mkdir(filePath).getAbsolutePath() + "/" + fixUrl	+ LUtil.toJavaName(table.getName())  + ".html";
	}

	public  File mkdir(String str) {
		File f = new File(str);
		if (!f.exists()) {
			f.mkdirs();
		}
		return f;
	}

	public  String getFileMapperPath(Table table,String filePath) {
		String str = filePath + "/holder";
		return mkdir(str).getAbsolutePath() + "/" + fixUrl	+ LUtil.toJavaName(table.getName()) + "Mapper.java";
	}
	public  String getFileMapperXmlPath(Table table,String filePath) {
		String str = filePath + "/holder";
		return mkdir(str) + "/" + fixUrl + LUtil.toJavaName(table.getName())+ "Mapper.xml";
	}
}