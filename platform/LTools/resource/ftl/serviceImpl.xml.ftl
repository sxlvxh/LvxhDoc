<#list table as table>
	<bean id="${pro.url_prefix?cap_first}${table.className?uncap_first}Service" class="${packageUrl}.${pro.url_prefix?cap_first}${table.className?lower_case}.serviceimpl.${pro.url_prefix?uncap_first}${table.className?cap_first}ServiceImpl"></bean>
	<dubbo:service interface="${packageUrl}.${pro.url_prefix?cap_first}${table.className?lower_case}.service.${pro.url_prefix?uncap_first}${table.className?cap_first}Service" ref="${pro.url_prefix?cap_first}${table.className?uncap_first}Service"></dubbo:service>

</#list>