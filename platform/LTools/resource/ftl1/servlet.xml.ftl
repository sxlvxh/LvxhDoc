<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	 xmlns:aop="http://www.springframework.org/schema/aop"
	   xmlns:tx="http://www.springframework.org/schema/tx"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:mvc="http://www.springframework.org/schema/mvc"
	   xmlns:cache="http://www.springframework.org/schema/cache"
	   xmlns:p="http://www.springframework.org/schema/p"
	xsi:schemaLocation="http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd
		http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
     http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-3.0.xsd
     http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-3.0.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.0.xsd
		 http://www.springframework.org/schema/cache http://www.springframework.org/schema/cache/spring-cache-3.1.xsd"
		  default-autowire="byName">
  
     <!-- 扫描classpath的包下的所有类，该包路径下的类可以不需要配置bean了 -->
	<context:component-scan base-package="org.springframework.samples.mvc.basic" />
	
	<context:component-scan base-package="com.huaiye" use-default-filters="false" >
		<context:include-filter type="annotation" expression="org.springframework.stereotype.Controller" />
		<context:include-filter type="annotation" expression="org.springframework.stereotype.Service" />
		<context:include-filter type="annotation" expression="org.springframework.stereotype.Repository" />
		<context:include-filter type="annotation" expression="org.springframework.stereotype.Component" />
   </context:component-scan>
	<aop:aspectj-autoproxy proxy-target-class="true"/>
	<mvc:annotation-driven />
	
	<bean
		class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<property name="prefix" value="/" />
		<property name="suffix" value=".jsp" />
	</bean>
	<bean id="multipartResolver"
		class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
		<property name="defaultEncoding" value="utf-8" />
		<property name="maxUploadSize" value="10485760000" />
		<property name="maxInMemorySize" value="8" />
	</bean>
	<mvc:interceptors>  
       
            <bean class="com.huaiye.plugin.conf.aspect.MyInterceptor"></bean>  
       
    </mvc:interceptors>
</beans>