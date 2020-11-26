<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="
		http://maven.apache.org/POM/4.0.0
		http://maven.apache.org/maven-v4_0_0.xsd">
	
	<modelVersion>4.0.0</modelVersion>  
    <groupId>${pro.package}</groupId>  
    <artifactId>${pro.project_name?lower_case}</artifactId>  
	<packaging>pom</packaging> 
    <version>${pro.version}</version>
    <modules>
        <module>${pro.project_name?lower_case}-jar</module>
        <module>${pro.project_name?lower_case}-web</module>
        <module>${pro.project_name?lower_case}-war</module>
    </modules>
</project> 
