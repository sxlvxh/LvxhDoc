package com.lvxh.plugin.platform.license;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

/**
 * Hello world!
 *
 */
public final class License {
	private static final Logger LOG = Logger.getLogger(License.class);
	private static final String DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
	private static String DES = "DES";
	private static String SECRET_KEY = "";
	private static String mac = "";
	private static int code = 1;
	private static String desc = "license错误";
	private static int size = 1000;
	private static String tts = "ea599b25b42c0e13621160102d585f9bb869173c9b483c64871019a3a9e68e0a";
    private static String dir = "";
    private static long availableDays = 60;
	static {
		mac = getLocalMac();
		SECRET_KEY = getSha256ByTimes(mac, 5);
		// System.out.println( mac);

		FileOutputStream fos = null;
		try {
			dir = License.class.getClassLoader().getResource("config").getPath();
			//System.out.println(License.class.getClassLoader().getResource("config"));
			File file = new File(dir + "/ecs.key");
			fos = new FileOutputStream(file);
			fos.write(getSha256ByTimes(mac, 1).getBytes("UTF-8"));
			fos.flush();
		} catch (Exception e1) {
			LOG.error(e1.getMessage(), e1);
		} finally {
			if (fos != null) {
				try {
					fos.close();
				} catch (IOException e) {
					LOG.error(e.getMessage(), e);
				}
			}
		}

	}

	private static String getLocalMac() {
		try {
			/*InetAddress ia = InetAddress.getLocalHost();
			byte[] mac = NetworkInterface.getByInetAddress(ia).getHardwareAddress();
			StringBuffer sb = new StringBuffer("");
			for (int i = 0; i < mac.length; i++) {
				if (i != 0) {
					sb.append("-");
				}
				int temp = mac[i] & 0xff;
				String str = Integer.toHexString(temp);
				if (str.length() == 1) {
					sb.append("0" + str);
				} else {
					sb.append(str);
				}
			}*/
			return MacTools.getMacList().get(0);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		return "00-50-56-C0-00-02";
	}

	private static String getSHA256(String str) {
		MessageDigest messageDigest;
		String encodestr = "";
		try {
			messageDigest = MessageDigest.getInstance("SHA-256");
			messageDigest.update(str.getBytes("UTF-8"));
			encodestr = byte2Hex(messageDigest.digest());
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		return encodestr;
	}

	private static String getSha256ByTimes(String str, int times) {
		String strs = str;
		for (int i = 0; i < times; i++) {
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

	private static final String decrypt(String value) throws Exception {
		Cipher cipher = Cipher.getInstance(DES);
		SecretKey secretKey = getSecretKeyFactory();
		cipher.init(Cipher.DECRYPT_MODE, secretKey);
		return new String(cipher.doFinal(Base64.getDecoder().decode(value.getBytes())));
	}

	public static void main(String[] args) {
		try {
			// String line = readLicFile();
			PropertyConfigurator.configure("d:/log4j.properties");

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}

	}

	private static String readLicFile() {
		File file = new File(dir + "/ecs.lic");
		FileReader fis = null;
		BufferedReader br = null;

		String line = "";
		try {
			fis = new FileReader(file);
			br = new BufferedReader(fis);
			line = br.readLine();
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					LOG.error(e.getMessage(), e);
				}
			}
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					LOG.error(e.getMessage(), e);
				}
			}
		}

		return line;
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

	public static String dateToStr(Date date) {

		if (date == null) {
			return "";
		} else {
			SimpleDateFormat sdf = new SimpleDateFormat(DATETIME_FORMAT);
			return sdf.format(date);
		}
	}

	private static void analysisLicense() {
		SECRET_KEY = getSha256ByTimes(mac, 5);
		String lic = readLicFile();
		if (StringUtils.isBlank(lic)) {
			code = 2;
			desc = "license文件不存在！";
			return;
		}
		String key = "";
		try {
			key = decrypt(lic);
		} catch (Exception e1) {
			// LOG.error(e1.getMessage(), e1);
			try {
				SECRET_KEY = tts;
				key = decrypt(lic);
			} catch (Exception e) {
				code = 3;
				desc = "license 验证失败";
				// LOG.error(e.getMessage(), e);
			}
		}

		try {
			if (StringUtils.isNotBlank(key)) {
				try {
					// System.out.println(key);
					code = 0;
					desc = "license is ok！";

					String ss[] = key.split("ecslicense");
					String macKey = ss[0];
					Long timeKey = Long.parseLong(ss[1]);
					int sizeKey = Integer.parseInt(ss[2]);
					availableDays = (timeKey - System.currentTimeMillis())/1000/60/60/24;
					if (timeKey - System.currentTimeMillis() <= 0) {
						code = 4;
						desc = "license 已过期！到期时间" + dateToStr(new Date(timeKey));
						return;
					} else if (sizeKey <= size) {
						code = 5;
						desc = "license 超过用户限制！当前用户：" + size + " 最大允许用户数：" + sizeKey;
						return;
					} else if (tts.equals(macKey)) {
						code = 0;
						desc = "测试用license";
						return;
					} else {
						String macs = getSha256ByTimes(mac, 5);
						if (macs.equals(macKey)) {
							code = 0;
							desc = "当前license正常！";
						} else {
							code = 6;
							desc = "当前license验证失败!";
						}
					}

				} catch (Exception e) {
					code = 3;
					desc = "license 验证失败";
					// LOG.error(e.getMessage(), e);
				}

			} else {
				code = 3;
				desc = "license 验证失败";
			}
		} catch (Exception e) {
			code = 3;
			desc = "license 验证失败";
			// LOG.error(e.getMessage(),e);
		}
	}

	public static int getCode() {
		return code;
	}

	public static String getDesc() {
		return desc;
	}

	public static void setSize(int size) {
		License.size = size;
	}
	public static long getAvailableDays() {
		return availableDays;
	}

	public static void init() {
		new Thread(new Runnable() {
			@Override
			public void run() {
				while (true) {
					analysisLicense();
					LOG.debug(" This License Available days: " + getAvailableDays());
					try {
						Thread.sleep(1000*60*60*12);
					} catch (Exception e) {
						LOG.error(e.getMessage(), e);
					}
				}
			}
		}).start();
	}

}
