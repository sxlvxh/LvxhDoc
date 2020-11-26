<html lang="zh-cn">
<head>
<meta charset="utf-8" />

<style> 
body{
    border: 1px solid #eee;
    padding: 10px;
}
	table{
		width:100%;
		border-collapse:collapse;
	}
	section {
		border: 1px solid #ddd;
		padding: 10px 10px;
		
	}
   
h2 {
    background-color: #ddd;
    font-size: 18px;
    margin-top: -7px;
    padding: 10px;
}
	h3 {
		 border-bottom: 2px solid #888;
    	font-size: 16px;
    	padding: 0 10px;
	}
	th{
		background-color:#eee;
	}
	tr -> td
	{
	 width:300px;
	}
	.none-tr
	{
	 display:none;
	}
	
	.td-title
	{
		 background-color: #eee;
    padding: 5px;
    width: 130px;
	}
	
	.menutree {
	background-color: #cfcfcf;
		 height: 33px;
    overflow: hidden;
    padding: 5px 0;
    position: fixed;
    right: 20px;
    top: 12px;
    z-index: 1;
		border-radius: 5px; /* 所有角都使用半径为5px的圆角，此属性为CSS3标准属性 */
		-moz-border-radius: 5px; /* Mozilla浏览器的私有属性 */
		-webkit-border-radius: 5px; /* Webkit浏览器的私有属性 */
		border-radius: 5px ; /* 四个半径值分别是左上角、右上角、右下角和左下角 */ 
		
	}
	
	.menutree:hover {
		height: auto;
	}
	
	li, ul {
		list-style: none;
		padding: 5px 5px;
	}
	td
	{
	 padding-left:10px;
	}
a:link{text-decoration:none;   /* 指正常的未被访问过的链接*/

}
a:visited{text-decoration:none; /*指已经访问过的链接*/

}
a:hover{text-decoration:none;/*指鼠标在链接*/}a:active{text-decoration:none;/* 指正在点的链接*/ 

}
</style>
</head>
<body>
<div id="${className?lower_case}_menutree" class="menutree">
	<li>
		<a href="#${className?lower_case}_top">${comment}接口目录</a>
		<ul>
			<li><a href="#${className?lower_case}_list">1. 获取列表</a></li>
			<li><a href="#${className?lower_case}_grid">2. 分页获取列表</a></li>
			<li><a href="#${className?lower_case}_insert">3. 添加</a></li>
			<li><a href="#${className?lower_case}_insertBatch">4. 批量添加</a></li>
			<li><a href="#${className?lower_case}_update">5. 修改</a></li>
			<li><a href="#${className?lower_case}_updateBatch">6. 批量修改</a></li>
			<li><a href="#${className?lower_case}_delete">7. 删除</a></li>
			<li><a href="#${className?lower_case}_deleteBatch">8. 批量删除</a></li>
		</ul>
	</li>
</div>

