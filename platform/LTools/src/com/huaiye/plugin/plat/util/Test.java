package com.huaiye.plugin.plat.util;

import java.io.File;
import java.io.FileWriter;
import java.io.StringReader;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.Version;

public class Test {
	public static void main(String[] args) {
		String str = "11111111<br/><br><br/>e333";
		System.out.println(str.replaceAll("[<br/>]+\\s*[<br/>]+", "<br/>"));
	}
	@SuppressWarnings("unused")
	public static void main1(String[] args) {
		        try {
		        	
		        	Configuration cfg = new Configuration(new Version("1.0"));
					cfg.setDirectoryForTemplateLoading(new File("resource/ftl"));
					
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
					
					
					
		            // 创建插值的map
		            Map<String,Object> map = new HashMap<String,Object>();
		            map.put("user", "rr");
		            map.put("url", "http://www.baidu.com/");
		            map.put("name", "百度");

		            // 创建一个模板对象
		            Template t = new Template(null, new StringReader(
		                    "用户名：${user};URL：    ${url};姓名： 　${name}"), null);

		            // 执行插值，并输出到指定的输出流中
		            Writer writer = new FileWriter("e:/aa.html");
		            t.process(map, writer);
		            // t.process(map, new OutputStreamWriter(System.out));
		        } catch (Exception e) {
		            e.printStackTrace();
		        }
	}

}
