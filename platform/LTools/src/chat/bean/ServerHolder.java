package chat.bean;

public class ServerHolder extends BaseHolder  {
	private String id;

	private String name;

	private String ip;
	
	private String newIp;

	private String type;

	private String user;

	private String mac;

	private String gateway;

	private String mask;

	private String pwd;
	
	private String opt;


	public String getNewIp() {
		return newIp;
	}

	public void setNewIp(String newIp) {
		this.newIp = newIp;
	}

	public String getOpt() {
		return opt;
	}

	public void setOpt(String opt) {
		this.opt = opt;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getId() {
		return this.id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return this.name;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getIp() {
		return this.ip;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getType() {
		return this.type;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getUser() {
		return this.user;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}

	public String getMac() {
		return this.mac;
	}

	public void setGateway(String gateway) {
		this.gateway = gateway;
	}

	public String getGateway() {
		return this.gateway;
	}

	public void setMask(String mask) {
		this.mask = mask;
	}

	public String getMask() {
		return this.mask;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getPwd() {
		return this.pwd;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append(name);
		builder.append("【");
		builder.append(ip);
		builder.append("_");
		builder.append(user);
		builder.append("】");	
		return builder.toString();
	}
}