<H2 id="${className?lower_case}_top">${comment}模块接口描述</H3>
<H3 id="${className?lower_case}_list">1. 获取列表</H3>
<section>
	<DIV id="${className?lower_case}_list_params" class="params_div">
		<table border="1">
			<tr><td class="td-title">请求路径：</td><td colspan="4">/${pro.url_prefix}${className?lower_case}/list.action</td></tr>
			<#assign x = 1>
			<tr><td class="td-title" id="${className?lower_case}_list_params_in">输入参数描述：</td></tr>
			<tr>
				<#assign x = x + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
		<#list field as param>
			<#if param.javaName?lower_case = "createuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "createtime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updateuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updatetime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "password">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#else>
			<tr>
				<#assign x = x + 1>
			    <td>${param.javaName?uncap_first}</td>
			    <td><#if param.javaType = "java.util.Date">Date<#elseif param.javaType = "Integer">int<#else>String</#if></td>
			    <td></td>
			    <td>${param.comment}</td>
			</tr>
			<#if param.javaType = "java.util.Date">
			<tr>
				<#assign x = x + 1>
			    <td>${param.javaName?uncap_first}L</td>
			    <td>Date</td>
			    <td></td>
			    <td>${param.comment}左值</td>
			</tr>
			<tr>
				<#assign x = x + 1>
			    <td>${param.javaName?uncap_first}R</td>
			    <td>Date</td>
			    <td></td>
			    <td>${param.comment}右值</td>
			</tr>
			</#if>
			</#if>
		</#list>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输入Sample：</td>
				<td colspan="4"><CODE>${r"{"}<br>
				<#list field as param><#if param.javaName?lower_case = "createuserid"><#elseif param.javaName?lower_case = "createtime"><#elseif param.javaName?lower_case = "updateuserid"><#elseif param.javaName?lower_case = "updatetime"><#else> &nbsp;&nbsp;&nbsp;&nbsp;"${param.javaName?uncap_first}": "",<br></#if>
				</#list>
			     }
				</CODE>
				</td>
			</tr>
			
			<#assign y = 1>
			<tr><td class="td-title" id="${className?lower_case}_list_params_out">输出参数描述：</td></tr>
			<tr>
				<#assign y = y + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>code</td>
			    <td>int</td>
			    <td></td>
			    <td>返回码 0：成功 1：失败</td>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>description</td>
			    <td>String</td>
			    <td></td>
			    <td>返回描述</td>
			</tr>
		<#list field as param>
			<#if param.javaName?lower_case = "createuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "createtime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updateuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updatetime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "password">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#else>
			<tr>
				<#assign y = y + 1>
			    <td>${param.javaName?uncap_first}</td>
			    <td><#if param.javaType = "java.util.Date">String<#elseif param.javaType = "Integer">int<#else>String</#if></td>
			    <td></td>
			    <td>${param.comment}</td>
			</tr>
			</#if>
		</#list>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输出Sample：</td>
				<td colspan="4"><CODE>${r"{"}<br>&nbsp;&nbsp;"code":0,<br>&nbsp;&nbsp;"description":"",<br>&nbsp;&nbsp;"result":[${r"{"}<br><#list field as param><#if param.javaName?lower_case = "createuserid"><#elseif param.javaName?lower_case = "createtime"><#elseif param.javaName?lower_case = "updateuserid"><#elseif param.javaName?lower_case = "updatetime"><#else>&nbsp;&nbsp;&nbsp;&nbsp;"${param.javaName?uncap_first}": "",<br></#if></#list>&nbsp;&nbsp;&nbsp;&nbsp;}]<br>}</CODE></td>
			</tr>
		</table>
		<script>
			document.getElementById("${className?lower_case}_list_params_in").rowSpan = ${x};
			document.getElementById("${className?lower_case}_list_params_out").rowSpan = ${y};
		</script>
	</DIV>
</section>


<H3 id="${className?lower_case}_grid">2. 分页获取列表</H3>
<section>
	<DIV id="${className?lower_case}_grid_params" class="params_div">
		<table border="1">
			<tr><td class="td-title">请求路径：</td><td colspan="4">/${pro.url_prefix}${className?lower_case}/grid.action</td></tr>
			<#assign x = 1>
			<tr><td class="td-title" id="${className?lower_case}_grid_params_in">输入参数描述：</td></tr>
			<tr>
				<#assign x = x + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
		<#list field as param>
			<#if param.javaName?lower_case = "createuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "createtime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updateuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updatetime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "password">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#else>
			<tr>
				<#assign x = x + 1>
			    <td>${param.javaName?uncap_first}</td>
			    <td><#if param.javaType = "java.util.Date">Date<#elseif param.javaType = "Integer">int<#else>String</#if></td>
			    <td></td>
			    <td>${param.comment}</td>
			</tr>
			<#if param.javaType = "java.util.Date">
			<tr>
				<#assign x = x + 1>
			    <td>${param.javaName?uncap_first}L</td>
			    <td>Date</td>
			    <td></td>
			    <td>${param.comment}左值</td>
			</tr>
			<tr>
				<#assign x = x + 1>
			    <td>${param.javaName?uncap_first}R</td>
			    <td>Date</td>
			    <td></td>
			    <td>${param.comment}右值</td>
			</tr>
			</#if>
			</#if>
		</#list>
			<tr>
				<#assign x = x + 1>
			    <td>perNumbder</td>
			    <td>int</td>
			    <td></td>
			    <td>每页显示数量</td>
			</tr>
			<tr>
				<#assign x = x + 1>
			    <td>page</td>
			    <td>int</td>
			    <td></td>
			    <td>当前页码</td>
			</tr>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输入Sample：</td>
				<td colspan="4"><CODE>${r"{"}<br><#list field as param><#if param.javaName?lower_case = "createuserid"><#elseif param.javaName?lower_case = "createtime"><#elseif param.javaName?lower_case = "updateuserid"><#elseif param.javaName?lower_case = "updatetime"><#else>&nbsp;&nbsp;"${param.javaName?uncap_first}": "",<br></#if></#list>&nbsp;&nbsp;"perNumber":0,<br>&nbsp;&nbsp;"page":0<br>}</CODE></td>
			</tr>
			
			<#assign y = 1>
			<tr><td class="td-title" id="${className?lower_case}_grid_params_out">输出参数描述：</td></tr>
			<tr>
				<#assign y = y + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>code</td>
			    <td>int</td>
			    <td></td>
			    <td>返回码 0：成功 1：失败</td>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>description</td>
			    <td>String</td>
			    <td></td>
			    <td>返回描述</td>
			</tr>
		<#list field as param>
			<#if param.javaName?lower_case = "createuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "createtime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updateuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updatetime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "password">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#else>
			<tr>
				<#assign y = y + 1>
			    <td>${param.javaName?uncap_first}</td>
			    <td><#if param.javaType = "java.util.Date">String<#elseif param.javaType = "Integer">int<#else>String</#if></td>
			    <td></td>
			    <td>${param.comment}</td>
			</tr>
			</#if>
		</#list>
			<tr>
				<#assign y = y + 1>
			    <td>curPage</td>
			    <td>int</td>
			    <td></td>
			    <td>当前页码</td>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>totalCount</td>
			    <td>int</td>
			    <td></td>
			    <td>总数</td>
			</tr>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输出Sample：</td>
				<td colspan="4"><CODE>${r"{"}<br>&nbsp;&nbsp;"code":0,<br>&nbsp;&nbsp;"description":"",<br>&nbsp;&nbsp;"result":[${r"{"}<#list field as param><#if param.javaName?lower_case = "createuserid"><#elseif param.javaName?lower_case = "createtime"><#elseif param.javaName?lower_case = "updateuserid"><#elseif param.javaName?lower_case = "updatetime"><#else><br>&nbsp;&nbsp;&nbsp;&nbsp;"${param.javaName?uncap_first}": "",</#if></#list><br>&nbsp;&nbsp;&nbsp;&nbsp;}],<br>&nbsp;&nbsp;"curPage":0,<br>&nbsp;&nbsp;"totalCount":0<br>}</CODE></td>
			</tr>
		</table>
		<script>
			document.getElementById("${className?lower_case}_grid_params_in").rowSpan = ${x};
			document.getElementById("${className?lower_case}_grid_params_out").rowSpan = ${y};
		</script>
	</DIV>
</section>

<#if className?lower_case?starts_with("view")>
<#else>
<H3 id="${className?lower_case}_insert">3. 添加</H3>
<section>
	<DIV id="${className?lower_case}_insert_params" class="params_div">
		<table border="1">
			<tr><td class="td-title">请求路径：</td><td colspan="4">/${pro.url_prefix}${className?lower_case}/insert.action</td></tr>
			<#assign x = 1>
			<tr><td class="td-title" id="${className?lower_case}_insert_params_in">输入参数描述：</td></tr>
			<tr>
				<#assign x = x + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
		<#list field as param>
			<#if param.javaName?lower_case = "createuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "createtime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "id">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "isdel">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updateuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updatetime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "password">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#else>
			<tr>
				<#assign x = x + 1>
			    <td>${param.javaName?uncap_first}</td>
			    <td><#if param.javaType = "java.util.Date">String<#elseif param.javaType = "Integer">int<#else>String</#if></td>
			    <td></td>
			    <td>${param.comment}</td>
			</tr>
			</#if>
		</#list>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输入Sample：</td>
				<td colspan="4"><CODE>${r"{"}<#list field as param><#if param.javaName?lower_case = "isdel"><#elseif param.javaName?lower_case = "id"><#elseif param.javaName?lower_case = "createuserid"><#elseif param.javaName?lower_case = "createtime"><#elseif param.javaName?lower_case = "updateuserid"><#elseif param.javaName?lower_case = "updatetime"><#else><br>&nbsp;&nbsp;"${param.javaName?uncap_first}": "",</#if></#list><br>}</CODE></td>
			</tr>
			
			<#assign y = 1>
			<tr><td class="td-title" id="${className?lower_case}_insert_params_out">输出参数描述：</td></tr>
			<tr>
				<#assign y = y + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>code</td>
			    <td>int</td>
			    <td></td>
			    <td>返回码 0：成功 1：失败</td>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>description</td>
			    <td>String</td>
			    <td></td>
			    <td>返回描述</td>
			</tr>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输出Sample：</td>
				<td colspan="4"><CODE>${r"{"}<br>&nbsp;&nbsp;"code":0,<br>&nbsp;&nbsp;"description":""<br>}</CODE></td>
			</tr>
		</table>
		<script>
			document.getElementById("${className?lower_case}_insert_params_in").rowSpan = ${x};
			document.getElementById("${className?lower_case}_insert_params_out").rowSpan = ${y};
		</script>
	</DIV>
</section>


<H3 id="${className?lower_case}_insertBatch">4. 批量添加</H3>
<section>
	<DIV id="${className?lower_case}_insertBatch_params" class="params_div">
		<table border="1">
			<tr><td class="td-title">请求路径：</td><td colspan="4">/${pro.url_prefix}${className?lower_case}/insertBatch.action</td></tr>
			<#assign x = 1>
			<tr><td class="td-title" id="${className?lower_case}_insertBatch_params_in">输入参数描述：</td></tr>
			<tr>
				<#assign x = x + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
		<#list field as param>
			<#if param.javaName?lower_case = "createuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "createtime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "id">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updateuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "isdel">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updatetime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "password">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#else>
			<tr>
				<#assign x = x + 1>
			    <td>${param.javaName?uncap_first}</td>
			    <td><#if param.javaType = "java.util.Date">String<#elseif param.javaType = "Integer">int<#else>String</#if></td>
			    <td></td>
			    <td>${param.comment}</td>
			</tr>
			</#if>
		</#list>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输入Sample：</td>
				<td colspan="4"><CODE>[${r"{"}<#list field as param><#if param.javaName?lower_case = "isdel"><#elseif param.javaName?lower_case = "createuserid"><#elseif param.javaName?lower_case = "createtime"><#elseif param.javaName?lower_case = "updateuserid"><#elseif param.javaName?lower_case = "updatetime"><#else><br>&nbsp;&nbsp;"${param.javaName?uncap_first}": "",</#if></#list><br>}]</CODE></td>
			</tr>
			
			<#assign y = 1>
			<tr><td class="td-title" id="${className?lower_case}_insertBatch_params_out">输出参数描述：</td></tr>
			<tr>
				<#assign y = y + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>code</td>
			    <td>int</td>
			    <td></td>
			    <td>返回码 0：成功 1：失败</td>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>description</td>
			    <td>String</td>
			    <td></td>
			    <td>返回描述</td>
			</tr>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输出Sample：</td>
				<td colspan="4"><CODE>${r"{"}<br>&nbsp;&nbsp;"code":0,<br>&nbsp;&nbsp;"description":""<br>}</CODE></td>
			</tr>
		</table>
		<script>
			document.getElementById("${className?lower_case}_insertBatch_params_in").rowSpan = ${x};
			document.getElementById("${className?lower_case}_insertBatch_params_out").rowSpan = ${y};
		</script>
	</DIV>
</section>


<H3 id="${className?lower_case}_update">5. 修改</H3>
<section>
	<DIV id="${className?lower_case}_update_params" class="params_div">
		<table border="1">
			<tr><td class="td-title">请求路径：</td><td colspan="4">/${pro.url_prefix}${className?lower_case}/update.action</td></tr>
			<#assign x = 1>
			<tr><td class="td-title" id="${className?lower_case}_update_params_in">输入参数描述：</td></tr>
			<tr>
				<#assign x = x + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
		<#list field as param>
			<#if param.javaName?lower_case = "createuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "createtime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "isdel">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updateuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updatetime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "password">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#else>
			<tr>
				<#assign x = x + 1>
			    <td>${param.javaName?uncap_first}</td>
			    <td><#if param.javaType = "java.util.Date">String<#elseif param.javaType = "Integer">int<#else>String</#if></td>
			    <td></td>
			    <td>${param.comment}</td>
			</tr>
			</#if>
		</#list>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输入Sample：</td>
				<td colspan="4"><CODE>${r"{"}<#list field as param><#if param.javaName?lower_case = "isdel"><#elseif param.javaName?lower_case = "createuserid"><#elseif param.javaName?lower_case = "createtime"><#elseif param.javaName?lower_case = "updateuserid"><#elseif param.javaName?lower_case = "updatetime"><#else><br>&nbsp;&nbsp;"${param.javaName?uncap_first}": "",</#if></#list><br>}</CODE></td>
			</tr>
			
			<#assign y = 1>
			<tr><td class="td-title" id="${className?lower_case}_update_params_out">输出参数描述：</td></tr>
			<tr>
				<#assign y = y + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>code</td>
			    <td>int</td>
			    <td></td>
			    <td>返回码 0：成功 1：失败</td>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>description</td>
			    <td>String</td>
			    <td></td>
			    <td>返回描述</td>
			</tr>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输出Sample：</td>
				<td colspan="4"><CODE>${r"{"}<br>&nbsp;&nbsp;"code":0,<br>&nbsp;&nbsp;"description":""<br>}</CODE></td>
			</tr>
		</table>
		<script>
			document.getElementById("${className?lower_case}_update_params_in").rowSpan = ${x};
			document.getElementById("${className?lower_case}_update_params_out").rowSpan = ${y};
		</script>
	</DIV>
