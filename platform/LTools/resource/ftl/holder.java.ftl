/*
 * .${className?cap_first}Holder.java
 * Copyright 2016. All Rights Reserved.
 */
package ${pro.package}.${pro.url_prefix}${className?lower_case}.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . ${comment}
 * 
 * @author ${pro.author}
 * @version ${pro.version}
 */
public class ${pro.url_prefix?cap_first}${className?cap_first}Holder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;
<#list field as column>

<#if column.javaName?lower_case = "id">
	<#elseif column.javaName?lower_case = "isdel">
	<#elseif column.javaName?lower_case = "createuserid">
	<#elseif column.javaName?lower_case = "createtime">
	<#elseif column.javaName?lower_case = "updateuserid">
	<#elseif column.javaName?lower_case = "updatetime">
	<#else>
	/**
	 * . ${column.comment}
	 */
    private ${column.javaType} ${column.javaName?uncap_first};
    /**
	 * . 获取${column.comment}
	 *
	 * @return ${column.javaType}
	 */
	<#if column.javaType = "java.util.Date">
	@JsonSerialize(using = com.lvxh.plugin.platform.utils.CustomDateSerializer.class, include=JsonSerialize.Inclusion.NON_NULL)
	<#elseif column.javaName?lower_case = "password">
	@JsonSerialize(using = org.codehaus.jackson.map.ser.std.NullSerializer.class)
	<#else>
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    </#if>
    public ${column.javaType} get${column.javaName?cap_first}(){  
        return ${column.javaName?uncap_first};  
    }

    /**
	 * . 设置${column.comment}
	 *
	 * @column ${column.javaName?uncap_first}
	 *        ${column.comment}
	 */
	<#if column.javaType = "java.util.Date">
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    </#if>
    public void set${column.javaName?cap_first}(${column.javaType} ${column.javaName?uncap_first}){  
        this.${column.javaName?uncap_first} = ${column.javaName?uncap_first};  
    }
    
	<#if column.javaType = "java.util.Date">
	/**
	 * . ${column.comment}左值
	 */
    private ${column.javaType} ${column.javaName?uncap_first}L;
    
	/**
	 * . 获取${column.comment}左值
	 *
	 * @return ${column.javaType}
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public ${column.javaType} get${column.javaName?cap_first}L(){  
        return ${column.javaName?uncap_first}L;  
    }

    /**
	 * . 设置${column.comment}左值
	 *
	 * @column ${column.javaName?uncap_first}L
	 *        ${column.comment}左值
	 */
	 <#if column.javaType = "java.util.Date">
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    </#if>
    public void set${column.javaName?cap_first}L(${column.javaType} ${column.javaName?uncap_first}){  
        this.${column.javaName?uncap_first}L = ${column.javaName?uncap_first};  
    }
    
	/**
	 * . ${column.comment}右值
	 */
    private ${column.javaType} ${column.javaName?uncap_first}R;
    
	/**
	 * . 获取${column.comment}右值
	 *
	 * @return ${column.javaType}
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public ${column.javaType} get${column.javaName?cap_first}R(){  
        return ${column.javaName?uncap_first}R;  
    }

    /**
	 * . 设置${column.comment}右值
	 *
	 * @column ${column.javaName?uncap_first}R
	 *        ${column.comment}右值
	 */
	 <#if column.javaType = "java.util.Date">
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    </#if>
    public void set${column.javaName?cap_first}R(${column.javaType} ${column.javaName?uncap_first}){  
        this.${column.javaName?uncap_first}R = ${column.javaName?uncap_first};  
    }
    </#if>
    </#if>
	
</#list>
    /*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return GSON.toJson(this);
	}
}    