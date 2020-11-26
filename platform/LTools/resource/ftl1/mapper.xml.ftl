<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="${pro.package}.${pro.url_prefix}${className?lower_case}.holder.${pro.url_prefix?cap_first}${className?cap_first}Mapper">
	
	<resultMap id="BaseResultMap" type="${pro.package}.${pro.url_prefix}${className?lower_case}.holder.${pro.url_prefix?cap_first}${className?cap_first}Holder">
	<#list field as column>
		<result column="${column.name?upper_case}" property="${column.javaName?uncap_first}" />
	</#list>
	</resultMap>
	
	<sql id="Base_Colnum_List">
		<#list field as column><#if column_index gt 0>,</#if>`${column.name?upper_case}`</#list>
	</sql>
	
	<sql id="Where_Clause">
		<trim suffixOverrides="and | or">
		<#list field as column>
			<#if column.javaName?lower_case = "updatetime">
			<if test="${column.javaName?uncap_first} != null <#if column.javaType != "Integer">and ${column.javaName?uncap_first} != ''</#if>">
				and `${column.name?upper_case}` = #${r"{"}${column.javaName?uncap_first}}
			</if>
			<#elseif column.javaName?lower_case = "loginname">
			<if test="${column.javaName?uncap_first} != null <#if column.javaType != "Integer">and ${column.javaName?uncap_first} != ''</#if>">
				and `${column.name?upper_case}` = #${r"{"}${column.javaName?uncap_first}}
			</if>
			<#else>
				<#if column.javaType = "java.util.Date">
			<if test="${column.javaName?uncap_first} != null <#if column.javaType != "Integer">and ${column.javaName?uncap_first} != ''</#if>">
				and `${column.name?upper_case}` = #${r"{"}${column.javaName?uncap_first}}
			</if>
			<if test="${column.javaName?uncap_first}L != null <#if column.javaType != "Integer">and ${column.javaName?uncap_first}L != ''</#if>">
				and `${column.name?upper_case}` &gt;= #${r"{"}${column.javaName?uncap_first}L}
			</if>
			<if test="${column.javaName?uncap_first}R != null <#if column.javaType != "Integer">and ${column.javaName?uncap_first}R != ''</#if>">
				and `${column.name?upper_case}` &lt;= #${r"{"}${column.javaName?uncap_first}R}
			</if>
				<#elseif column.javaName?lower_case?contains("name")>
			<if test="${column.javaName?uncap_first} != null <#if column.javaType != "Integer">and ${column.javaName?uncap_first} != ''</#if>">
				<choose>
					<when test="nofuzzy == 1">
				and `${column.name?upper_case}` = #${r"{"}${column.javaName?uncap_first}}
					</when>
					<otherwise>
				and `${column.name?upper_case}` like concat("%", #${r"{"}${column.javaName?uncap_first}}, "%") 
					</otherwise>
				</choose>
			</if>
				<#else>
			<if test="${column.javaName?uncap_first} != null <#if column.javaType != "Integer">and ${column.javaName?uncap_first} != ''</#if>">
				and `${column.name?upper_case}` = #${r"{"}${column.javaName?uncap_first}}
			</if>
				</#if>
			</#if>
		</#list>
		</trim>
	</sql>
	
<#if className?lower_case?starts_with("view")>
<#else>
	<sql id="Delete_Clause">
		where <trim prefixOverrides="and | or"><include refid="Where_Clause" /></trim>
	</sql>
	
	<insert id="insert" parameterType="${pro.package}.${pro.url_prefix}${className?lower_case}.holder.${pro.url_prefix?cap_first}${className?cap_first}Holder">
		insert into ${name?lower_case}( <include refid="Base_Colnum_List" /> )values( <#list field as column><#if column_index gt 0>,</#if>#${r"{"}${column.javaName?uncap_first}}</#list> )
	<selectKey keyProperty="id" resultType="java.lang.Integer">	select LAST_INSERT_ID() as id  </selectKey></insert>
	
	<update id="update" parameterType="${pro.package}.${pro.url_prefix}${className?lower_case}.holder.${pro.url_prefix?cap_first}${className?cap_first}Holder">
		update ${name?lower_case} set
		<trim suffixOverrides=",">
		<#list field as column>
		  <#if column.javaName?lower_case = "password">
		     <if test="${column.javaName?uncap_first} != null <#if column.javaType != "Integer">and ${column.javaName?uncap_first} != ''</#if>">
				`${column.name?upper_case}` = #${r"{"}${column.javaName?uncap_first}},
			</if>
		 <#else>
			<if test="${column.javaName?uncap_first} != null">
				`${column.name?upper_case}` = #${r"{"}${column.javaName?uncap_first}},
			</if>
		 </#if>
		</#list>
		</trim>
		where ID=#${r"{"}id}
	</update>
	
	<delete id="delete" parameterType="${pro.package}.${pro.url_prefix}${className?lower_case}.holder.${pro.url_prefix?cap_first}${className?cap_first}Holder">
		delete from ${name?lower_case} <include refid="Delete_Clause" />
	</delete>
</#if>
	
	<sql id="Query_Clause">
		where 1=1 <include refid="Where_Clause" />
	</sql>
	
	<select id="getList" resultMap="BaseResultMap" parameterType="${pro.package}.${pro.url_prefix}${className?lower_case}.holder.${pro.url_prefix?cap_first}${className?cap_first}Holder">
		select <include refid="Base_Colnum_List" /> from ${name?lower_case} <include refid="Query_Clause" />
		<if test="groupBy != null and groupBy != ''"> 
			group by $${r"{"}groupBy}
		</if> 
		<if test="sort != null and sort != ''"> 
			order by $${r"{"}sort.field} $${r"{"}sort.order} 
		</if> 
	</select> 

	<select id="getCountOfSummary" resultType="int" parameterType="${pro.package}.${pro.url_prefix}${className?lower_case}.holder.${pro.url_prefix?cap_first}${className?cap_first}Holder">
		select count(1) from (SELECT 1 FROM ${name?lower_case} <include refid="Query_Clause" />
		<if test="groupBy != null and groupBy != ''"> 
			group by $${r"{"}groupBy}
		</if> ) temp
	</select> 

	<select id="getListOfSummary" resultMap="BaseResultMap" parameterType="${pro.package}.${pro.url_prefix}${className?lower_case}.holder.${pro.url_prefix?cap_first}${className?cap_first}Holder">
		select <include refid="Base_Colnum_List" /> from ${name?lower_case} <include refid="Query_Clause" />
		<if test="groupBy != null and groupBy != ''"> 
			group by $${r"{"}groupBy}
		</if> 
		<if test="sort != null and sort != ''"> 
			order by $${r"{"}sort.field} $${r"{"}sort.order} 
		</if>
		limit $${r"{"}pages.startNo},$${r"{"}pages.pageSize} 
	</select>
	
</mapper>  
