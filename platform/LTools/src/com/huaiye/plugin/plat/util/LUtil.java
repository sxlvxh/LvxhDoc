package com.huaiye.plugin.plat.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Locale;

public class LUtil {
	public static String getFirstLowerCase(String name) {
		String key = name.substring(0,1).toLowerCase(Locale.getDefault()) + name.substring(1,name.length());
		return key;
	}
	public static String getFirstUpperCase(String name) {
		String key = name.substring(0,1).toUpperCase(Locale.getDefault()) + name.substring(1,name.length());
		return key;
	}
	public static String getPackageToDir(String name) {
		String key = name.replaceAll("\\.", "/");
		return key;
	}
	public static String toJavaName(String name) {
		StringBuilder b = new StringBuilder();
		for (String s : name.toLowerCase().split("_")) {
			b.append(Character.toUpperCase(s.charAt(0))).append(s.substring(1));
		}
		return b.toString();
	}

	public static String toJavaType(String type) {
		type = type.toLowerCase();
		if (type.contains("char")) {
			return "String";
		}
		if (type.contains("int")) {
			return "Integer";
		}
		if (type.contains("date")) {
			return "java.util.Date";
		}
		if (type.contains("time")) {
			return "String";
		}
		if (type.contains("decimal")) {
			return "Double";
		}
		if (type.contains("float")) {
			return "Float";
		}
		if (type.contains("text")) {
			return "String";
		}
		if (type.contains("blob")) {
			return "Object";
		} else
			return type;
	}
	
	
	 /**
     * 以行为单位读取文件，常用于读面向行的格式化文件
     */
    public static String readFileByLines(String fileName) {
        File file = new File(fileName);
        BufferedReader reader = null;
        StringBuffer buf = new StringBuffer();
        try {
            reader = new BufferedReader(new InputStreamReader(new FileInputStream(file),"utf-8"));
            String tempString = null;
            // 一次读入一行，直到读入null为文件结束
            while ((tempString = reader.readLine()) != null) {
                buf.append(tempString);
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e1) {
                }
            }
        }
        return buf.toString();
    }
    
    /**
     * 以行为单位读取文件，常用于读面向行的格式化文件
     */
    public static void saveFileByString(String fileName,String content) {
        File file = new File(fileName);
        PrintWriter writer = null;
        try {
        	writer = new PrintWriter(file);
        	writer.write(content);
        	writer.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                	writer.close();
            }
        }
    }
    
    public static File mkdir(String str) {
		File f = new File(str);
		if (!f.exists()) {
			f.mkdirs();
		}
		return f;
	}
    
    public static String getUTF8(String str)
    {
    	try {
			String s = new String(str.getBytes("UTF-8"),"UTF-8");
			return s;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
    	return str;
    }
}
