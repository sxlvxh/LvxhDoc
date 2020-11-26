package cn.hylexus.jt808.common;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;

public class TPMSConsts {

	public static final String string_encoding = "GBK";

	public static final Charset string_charset = Charset.forName(string_encoding);
	// 标识位
	public static final int pkg_delimiter = 0x7e;
	// 客户端发呆15分钟后,服务器主动断开连接
	public static int tcp_client_idle_minutes = 30;

	// 终端通用应答
	public static final int msg_id_terminal_common_resp = 0x0001;
	// 终端心跳
	public static final int msg_id_terminal_heart_beat = 0x0002;
	// 终端注册
	public static final int msg_id_terminal_register = 0x0100;
	// 终端注销
	public static final int msg_id_terminal_log_out = 0x0003;
	// 终端鉴权
	public static final int msg_id_terminal_authentication = 0x0102;
	// 位置信息汇报
	public static final int msg_id_terminal_location_info_upload = 0x0200;
	// 胎压数据透传
	public static final int msg_id_terminal_transmission_tyre_pressure = 0x0600;
	// 查询终端参数应答
	public static final int msg_id_terminal_param_query_resp = 0x0104;

	// 平台通用应答
	public static final int cmd_common_resp = 0x8001;
	// 终端注册应答
	public static final int cmd_terminal_register_resp = 0x8100;
	// 设置终端参数
	public static final int cmd_terminal_param_settings = 0X8103;
	// 查询终端参数
	public static final int cmd_terminal_param_query = 0x8104;
	//批量上报坐标汇总
	public static final int batch_upload_of_location_data = 0x0704;
	//8.48 驾驶员身份信息采集上报
	public static final int drivers_identity_information = 0x0702;
	
	private static final String ALARM_STR = "0,紧急报警触动报警开关后触发;1,超速报警;2,疲劳驾驶;3,危险预警;4,GNSS;5,GNSS;6,GNSS;7,终端主电源欠压;8,终端主电源掉电;9,终端;10,TTS;11,摄像头故障;12,道路运输证;13,超速预警 ;14,疲劳驾驶预警;18,当天累计驾驶超时;19,超时停车 ;20,进出区域 ;21,进出路线 ;22,路段行驶时间不足/过长;23,路线偏离报警;24,车辆 ;25,车辆油量异常;26,车辆被盗(通过车辆防盗器);27,车辆非法点火;28,车辆非法位移;29,碰撞预警 ;30,侧翻预警 ;31,非法开门报警";

	public static final Map<String,String> ALARM_MAP = new HashMap<String,String>();
	
	static {
		String str[] = ALARM_STR.split(";");
		for(String s:str)
		{
			String ss [] = s.split(",");
			ALARM_MAP.put(ss[0], ss[1]);
		}
	}
	public static String getAlarmDesc(String binary)
	{
		String str = "";
		if(binary.length() == 32)
		{
			for(int i=0;i<32;i++)
			{
				String idx = String.valueOf(i);
				String charAt = String.valueOf(binary.charAt(i));
				if("1".equals(charAt))
				{
					if(str.length()>0)
					{
						str +=",";
					}
					str += ALARM_MAP.get(idx);
				}
			}
		}
		return str;
		
	}
	public static void main(String[] args) {
		
		System.out.println(getAlarmDesc("00000000000000000000100100000000"));
	}
}
