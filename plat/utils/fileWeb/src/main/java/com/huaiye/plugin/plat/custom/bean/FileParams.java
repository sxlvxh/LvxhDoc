/**
  * Copyright 2020 bejson.com 
  */
package com.huaiye.plugin.plat.custom.bean;
import java.util.ArrayList;
import java.util.List;

/**
 * Auto-generated: 2020-04-03 17:21:47
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
public class FileParams {

    private String type;
    private List<FileList> fileList = new ArrayList<FileList>();
    public void setType(String type) {
         this.type = type;
     }
     public String getType() {
         return type;
     }

    public void setFileList(List<FileList> fileList) {
         this.fileList = fileList;
     }
     public List<FileList> getFileList() {
         return fileList;
     }

}