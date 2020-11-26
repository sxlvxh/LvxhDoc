<#list table as table>
	<dubbo:reference interface="${packageUrl}.${pro.url_prefix?cap_first}${table.className?lower_case}.service.${pro.url_prefix?uncap_first}${table.className?cap_first}Service" id="${pro.url_prefix?cap_first}${table.className?uncap_first}Service" check="false" />
</#list>