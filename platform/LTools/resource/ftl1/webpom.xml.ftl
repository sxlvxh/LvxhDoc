<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="
		http://maven.apache.org/POM/4.0.0
		http://maven.apache.org/maven-v4_0_0.xsd">
		
	<modelVersion>4.0.0</modelVersion>
	<groupId>${pro.package}</groupId>
	<artifactId>${pro.project_name?lower_case}-web</artifactId>
	<packaging>war</packaging>
	<name>${pro.project_name?lower_case}-web</name>
	<version>${pro.version}</version>
	
	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
	</properties>
	
	<dependencies>
	</dependencies>
	
	<build>
		<pluginManagement>
			<plugins>
				<plugin>
					<groupId>org.apache.maven.plugins</groupId>
					<artifactId>maven-compiler-plugin</artifactId>
					<version>2.3.2</version>
					<configuration>
						<source>1.7</source>
						<target>1.7</target>
					</configuration>
				</plugin>
				<plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>1.4</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                        <configuration>
                            <filters>
                                <filter>
                                    <artifact>*:*</artifact>
                                    <excludes>
                                        <exclude>META-INF/*.SF</exclude>
                                        <exclude>META-INF/*.DSA</exclude>
                                        <exclude>META-INF/*.RSA</exclude>
                                    </excludes>
                                </filter>
                            </filters>
                            <transformers>
                                <transformer
                                    implementation="org.apache.maven.plugins.shade.resource.AppendingTransformer">
                                    <resource>META-INF/spring.handlers</resource>
                                </transformer>
                                <transformer
                                    implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                    <mainClass>com.stone.business.bootstrap.ProviderServer</mainClass>
                                </transformer>
                                <transformer
                                    implementation="org.apache.maven.plugins.shade.resource.AppendingTransformer">
                                    <resource>META-INF/spring.schemas</resource>
                                </transformer>
                            </transformers>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
			</plugins>
		</pluginManagement>
	</build>

	<distributionManagement>
		<snapshotRepository>
            <id>snapshots</id>
            <name>huaiye Snapshot</name>
            <url>http://192.168.2.131:8081/nexus/content/repositories/snapshots/</url>
            <uniqueVersion>true</uniqueVersion>
        </snapshotRepository>
        
		<repository>
			<id>releases</id>
			<url>http://192.168.2.131:8081/nexus/content/repositories/releases/</url>
		</repository>
	</distributionManagement>
</project> 
