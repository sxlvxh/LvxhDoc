package com.huaiye.plugin.util;

import java.io.File;
import java.io.FileOutputStream;
import java.security.MessageDigest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import utils.PUtils;

/**
 * Hello world!
 *
 */
public class License2 
{
	private static final Logger LOG = Logger.getLogger(License2.class);
	 private static String DES="DES";
	 private static String SECRET_KEY="";
	 private static final String DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
	 //1e84cfb6480577a5487897fe862bf9d2a8936ef42822e6ec0668b311d232daf7
	 //81f9f3df212b063bdfc3822507a5df8bd1563c35dc520bac1ebca1dcc9995289  雨花环卫
	 //d2370c0c38619f89820760f16578a59cee68ceed9daa804a8142cfa2fb4fb457 麒麟城管
	 //52640864ff1996f859d30036ea8a9bef13851dba9d0ae45cb58b11b48aa408e5 总队城管
	 //d06d6d9e6118ff894b592a20302c3975c37767cd523134cd1d335e8bf7e25b4a金湖法院
	 //203f6b66a16349ff2b2e9b1aaf75e75b0eefff0f9b87304495131273b6ef2939 雨花城管
	 //7aec50a39ca4c24ab6e71d572bd9d18b16e0e2c546f12c421b20ab9710f9d8ae 演示1
	 /**
	  * 1e84cfb6480577a5487897fe862bf9d2a8936ef42822e6ec0668b311d232daf7 玄武
	  * 1e84cfb6480577a5487897fe862bf9d2a8936ef42822e6ec0668b311d232daf7 新港开发区
	  * 52640864ff1996f859d30036ea8a9bef13851dba9d0ae45cb58b11b48aa408e5 秦淮区
	  * fe32d76e40681f679384b707b4129ba1c7e377e223c17aa636f21a87fa73d7ff 栖霞
	  * 1e84cfb6480577a5487897fe862bf9d2a8936ef42822e6ec0668b311d232daf7 浦口
	  * 1e84cfb6480577a5487897fe862bf9d2a8936ef42822e6ec0668b311d232daf7 六合开发区
	  * 1e84cfb6480577a5487897fe862bf9d2a8936ef42822e6ec0668b311d232daf7 六合
	  * 55df372338a0576fc7e104b28c9fb638b763fb2770866baef7fb7da3dd9ec851 溧水
	  * 1e84cfb6480577a5487897fe862bf9d2a8936ef42822e6ec0668b311d232daf7 江心洲
	  * 1e84cfb6480577a5487897fe862bf9d2a8936ef42822e6ec0668b311d232daf7 江宁
	  * 1e84cfb6480577a5487897fe862bf9d2a8936ef42822e6ec0668b311d232daf7 建业
	  * 1e84cfb6480577a5487897fe862bf9d2a8936ef42822e6ec0668b311d232daf7 鼓楼
	  * 1e84cfb6480577a5487897fe862bf9d2a8936ef42822e6ec0668b311d232daf7 高淳
	  * 1e84cfb6480577a5487897fe862bf9d2a8936ef42822e6ec0668b311d232daf7 顶山
	  * 1e84cfb6480577a5487897fe862bf9d2a8936ef42822e6ec0668b311d232daf7 冰江
	  * @param str
	  * @return
	  */
	private static String getSHA256(String str) {
		MessageDigest messageDigest;
		String encodestr = "";
		try {
			messageDigest = MessageDigest.getInstance("SHA-256");
			messageDigest.update(str.getBytes("UTF-8"));
			encodestr = byte2Hex(messageDigest.digest());
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		} 
		return encodestr;
	}
	
	private static String getSha256ByTimes(String str,int times)
	{
		String strs = str;
		for(int i =0 ;i< times;i++)
		{
			strs = getSHA256(strs);
		}
		return strs;
	}

