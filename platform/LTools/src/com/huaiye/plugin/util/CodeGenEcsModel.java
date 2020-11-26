package com.huaiye.plugin.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.List;
import java.util.Locale;
import java.util.Properties;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import com.huaiye.plugin.plat.util.DataBase;
import com.huaiye.plugin.plat.util.LUtil;
import com.huaiye.plugin.plat.util.ModelSqlHolder;
import com.huaiye.plugin.plat.util.MysqlUtil;
import com.huaiye.plugin.plat.util.Table;

import chat.bean.ProjectModelHolder;
import chat.service.db.ModelSqlService;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.Version;

public class CodeGenEcsModel {
	
	private final static Logger LOG = Logger.getLogger(CodeGenEcsModel.class);
	
	private String codeFolder;
	private String pname;
	private String fixUrl;
	private String baseUrl;
	private String webUrl;
	private String jarUrl;
	private String warUrl;
	private Configuration cfg;
	private DataBase base;
	private String packageUrl;
	public static void main(String[] args) {
		PropertyConfigurator.configure("resource/conf/log4j.properties ");
		CodeGenEcsModel code = new CodeGenEcsModel(null);
		code.executeFtl();
		
	}
	public CodeGenEcsModel(ProjectModelHolder model) {
		try {
			File conf = new File("resource/ftl1/deploy.properties");
			FileInputStream fis = new FileInputStream(conf);
			Properties pro = new Properties();
			pro.load(fis);
			pro.setProperty("code_folder",model.getCodeFolder());
			pro.setProperty("author",model.getAuthor());
			pro.setProperty("version",model.getVersion());
			pro.setProperty("project_name",model.getModelID());
			pro.setProperty("db.host",model.getIp());
			pro.setProperty("db.schema",model.getDbSchema());
			pro.setProperty("db.user",model.getUser());
			pro.setProperty("db.password",model.getPwd());
			pro.setProperty("package",model.getPackages());
			pro.setProperty("url_prefix",model.getUrlPrefix()==null ? "":model.getUrlPrefix());
			
			ModelSqlService service = new ModelSqlService();
			ModelSqlHolder sql = new ModelSqlHolder();
			sql.setModelID(model.getModelID());
			List<ModelSqlHolder> list = service.getList(sql);
			
			base = MysqlUtil.getData(pro,list);
			base.setPro(pro);
			cfg = new Configuration(new Version("1.0"));
			cfg.setDefaultEncoding("UTF-8");
			cfg.setDirectoryForTemplateLoading(new File("resource/ftl1"));
			codeFolder = base.getPro().getProperty("code_folder");
			pname = base.getPro().getProperty("project_name");
			
			fixUrl = StringUtils.isBlank(base.getPro().getProperty("url_prefix"))?"": LUtil.toJavaName(base.getPro().getProperty("url_prefix"));
			baseUrl = codeFolder + "/" + pname+ "/";
			webUrl = baseUrl + pname + "-web/";
			jarUrl = baseUrl + pname + "-jar";
			warUrl = baseUrl + pname + "-war";
			mkdir(jarUrl);
			mkdir(webUrl);
			mkdir(warUrl);
			mkdir(webUrl + "/src/main/webapp/WEB-INF");
			mkdir(warUrl + "/src/main/webapp/WEB-INF");
			mkdir(webUrl + "/sql");
			mkdir(webUrl + "/doc");
			 
			packageUrl = LUtil.getPackageToDir(base.getPro().getProperty("package"))+ "/";

		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		}
	}

	public void executeFtl() {

		try {
			Template holderTemplate = cfg.getTemplate("holder.java.ftl");
			Template serviceTemplate = cfg.getTemplate("service.java.ftl");
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
			
			writeFile(base, ppomTemplate, baseUrl + "/pom.xml");
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
			writeFile(base, docIndexTemplate, webUrl + "/doc"+ "/index.html");

			for (Table table : base.getTable()) {
				try {
					table.setPro(base.getPro());
					String filePath = jarUrl + "/src/main/java/"+ packageUrl + tableNameToJavaNameToLowerCase(table);

					writeFile(table, holderTemplate,getFilePath(table, filePath, "Holder"));
					writeFile(table, serviceTemplate,getFilePath(table, filePath, "Service"));
					writeFile(table, controllerTemplate,getFilePath(table, filePath, "Controller"));
					writeFile(table, docTemplate,getDocFilePath(table,  webUrl + "/doc"));
					writeFile(table, mapperJavaTemplate,getFileMapperPath(table, filePath));
					if("sql".equals(table.getSqlType()))
					{
						writeFile(table, mapperSqlXmlTemplate,	getFileMapperXmlPath(table, filePath));
					}
					else
					{
						writeFile(table, mapperXmlTemplate,	getFileMapperXmlPath(table, filePath));
					}
					String webPath = webUrl	+ "/src/main/webapp/html/"+ tableNameToJavaNameToLowerCase(table);
					mkdir(webPath);
					writeFile(table, htmlTemplate, webPath + "/index.jsp");
					
				} catch (Exception e) {
					LOG.error(e.getMessage(),e);
				}
			}
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