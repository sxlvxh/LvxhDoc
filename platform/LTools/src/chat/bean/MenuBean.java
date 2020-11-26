package chat.bean;

public class MenuBean {
	private String name;
	private String id;
	private String imgUrl;
	private String click;

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	public String getClick() {
		return click;
	}

	public void setClick(String click) {
		this.click = click;
	}

	@Override
	public String toString() {
		return name;
	}

}
