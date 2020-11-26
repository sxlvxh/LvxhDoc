package chat.sie.bean;

public class SIEMsgContent {
	private String strDstDomainCode;
	private String strSrcDomainCode;
	private int nMsgType;
	private String strMsgBody;

	public String getStrSrcDomainCode() {
		return strSrcDomainCode;
	}

	public void setStrSrcDomainCode(String strSrcDomainCode) {
		this.strSrcDomainCode = strSrcDomainCode;
	}

	public String getStrDstDomainCode() {
		return strDstDomainCode;
	}

	public void setStrDstDomainCode(String strDstDomainCode) {
		this.strDstDomainCode = strDstDomainCode;
	}

	public int getnMsgType() {
		return nMsgType;
	}

	public void setnMsgType(int nMsgType) {
		this.nMsgType = nMsgType;
	}

	public String getStrMsgBody() {
		return strMsgBody;
	}

	public void setStrMsgBody(String strMsgBody) {
		this.strMsgBody = strMsgBody;
	}

}