</section>


<H3 id="${className?lower_case}_updateBatch">6. 批量修改</H3>
<section>
	<DIV id="${className?lower_case}_updateBatch_params" class="params_div">
		<table border="1">
			<tr><td class="td-title">请求路径：</td><td colspan="4">/${pro.url_prefix}${className?lower_case}/updateBatch.action</td></tr>
			<#assign x = 1>
			<tr><td class="td-title" id="${className?lower_case}_updateBatch_params_in">输入参数描述：</td></tr>
			<tr>
				<#assign x = x + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
		<#list field as param>
			<#if param.javaName?lower_case = "createuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "createtime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updateuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "isdel">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updatetime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "password">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#else>
			<tr>
				<#assign x = x + 1>
			    <td>${param.javaName?uncap_first}</td>
			    <td><#if param.javaType = "java.util.Date">String<#elseif param.javaType = "Integer">int<#else>String</#if></td>
			    <td></td>
			    <td>${param.comment}</td>
			</tr>
			</#if>
		</#list>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输入Sample：</td>
				<td colspan="4"><CODE>[${r"{"}<#list field as param><#if param.javaName?lower_case = "isdel"><#elseif param.javaName?lower_case = "createuserid"><#elseif param.javaName?lower_case = "createtime"><#elseif param.javaName?lower_case = "updateuserid"><#elseif param.javaName?lower_case = "updatetime"><#else><br>&nbsp;&nbsp;"${param.javaName?uncap_first}": "",</#if></#list><br>}]</CODE></td>
			</tr>
			
			<#assign y = 1>
			<tr><td class="td-title" id="${className?lower_case}_updateBatch_params_out">输出参数描述：</td></tr>
			<tr>
				<#assign y = y + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>code</td>
			    <td>int</td>
			    <td></td>
			    <td>返回码 0：成功 1：失败</td>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>description</td>
			    <td>String</td>
			    <td></td>
			    <td>返回描述</td>
			</tr>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输出Sample：</td>
				<td colspan="4"><CODE>${r"{"}<br>&nbsp;&nbsp;"code":0,<br>&nbsp;&nbsp;"description":""<br>}</CODE></td>
			</tr>
		</table>
		<script>
			document.getElementById("${className?lower_case}_updateBatch_params_in").rowSpan = ${x};
			document.getElementById("${className?lower_case}_updateBatch_params_out").rowSpan = ${y};
		</script>
	</DIV>
