<#list table as table>
	<#list table.field as column>
insert  into conf_attr(class_name,attr_name,attr_label,attr_type,class_desc) values ('${pro.url_prefix?cap_first}${table.className?cap_first}Holder','${column.javaName?uncap_first}','${column.comment}','${column.type}','${table.comment}');
	</#list>
</#list>