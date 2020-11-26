package chat.bean;

public class ProjectModelHolder  extends BaseHolder {

	private String id;// (256),
	private String modelID;// (256) DEFAULT (null) ,
	private String codeFolder;// (256),
	private String author;// (32),
	private String version;// (32) DEFAULT (null) ,
	private String packages;// (32) DEFAULT (null) ,
	private String urlPrefix;// (32) DEFAULT (null) ,
	private String dbSchema;// (16)

	private String ip;// (32),
	private String user;// (32) DEFAULT (null) ,
	private String pwd;// (32) DEFAULT (null) ,
	private String dataID;// (32) DEFAULT (null) ,
	private String dataName;// (32) DEFAULT (null) ,
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getModelID() {
		return modelID;
	}
	public void setModelID(String modelID) {
		this.modelID = modelID;
	}
	public String getCodeFolder() {
		return codeFolder;
	}
	public void setCodeFolder(String codeFolder) {
		this.codeFolder = codeFolder;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getPackages() {
		return packages;
	}
	public void setPackages(String packages) {
		this.packages = packages;
	}
	public String getUrlPrefix() {
		return urlPrefix;
	}
	public void setUrlPrefix(String urlPrefix) {
		this.urlPrefix = urlPrefix;
	}
	public String getDbSchema() {
		return dbSchema;
	}
	public void setDbSchema(String dbSchema) {
		this.dbSchema = dbSchema;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getDataID() {
		return dataID;
	}
	public void setDataID(String dataID) {
		this.dataID = dataID;
	}
	public String getDataName() {
		return dataName;
	}
	public void setDataName(String dataName) {
		this.dataName = dataName;
	}
	
	@Override
	public String toString() {
		return this.modelID;
	}
	
}