</section>


<H3 id="${className?lower_case}_delete">7. 删除</H3>
<section>
	<DIV id="${className?lower_case}_delete_params" class="params_div">
		<table border="1">
			<tr><td class="td-title">请求路径：</td><td colspan="4">/${pro.url_prefix}${className?lower_case}/delete.action</td></tr>
			<#assign x = 1>
			<tr><td class="td-title" id="${className?lower_case}_delete_params_in">输入参数描述：</td></tr>
			<tr>
				<#assign x = x + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
		<#list field as param>
			<#if param.javaName?lower_case = "createuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "createtime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "isdel">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updateuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updatetime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "password">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#else>
			<tr>
				<#assign x = x + 1>
			    <td>${param.javaName?uncap_first}</td>
			    <td><#if param.javaType = "java.util.Date">String<#elseif param.javaType = "Integer">int<#else>String</#if></td>
			    <td></td>
			    <td>${param.comment}</td>
			</tr>
			</#if>
		</#list>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输入Sample：</td>
				<td colspan="4"><CODE>${r"{"}<#list field as param><#if param.javaName?lower_case = "isdel"><#elseif param.javaName?lower_case = "createuserid"><#elseif param.javaName?lower_case = "createtime"><#elseif param.javaName?lower_case = "updateuserid"><#elseif param.javaName?lower_case = "updatetime"><#else><br>&nbsp;&nbsp;"${param.javaName?uncap_first}": "",</#if></#list><br>}</CODE></td>
			</tr>
			
			<#assign y = 1>
			<tr><td class="td-title" id="${className?lower_case}_delete_params_out">输出参数描述：</td></tr>
			<tr>
				<#assign y = y + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>code</td>
			    <td>int</td>
			    <td></td>
			    <td>返回码 0：成功 1：失败</td>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>description</td>
			    <td>String</td>
			    <td></td>
			    <td>返回描述</td>
			</tr>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输出Sample：</td>
				<td colspan="4"><CODE>${r"{"}<br>&nbsp;&nbsp;"code":0,<br>&nbsp;&nbsp;"description":""<br>}</CODE></td>
			</tr>
		</table>
		<script>
			document.getElementById("${className?lower_case}_delete_params_in").rowSpan = ${x};
			document.getElementById("${className?lower_case}_delete_params_out").rowSpan = ${y};
		</script>
	</DIV>
