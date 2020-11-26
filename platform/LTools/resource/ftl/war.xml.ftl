<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="http://java.sun.com/xml/ns/javaee" xmlns:web="http://java.sun.com/xml/ns/javaee"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
	id="WebApp_ID" version="2.5">
	<context-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>classpath:/application/context*.xml</param-value>
	</context-param>

	<context-param>
		<param-name>webAppRootKey</param-name>
		<param-value>${pro.project_name}.root</param-value>
	</context-param>

	<listener>
		<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	</listener>

	<servlet>
		<servlet-name>${pro.project_name}</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<load-on-startup>1</load-on-startup>
	</servlet>
	<servlet-mapping>
		<servlet-name>${pro.project_name}</servlet-name>
		<url-pattern>*.action</url-pattern>
	</servlet-mapping>

	<filter>
		<filter-name>encodingFilter</filter-name>
		<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
		<init-param>
			<param-name>encoding</param-name>
			<param-value>UTF-8</param-value>
		</init-param>
	</filter>
	<filter-mapping>
		<filter-name>encodingFilter</filter-name>
		<url-pattern>*.action</url-pattern>
	</filter-mapping>

	<filter>
		<filter-name>sitemesh</filter-name>
		<filter-class>org.sitemesh.config.ConfigurableSiteMeshFilter</filter-class>
	</filter>
	<filter-mapping>
		<filter-name>sitemesh</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>

	<filter>
		<filter-name>tokenFilter</filter-name>
		<filter-class>com.huaiye.business.filter.TokenFilter</filter-class>
		<init-param>
			<param-name>ignore-url</param-name>
			<param-value></param-value>
		</init-param>
	</filter>

	<filter-mapping>
		<filter-name>tokenFilter</filter-name>
		<url-pattern>*.action</url-pattern>
	</filter-mapping>

	<context-param>
		<param-name>log4jConfigLocation</param-name>
		<param-value>classpath:/config/log4j.properties</param-value>
	</context-param>

	<context-param>
		<param-name>log4jRefreshInterval</param-name>
		<param-value>3000</param-value>
	</context-param>
	<session-config>
		<session-timeout>120</session-timeout>
	</session-config>
	<listener>
		<listener-class>org.springframework.web.util.Log4jConfigListener</listener-class>
	</listener>
</web-app>
