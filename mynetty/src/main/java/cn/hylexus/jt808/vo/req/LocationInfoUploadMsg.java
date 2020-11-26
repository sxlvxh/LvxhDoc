package cn.hylexus.jt808.vo.req;


import cn.hylexus.jt808.common.TPMSConsts;
import cn.hylexus.jt808.vo.PackageData;

import java.util.Date;

import com.alibaba.fastjson.JSON;

/**
 * 位置信息汇报消息
 *
 * @author hylexus
 *
 */
public class LocationInfoUploadMsg extends PackageData {
	// 告警信息
	// byte[0-3]
	private int warningFlagField;
	// byte[4-7] 状态(DWORD(32))
	private int statusField;
	// byte[8-11] 纬度(DWORD(32))
	private float latitude;
	// byte[12-15] 经度(DWORD(32))
	private float longitude;
	// byte[16-17] 高程(WORD(16)) 海拔高度，单位为米（ m）
	// TODO ==>int?海拔
	private int elevation;
	// byte[18-19] 速度(WORD) 1/10km/h
	// TODO ==>float?速度
	private float speed;
	// byte[20-21] 方向(WORD) 0-359，正北为 0，顺时针
	private int direction;
	// byte[22-x] 时间(BCD[6]) YY-MM-DD-hh-mm-ss
	// GMT+8 时间，本标准中之后涉及的时间均采用此时区
	private Date time;
	
	private int inType;
	
	private int stopTime;
	
	public int getStopTime() {
		return stopTime;
	}

	public void setStopTime(int stopTime) {
		this.stopTime = stopTime;
	}

	public int getInType() {
		return inType;
	}

	public void setInType(int inType) {
		this.inType = inType;
	}

	/**
	 * 里程
	 */
	private float mileage;
	
	public float getMileage() {
		return mileage;
	}

	public void setMileage(float mileage) {
		this.mileage = mileage;
	}

	/**
	 * 油量
	 */
	private float oil;
	
	public float getOil() {
		return oil;
	}

	public void setOil(float oil) {
		this.oil = oil;
	}

	/**
	 * 扩展参数
	 */
	private String customData;
	
	/**
	 * 状态 二进制标识
	 */
	private String status;
	
	/**
	 * 告警 二进制标识
	 */
	private String alarm;
	
	/**
	 * 地理位置
	 */
	private String place;
	
	private String lngBd;
	private String latBd;
	
	public String getLngBd() {
		return lngBd;
	}

	public void setLngBd(String lngBd) {
		this.lngBd = lngBd;
	}

	public String getLatBd() {
		return latBd;
	}

	public void setLatBd(String latBd) {
		this.latBd = latBd;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	/**
	 * 告警描述信息
	 */
	private String alarmDesc;

	public String getAlarmDesc() {
		return alarmDesc;
	}

	public void setAlarmDesc(String alarmDesc) {
		this.alarmDesc = alarmDesc;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAlarm() {
		return alarm;
	}

	public void setAlarm(String alarm) {
		this.alarm = alarm;
		this.setAlarmDesc(TPMSConsts.getAlarmDesc(alarm));
	}

	public String getCustomData() {
		return customData;
	}

	public void setCustomData(String customData) {
		this.customData = customData;
	}

	public LocationInfoUploadMsg() {
	}

	public LocationInfoUploadMsg(PackageData packageData) {
		this();
		this.channel = packageData.getChannel();
		this.checkSum = packageData.getCheckSum();
		this.msgBodyBytes = packageData.getMsgBodyBytes();
		this.msgHeader = packageData.getMsgHeader();
	}

	public float getLatitude() {
		return latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public float getLongitude() {
		return longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public int getElevation() {
		return elevation;
	}

	public void setElevation(int elevation) {
		this.elevation = elevation;
	}

	public float getSpeed() {
		return speed;
	}

	public void setSpeed(float speed) {
		this.speed = speed;
	}

	public int getDirection() {
		return direction;
	}

	public void setDirection(int direction) {
		this.direction = direction;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public int getWarningFlagField() {
		return warningFlagField;
	}

	public void setWarningFlagField(int warningFlagField) {
		this.warningFlagField = warningFlagField;
	}

	public int getStatusField() {
		return statusField;
	}

	public void setStatusField(int statusField) {
		this.statusField = statusField;
	}

	@Override
	public String toString() {
		return JSON.toJSONString(this, true);
	}

}