</section>


<H3 id="${className?lower_case}_deleteBatch">8. 批量删除</H3>
<section>
	<DIV id="${className?lower_case}_deleteBatch_params" class="params_div">
		<table border="1">
			<tr><td class="td-title">请求路径：</td><td colspan="4">/${pro.url_prefix}${className?lower_case}/deleteBatch.action</td></tr>
			<#assign x = 1>
			<tr><td class="td-title" id="${className?lower_case}_deleteBatch_params_in">输入参数描述：</td></tr>
			<tr>
				<#assign x = x + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
		<#list field as param>
			<#if param.javaName?lower_case = "createuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "createtime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updateuserid">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "isdel">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "updatetime">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#elseif param.javaName?lower_case = "password">
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<#else>
			<tr>
				<#assign x = x + 1>
			    <td>${param.javaName?uncap_first}</td>
			    <td><#if param.javaType = "java.util.Date">String<#elseif param.javaType = "Integer">int<#else>String</#if></td>
			    <td></td>
			    <td>${param.comment}</td>
			</tr>
			</#if>
		</#list>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输入Sample：</td>
				<td colspan="4"><CODE>[${r"{"}<#list field as param><#if param.javaName?lower_case = "isdel"><#elseif param.javaName?lower_case = "createuserid"><#elseif param.javaName?lower_case = "createtime"><#elseif param.javaName?lower_case = "updateuserid"><#elseif param.javaName?lower_case = "updatetime"><#else><br>&nbsp;&nbsp;"${param.javaName?uncap_first}": "",</#if></#list><br>}]</CODE></td>
			</tr>
			
			<#assign y = 1>
			<tr><td class="td-title" id="${className?lower_case}_deleteBatch_params_out">输出参数描述：</td></tr>
			<tr>
				<#assign y = y + 1>
			    <th>列名</th>
			    <th>类型</th>
			    <th>备注</th>
			    <th>说明</th>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>code</td>
			    <td>int</td>
			    <td></td>
			    <td>返回码 0：成功 1：失败</td>
			</tr>
			<tr>
				<#assign y = y + 1>
			    <td>description</td>
			    <td>String</td>
			    <td></td>
			    <td>返回描述</td>
			</tr>
			<tr class="none-tr"><td></td><td></td><td></td><td></td></tr>
			<tr>
				<td class="td-title">输出Sample：</td>
				<td colspan="4"><CODE>${r"{"}<br>&nbsp;&nbsp;"code":0,<br>&nbsp;&nbsp;"description":""<br>}</CODE></td>
			</tr>
		</table>
		<script>
			document.getElementById("${className?lower_case}_deleteBatch_params_in").rowSpan = ${x};
			document.getElementById("${className?lower_case}_deleteBatch_params_out").rowSpan = ${y};
		</script>
	</DIV>
</section>
</#if>
</body>
</html>
