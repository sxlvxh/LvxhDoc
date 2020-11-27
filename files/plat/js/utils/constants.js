var CONSTANTS = {
	/**
	 * 退出到登录界面
	 * @type String
	 */
	LOGOUT_URL: "../main/logout.action",  //登出
	GETMSG_COUNT:"../platsms/getMsgCount.action", //获取已接收的历史消息数
	UPDATE_STATUS:"../platsms/updateStatus.action", //更新消息状态
	PLATSMS_GRID:"../platsms/grid.action",	//获取通知消息详情数据
	GETCOMMON_USER:"../platuser/getCommonUser.action",  //获取常用联系人列表
    GETOS_TREE:"../platuser/getOSTree.action",  //获取组织架构列表
    USER_SEARCH:"../platuser/search.action",  //获取查找人列表
    GETCONTACT_INFO:"../platsms/getContactInfo.action",  //获取历史聊天消息
    DELETE_FRIEND:"../platcontact/deleteFriend.action",  //删除常用联系人好友
    ADD_FRIEND:"../platcontact/addFriend.action",  //添加常用联系人好友
    SEND_MSG:"../platsms/sendMsg.action",  //发送消息
    CREATE_GROUP:"../platcontact/addCustomGroup.action",  //创建群组和群组添加人员
    DEL_GROUP_MEMBER:"../platcontact/delGroupMember.action",  //删除群成员
	SEND_GROUP_MSG:"../platsms/sendGroupMsg.action",  //发送群组消息
    GROUP_USER:"../platgroupuser/list.action",  //获取群组人员信息
    QUIT_GROUP:"../platcontact/quitGroup.action",  //退出群组
    UPDATE_GROUP:"../platcontact/modifyGroup.action",  //更新群组信息
    UPDATE_CONTACT:"../platcontact/update.action",  //根据id修改备注
    MEETING_USERLIST:"../platmeetinguserlist/list.action",  //获取会议人员信息
    PALT_FILES:"../platfiles/grid.action",  //获取已上传文件列表
    UPDATE_CONFIG:"../platconfig/updateConfig.action",  //更新配置
    CONFIG_UPDATE:"../platconfig/update.action",  //更新系统配置
    GETROOM_TREE:"../platroomgroup/getRoomTree.action",  //获取设备管理列表
    GETROOMBYFROUP_CODE:"../platroomgroup/getRoomByGroupCode.action",  
    GETROOMNODEBYFROUP_CODE	:"../platroomgroup/getRoomNodeByRoomCode.action", 
    GETBTN_TREE:"../platbutton/getBtnTree.action", //获取按钮树
    ROOMNODE_DELETE:"../platroomnode/delete.action", 
    ROOMNODE_LIST:"../platroomnode/list.action", 
    GETSIE_DATA:"../main/getSieData.action", 
    PLATROOM_LIST:"../platroomlist/list.action",  //获取庭室
	
	HY_EFENCE_DEFAULT_PALETTE : [["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"] ],  //颜色填充默认颜色
	/**
	 * 通讯录消息分页查询初始参数
	 * @type 
	 */
	MESSAGE_SCROLL_GRID_PARAMS: {
		"pageNum": 1, // 当前页码
		"pageSize": 20, // 当前每页条数
		"pageCount": 0,  //总页数
		"winH":  300,//$("#messageImgBtn-container").height(), //页面可视区域高度
		"scrollP": 0, //顶部的距离	
		"scrollT": 0 //底部的距离	
	},
	
	/**
	 * 主页头像，点击后修改用户数据参数
	 * @type 
	 */
	MODIFY_USER_PARAMS: {
		buttonName: "修改用户信息",
		buttonParams: "{\"dialog\":{\"width\":800,\"height\":400}}",
		buttonCode: "userModify",
		flist: [{
				"id": 22,
				"menuCode": "1001002",
				"fieldName": "name",
				"fieldType": "input",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "用户名称",
				"buttonCode": "userModify",
				"enable": "0",
				"fieldParams": "{\"sort\" : {\"field\" : \"name\"},\"validateParam\" : [{\"id\" : \"required\",\"message\" : \"用户名不能为空\"},{\"id\": \"length\",\"start\": \"1\",\"end\": \"10\",\"message\": \"用户名长度需在1~10之间！\"},{\"id\" : \"check\",\"message\" : \"部门名称不能输入特殊字符\"}]}",
				"display": "0"
			}, {
				"id": 23,
				"menuCode": "1001002",
				"fieldName": "mobilePhone",
				"fieldType": "input",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "手机账号",
				"buttonCode": "userModify",
				"fieldParams": "{\"sort\" : {\"field\" : \"mobile_phone\"},\"validateParam\" : [{\"id\" : \"required\",\"message\" : \"手机/账号不能为空\"}, {\"id\" : \"telephone\",\"message\" : \"手机号码不符合要求，0-9的11数字组成！\"}, {\"id\" : \"custom_ajax\",\"message\" : \"该手机号码已经存在\",\"post\" : \"mobilePhone\",\"url\" : \"../platuser/list.action\",            \"modifyId\": \"id\",            \"parentId\":\"userModify\"}]}",
				"enable": "0",
				"display": "0"
			}, {
				"id": 23,
				"menuCode": "1001002",
				"fieldName": "password",
				"fieldType": "input",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "用户密码",
				"buttonCode": "userModify",
				"fieldParams": "{\"validateParam\": [{\"id\": \"length\",\"start\": \"0\",\"end\": \"16\",\"message\": \"密码长度需在6~16之间！\"}, {\"id\": \"equal\",\"pagenode\": \"confirm\",\"message\": \"确认密码必须与用户密码一致！\"}]}",
				"enable": "0",
				"display": "0"
			}, {
				"id": 23,
				"menuCode": "1001002",
				"fieldName": "confirm",
				"fieldType": "input",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "确认密码",
				"buttonCode": "userModify",
				"fieldParams": "{\"validateParam\": [{\"id\": \"length\",\"start\": \"0\",\"end\": \"16\",\"message\": \"密码长度需在6~16之间！\"}, {\"id\": \"equal\",\"pagenode\": \"password\",\"message\": \"确认密码必须与用户密码一致！\"}]}",
				"enable": "0",
				"display": "0"
			}, {
				"id": 23,
				"menuCode": "1001002",
				"fieldName": "entName",
				"fieldType": "text",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "企业名称",
				"fieldParams": "{\"dynamicResult\": {\"url\": \"../platentlist/list.action\",\"postDynamicParam\": [{\"nodeType\": \"sessionUser\",\"postName\": \"activeEntCode\",\"sessionName\": \"entCode\"}],\"postStaticData\": {\"sort\": {\"field\": \"id asc\"}},\"resData\": {\"id\": \"entCode\",\"value\": \"entName\"}},\"event\": [{\"name\": \"change\",\"func\": \"changeSelect\",\"changeNodes\":[\"userDepCode\"]}]}",
				"buttonCode": "userModify",
				"enable": "0",
				"display": "0"
			}, {
				"id": 23,
				"menuCode": "1001002",
				"fieldName": "depName",
				"fieldType": "text",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "所属部门",
				"buttonCode": "userModify",
				"fieldParams": "{\"dynamicResult\": {\"url\": \"../platdep/list.action\",\"postDynamicParam\": [{\"nodeType\": \"elementNode\",\"postName\": \"entCode\",\"paramNodeName\": \"entCode\",\"pNodeID\": \"bd77cb98-ca78-4cb9-a72f-ab4b834fc44e_form\"}],\"postStaticData\": {\"sort\": {\"field\": \"id asc\"}},\"resData\": {\"id\": \"depCode\",\"value\": \"name\"}}}",
				"enable": "0",
				"display": "0"
			}, {
				"id": 23,
				"menuCode": "1001002",
				"fieldName": "userTypeName",
				"fieldType": "text",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "用户类型",
				"buttonCode": "userModify",
				"fieldParams": "{\"dynamicResult\": {\"url\": \"../platdict/list.action\",\"postDynamicParam\": [],\"postStaticData\": {\"sort\": {\"field\": \"id asc\"},\"groupId\":\"USER_TYPE\"},\"resData\": {\"id\": \"dataId\",\"value\": \"dataName\"}}}",
				"enable": "0",
				"display": "0"
			}, {
				"id": 23,
				"menuCode": "1001002",
				"fieldName": "userServiceTypeName",
				"fieldType": "text",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "业务类型",
				"buttonCode": "userModify",
				"fieldParams": "{\"dynamicResult\": {\"url\": \"../platdict/list.action\",\"postDynamicParam\": [],\"postStaticData\": {\"sort\": {\"field\": \"id asc\"},\"groupId\":\"USER_SERVICE_TYPE\"},\"resData\": {\"id\": \"dataId\",\"value\": \"dataName\"}}}",
				"enable": "0",
				"display": "0"
			}, {
				"id": 23,
				"menuCode": "1001002",
				"fieldName": "idTypeName",
				"fieldType": "text",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "证件类型",
				"buttonCode": "userModify",
				"fieldParams": "{\"dynamicResult\": {\"url\": \"../platdict/list.action\",\"postDynamicParam\": [],\"postStaticData\": {\"sort\": {\"field\": \"id asc\"},\"groupId\":\"ID_TYPE\"},\"resData\": {\"id\": \"dataId\",\"value\": \"dataName\"}}}",
				"enable": "0",
				"display": "0"
			}, {
				"id": 23,
				"menuCode": "1001002",
				"fieldName": "idNumber",
				"fieldType": "input",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "证件号码",
				"buttonCode": "userModify",
				"enable": "0",
				"display": "0"
			}, {
				"id": 23,
				"menuCode": "1001002",
				"fieldName": "jobName",
				"fieldType": "text",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "用户职位",
				"buttonCode": "userModify",
				"fieldParams": "{\"dynamicResult\": {\"url\": \"../platjob/list.action\",\"postDynamicParam\": [],\"postStaticData\": {\"sort\": {\"field\": \"id asc\"}},\"resData\": {\"id\": \"jobCode\",\"value\": \"jobName\"}}}",
				"enable": "0",
				"display": "0"
			}, {
				"id": 23,
				"menuCode": "1001002",
				"fieldName": "sex",
				"fieldType": "select",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "用户性别",
				"buttonCode": "userModify",
				"fieldParams": "{\"dynamicResult\": {\"url\": \"../platdict/list.action\",\"postDynamicParam\": [],\"postStaticData\": {\"sort\": {\"field\": \"id asc\"},\"groupId\":\"SEX\"},\"resData\": {\"id\": \"dataId\",\"value\": \"dataName\"}}}",
				"enable": "0",
				"display": "0"
			}, {
				"id": 24,
				"menuCode": "1001002",
				"fieldName": "imgUrl",
				//"fieldType": "selectImg",
				"fieldType": "upAndSelectFile",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "用户头像",
				"buttonCode": "userModify",
				"fieldParams": "{\"uploadParam\" : {\"type\" : [\"PNG\", \"JPG\", \"GIF\"],\"msg\" : \"只允许上传PNG，JPG，GIF类型的文件！\"}}",
				"enable": "0",
				"display": "0"
			}, {
				"id": 24,
				"menuCode": "1001002",
				"fieldName": "address",
				"fieldType": "input",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "办公地址",
				"buttonCode": "userModify",
				"enable": "0",
				"display": "0"
			}, {
				"id": 24,
				"menuCode": "1001002",
				"fieldName": "id",
				"fieldType": "input",
				"fieldStyle": "col-sm-6",
				"fieldLabel": "用户编号",
				"buttonCode": "userModify",
				"enable": "0",
				"display": "1"
			}
		],
		blist: [{
				"id": 123,
				"menuCode": "1001008",
				"buttonType": "option",
				"buttonName": "取消",
				"buttonParams": "{\"css\":\"btn btn-danger btn-white\",\"img\":\"fa fa-trash-o btn-white\"}",
				"enable": "0",
				"priority": "1",
				"display": "0",
				"enableDialog": "cancelDialog",
				"buttonCode": "9e04e3a5-0779-411d-ad50-de705decfa36",
				"parentCode": "bd77cb98-ca78-4cb9-a72f-ab4b834fc44e",
				"buttonLevel": 3
			}, {
				"id": 122,
				"menuCode": "1001008",
				"buttonType": "option",
				"buttonName": "保存",
				"buttonParams": JSON2.stringify({
					"afterClickOkFun": "modifyUser",
					"url": "../platuser/modifyUser.action",
					"css": "btn btn-white btn-info",
					"img": "glyphicon glyphicon-plus btn-white"
				}),
				"enable": "0",
				"priority": "2",
				"display": "0",
				"enableDialog": "saveDialog",
				"buttonCode": "7c0c70a9-8cde-4cac-9fce-c16d1adb2f39",
				"parentCode": "bd77cb98-ca78-4cb9-a72f-ab4b834fc44e",
				"buttonLevel": 3
			}
		]
	}
}