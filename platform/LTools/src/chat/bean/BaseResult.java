package chat.bean;

public class BaseResult {
private int code;

private String desc;

private Object object;

public void setCode(int code){
this.code = code;
}
public int getCode(){
return this.code;
}
public void setDesc(String desc){
this.desc = desc;
}
public String getDesc(){
return this.desc;
}
public void setObject(Object object){
this.object = object;
}
public Object getObject(){
return this.object;
}

}