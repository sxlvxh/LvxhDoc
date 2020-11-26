package com.lvxh.plugin.platform.service;

/**
 * 系统作用域常量名称定义
 * author:		LeLe.CHEN
 * date:		2018年11月12日 下午3:45:37
 */
public interface Constants {
	
	String LOGIN_USER_ID = "LOGIN_USER_ID";
	
	String PRIMARY_MENU_COUNT = "PRIMARY_MENU_COUNT";
	
	/**
	 * web请求时浏览器中显示的标题
	 */
	public static final String SYSTEM_URL_TITLE = "SYSTEM_URL_TITLE";
	/**
	 * 系统标志
	 */
	public static final String SYSTEM_LOGO = "SYSTEM_LOGO";
	
	
	public final static String SERVER_TIME = "server_time";
	
	public final static String LOGIN_USER = "loing_user";
	
	public final static String LOGIN_ERROR_MESSAGE = "loing_error_message";
	
	public final static String MENU_LIST = "menu_list";
	/**
	 * 模块列表
	 */
	public static final String MODEL_LIST = "MODEL_LIST";
	/**
	 * 用户管理模块 用户菜单
	 */
	public static final String USER_MENU_LIST = "USER_MENU_LIST";
	
	/**
	 * 系统配置项
	 */
	public static String CONFIG_PARAMS = "CONFIG_PARAMS";
	
	/**
	 * 域编码
	 */
	public static String DOMAIN_CODE = "DOMAIN_CODE";
	public static String MENU_LOGIN_LIST = "menu_login_list";
	
	/**
	 * 本域信息
	 */
	public static String MY_COURT = "MY_COURT";
	


    /**
     * . 成功
     */
    public static final int SUCCESS = 0;

    /**
     * . 失败
     */
    public static final int FAILURE = 1;

    /**
     * . token无效
     */
    public static final int INVALID_TOKEN = 2;

    /**
     * . 用户基本信息
     */
    public static final String USER_INFO = "USER_INFO";


    /**
     * . 是否：否
     */
    public static final int NO = 0;

    /**
     * . 是否：是
     */
    public static final int YES = 1;

    /**
     * . 隐藏密码
     */
    public static final String COVER_PASSWORD = "******";

    /**
     * sleep10秒
     */
    public static final long SLEEP_TEN_SECOND = 10000L;

    /**
     * tcp固定消息头长度 8byte
     */
    public static final int MESSAGE_HEADER_LENGTH = 8;

    /**
     * 超时
     */
    public static final int TIMEOUT = 20;

    /**
     * 请求成功
     */
    public static final int RESPONSE_OK = 200;

    /**
     * . 每页数
     */
    public static final int HOLDER_COUNT = 10;
    
    
    /**
     * SIE超时时间（秒）
     */
    public static final String SIE_TIMEOUT = "SIE_TIMEOUT";

    /**
     * 请求成功
     */
    public static final String SIE_IP = "SIE_IPADDR";

    /**
     * . 每页数
     */
    public static final String SIE_PORT = "SIE_WEB_PORT";
    
    /**
     * sie客户端标示
     */
    public static final String SIE_CLIENT = "SIE_CLIENT";
    
    /**
     * 呼叫服务TCP监听端口
     */
    public static final String CALL_CENTER_SERVER_PORT = "CALL_CENTER_SERVER_PORT";
    
    /**
     * Spring ApplicationContext
     */
    public static final String ROOT_APPLICATIONCONTEXT = "ROOT_APPLICATIONCONTEXT";

    /**
     * 通达海同步类
     */
    public static  final String THD_SERVICE = "THD_SERVICE";

    /**
     * . SIE HTTP服务IP
     */
    public static  final String SIE_HTTP_IP = "SIE_HTTP_IP";

    /**
     * . SIE HTTP服务端口
     */
    public static  final String SIE_HTTP_PORT = "SIE_HTTP_PORT";
    
    /**
     * . 转码服务 HTTP服务IP
     */
    public static  final String SIE_HCS_IP = "SIE_HCS_IP";

    /**
     * . 转码服务 HTTP服务端口
     */
    public static  final String SIE_HCS_PORT = "SIE_HCS_PORT";

    /**
     * 本域编码
     */
    public static String LOCAL_DOMAINCODE = "LOCAL_DOMAINCODE";

    /**
     * SIE域编码常量
     */
    public static String SIE_DOMAINCODE = "SIE_DOMAINCODE";

    /**
     * . 版本服务 HTTP服务URL
     */
    public static String PUBLISHER_SERVER_URL = "PUBLISHER_SERVER_URL";

    /**
     * app名称
     */
    public static String APP_NAME = "APP_NAME";

    /**
     * 合成服务器http地址
     */
    public static String HCS_URL = "HCS_URL";

	public static String SERVER_APPTCP_PORT = "SERVER_APPTCP_PORT";

	public static String SERVER_TCP_TIMEOUT = "SERVER_TCP_TIMEOUT";

