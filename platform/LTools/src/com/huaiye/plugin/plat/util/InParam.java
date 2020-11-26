package com.huaiye.plugin.plat.util;
public class InParam {
private String name;

private String type;

public void setName(String name){
this.name = name;
}
public String getName(){
return this.name;
}
public void setType(String type){
this.type = type;
}
public String getType(){
return this.type;
}
@Override
public String toString() {
	StringBuilder builder = new StringBuilder();
	builder.append("InParam [name=");
	builder.append(name);
	builder.append(", type=");
	builder.append(type);
	builder.append("]");
	return builder.toString();
}

}

