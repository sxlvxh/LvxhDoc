package com.huaiye.plugin.plat.util;
import java.util.List;
public class Procedure {
private List<InParam> inParam ;

private List<OutResult> outResult ;

private String name;

public void setInParam(List<InParam> inParam){
this.inParam = inParam;
}
public List<InParam> getInParam(){
return this.inParam;
}
public void setOutResult(List<OutResult> outResult){
this.outResult = outResult;
}
public List<OutResult> getOutResult(){
return this.outResult;
}
public void setName(String name){
this.name = name;
}
public String getName(){
return this.name;
}

}