	public static String SERVER_IOSTCP_PORT = "SERVER_IOSTCP_PORT";

	public static String SERVER_WEBTCP_PORT = "SERVER_WEBTCP_PORT";
	
	public static String SERVER_FILE_PORT = "SERVER_FILE_PORT";
	
	public static String UPLOAD_FILE_DIR = "UPLOAD_FILE_DIR";
	public static String SESSION_ID = "SESSION_ID";
	
	public static String OS_TYPE = "OS_TYPE";
	public static String IOS = "IOS"; 
	public static String WINDOWS = "Windows"; 
	public static String ANDROID = "Android";
	public static String USB_RTSP = "USB_RTSP"; 

    /**
     * . 内容类型：文本
     */
    public static final int CONTENT_TEXT = 1;

    /**
     * . 内容类型：URL链接
     */
    public static final int CONTENT_URL = 2;


	/**
	 * . 数据库配置项SERVER_WEBTCP_PORT名称，Web服务扩展端口
	 */
	public static final String SERVER_WEBTCP_PORT_EXTEND = "SERVER_WEBTCP_PORT_EXTEND";

	/**
	 * 业务服务器TCP IP KEY
	 */
	public static final String SERVER_TCP_IP = "SERVER_TCP_IP";

	/**
	 * 业务服务器TCP TIMEOUT KEY
	 */

	/**
	 * 流媒体
	 */
	public static final String SIE_IPADDR = "SIE_IPADDR";

	/**
	 * 参数错误！
	 */
	public static final int PARAMETER_ERROR = 10001;
	
	/**
	 * 丢失用户
	 */
	public static final int MISSING_USER = 10002;
	
	/**
	 * 主叫忙
	 */
	public static final int CALLING_USER_BUSY = 10003;
	
	
	/**
	 * 被叫不在线
	 */
	public static final int CALLED_USER_OFFLINE = 10004;
	
	
	/**
	 * 主叫忙
	 */
	public static final int CALLED_USER_BUSY = 10005;
	
	/**
	 * 被叫与主叫相同
	 */
	public static final int CALLED_SAME_CALLING = 10006;
	
	/**
	 * 被分享人列表为空
	 */
	public static final int SHARE_USER_ISEMPTY = 10007;
	
	/**
	 * 请求超时
	 */
	public static final int REQUEST_TIMEOUT = 10008;
	
	/**
	 * 分享码错误
	 */
	public static final int SHARE_CODE_ERROR = 10009;
	

	/**
	 * 正在录像或分享
	 */
	public static  final int IS_SHAREING_OR_RECORDING = 10010;

	
	/**
	 * 主叫取消呼叫
	 */
	public static final int CALLING_CANCEL = 10011;
	
	/**
	 * 已停止分享
	 */
	public static final int STOPPED_SHARE = 10012;
	
	/**
	 * 主叫用户采集设备配置错误
	 */
	public static final int SRC_URL_ERROR = 10013;
	
	
	/**
	 * 被叫用户采集设备配置错误
	 */
	public static final int DEST_URL_ERROR = 10014;

	/**
	 * 重复登录错误！
	 */
	public static final int MULTI_REGISTER_ERROR = 3;
	
	/**
	 * 流媒体服务http地址
	 */
	public static final String SIE_HTTP_URL = "SIE_HTTP_URL";
	
	
	/**
	 * 获取4元组url
	 */
	public static final String GET_DYNAMIC_URL = "get_dynamic_url";
	
	
	/**
	 * 获取手机url
	 */
	public static final String GET_MOBILE_USER_URL = "get_mobile_user_url_req";
	
	/**
	 * 开始固定采集点录像
	 */
	public static final String START_STORAGE_URL = "start_storage";
	
	/**
	 * 停止固定采集点录像
	 */
	public static final String STOP_STORAGE_URL = "stop_storage";
	

	/**
	 * ApplicationContext
	 */
	public static final String APPLICATIONCONTEXT = "APPLICATIONCONTEXT";

	
	public static final String JCY_LX_URL_PREFIX = "JCY_LX_URL_PREFIX";

	public static final String JCY_LX_URL_LOGIN = "/index.php?c=auth&a=sso&i={0}&state={1}";
	
	public static final String JCY_AXD_URL_PREFIX = "JCY_AXD_URL_PREFIX";

	public static final String JCY_AXD_URL_LOGIN = "/oLogin.action?policeNo={0}&policePassword={1}";
	
	public static final String JCY_AXD_URL_USERS = "/oAllPerson.action";
	public static final String ONE_MENU_SIZE = "ONE_MENU_SIZE";
	public static final String TCP_CONNECT_TIMEOUT = "TCP_CONNECT_TIMEOUT";
	public static final String TCP_RESPONSE_TIMEOUT = "TCP_RESPONSE_TIMEOUT";
    public static final String TCP_REG_INTERVAL = "TCP_REG_INTERVAL";
    public static final String TCP_HEARTBEAT_INTERVAL = "TCP_HEARTBEAT_INTERVAL";


	
}