	private static String byte2Hex(byte[] bytes) {
		StringBuffer stringBuffer = new StringBuffer();
		String temp = null;
		for (int i = 0; i < bytes.length; i++) {
			temp = Integer.toHexString(bytes[i] & 0xFF);
			if (temp.length() == 1) {
				stringBuffer.append("0");
			}
			stringBuffer.append(temp);
		}
		return stringBuffer.toString();
	}
    private static final SecretKey getSecretKeyFactory() throws Exception {
        SecretKeyFactory des = SecretKeyFactory.getInstance(DES);
        SecretKey secretKey = des.generateSecret(new DESKeySpec(SECRET_KEY.getBytes()));
        return secretKey;
    }
    private static final String encryption(String param) throws Exception {
        Cipher cipher = Cipher.getInstance(DES);
        SecretKey secretKey = getSecretKeyFactory();
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        return  new String(Base64.getEncoder().encode(cipher.doFinal(param.toString().getBytes())));
    }
	
    public static void main( String[] args )
    {
        //System.out.println(getSha256ByTimes("123456", 2));
        try {
        	System.out.println(generateLicense("1e84cfb6480577a5487897fe862bf9d2a8936ef42822e6ec0668b311d232daf7", "2022-01-30 12:00:00",200000));
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		}
        
    }
    
    public static String generateLicense(String mac,String endTime)
    {
    	return generateLicense(mac, endTime,100000);
    }
    public static String generateLicense(String mac,String endTime,int size)
    {
    	String kk = "";
    	String macs = getSha256ByTimes(mac, 4);
    	System.out.println(macs);
    	SECRET_KEY = macs;
    	try {
    		kk = encryption(macs + "ecslicense" + strToDate(endTime).getTime()+ "ecslicense" + size);
    		//System.out.println(License2.class.getClassLoader().getResource("conf"));
    		//System.out.println(new File("").getAbsoluteFile());
    		File file = new File(new File("").getAbsoluteFile() + "/conf/ecs.lic");
    		FileOutputStream fos = new FileOutputStream(file);
    		fos.write(kk.getBytes("UTF-8"));
    		fos.flush();
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		}
    	return kk;
    }
    
    public static String generateLicense(String mac,String endTime,int size,String filePath)
    {
    	String kk = "";
    	String macs = getSha256ByTimes(mac, 4);
    	System.out.println(macs);
    	SECRET_KEY = macs;
    	FileOutputStream fos= null;
    	try {
    		kk = encryption(macs + "ecslicense" + strToDate(endTime).getTime()+ "ecslicense" + size);
    		//System.out.println(License2.class.getClassLoader().getResource("conf"));
    		//System.out.println(new File("").getAbsoluteFile());
    		File file = new File(filePath+ "/ecs.lic");
    		fos = new FileOutputStream(file);
    		fos.write(kk.getBytes("UTF-8"));
    		fos.flush();
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		}finally
    	{
			PUtils.closeQuietly(fos);
    	}
    	return kk;
    }
    
    
    public static String generateLicense(String mac,Date endTime,int size)
    {
    	String kk = "";
    	String macs = getSha256ByTimes(mac, 4);
    	System.out.println(macs);
    	SECRET_KEY = macs;
    	try {
    		kk = encryption(macs + "ecslicense" + endTime.getTime()+ "ecslicense" + size);
    		//System.out.println(License2.class.getClassLoader().getResource("conf"));
    		//System.out.println(new File("").getAbsoluteFile());
    		File file = new File(new File("").getAbsoluteFile() + "/conf/ecs.lic");
    		FileOutputStream fos = new FileOutputStream(file);
    		fos.write(kk.getBytes("UTF-8"));
    		fos.flush();
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		}
    	return kk;
    }
    
	public static Date strToDate(String date) {
		Date time = null;
		if (StringUtils.isEmpty(date)) {
			LOG.info("date is null ");
		} else {
			SimpleDateFormat sdf = new SimpleDateFormat(DATETIME_FORMAT);
			try {
				time = sdf.parse(date);
			} catch (Exception e) {
				LOG.error("parse time exception ", e);
			}
		}
		return time;
	} 
}
