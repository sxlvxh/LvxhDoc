package utils;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.Closeable;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Random;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import javax.imageio.ImageIO;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

public class PUtils {

	/**
	 * 初始化日志类
	 */
	private static final Logger LOG = Logger.getLogger(PUtils.class);

	/**
	 * .日期格式
	 */
	public static final String DATE_FORMAT = "yyyy-MM-dd";

	/**
	 * .日期时间格式
	 */
	public static final String DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

	/**
	 * .线程池
	 */

	private static final ExecutorService EXECUTOR_SERVICE = Executors.newCachedThreadPool();

	/**
	 * FF
	 */
	private static final int FF = 0xff;

	/**
	 * 迭代次数
	 */
	private static final int ITERATOR_COUNT = 1;

	/**
	 * .日期格式
	 */
	private static final int MILLISENCOND_OF_MINUTE = 60 * 1000;

	/**
	 * MIN
	 */
	private static final int MIN = 16;

	/**
	 * 随机数
	 */
	public static final Random RANDOM = new Random();

	/**
	 * 盐值长度
	 */
	private static final int SALT_LENGTH = 16;

	/**
	 * 迭代次数
	 */
	private static final String UTF8 = "UTF-8";

	// 使用到Algerian字体，系统里没有的话需要安装字体，字体只显示大写，去掉了1,0,i,o几个容易混淆的字符
	public static final String VERIFY_CODES = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

	/**
	 * . Returns a string instance the contents of the array object,
	 * 
	 * @param obj
	 *            Object
	 * @return String
	 */
	private static StringBuilder arrayToString(Object obj, int depth) {
		StringBuilder builder = new StringBuilder();
		int length = Array.getLength(obj);
		if (length > 0) {
			for (int j = 0; j < length; j++) {
				builder.append(typeToString("Array[" + j + "]: ", Array.get(obj, j), depth - 1));
			}
		} else {
			builder.append("Array[]: empty\n");
		}
		return builder;
	}

	/**
	 * 转16位编码
	 * 
	 * @param bytes
	 *            编码类型
	 * @return 相应的编码字符串
	 */
	private static String byteArrayToHexString(byte[] bytes) {
		StringBuffer hexValue = new StringBuffer();
		for (int i = 0; i < bytes.length; i++) {
			int val = ((int) bytes[i]) & FF;
			if (val < MIN) {
				hexValue.append("0");
			}
			hexValue.append(Integer.toHexString(val));
		}
		return hexValue.toString();
	}

	/**
	 * . Method processFields
	 * 
	 * @param name
	 *            name
	 * @return 是否合法
	 */
	private static boolean checkFieldNameOK(String name) {
		if ("__discriminator".equals(name) || "__uninitialized".equals(name)) {
			return false;
		}
		return true;
	}

	/**
	 * . 日期拷贝
	 * 
	 * @param date
	 *            源日期对象
	 * @return 拷贝后的日期对象
	 */
	public static Date clone(Date date) {
		if (date != null) {
			return (Date) date.clone();
		}
		return null;
	}

	/**
	 * . Returns a string instance the contents of the collection object,
	 * 
	 * @param obj
	 *            Object
	 * @return String
	 */
	private static StringBuilder collectionToString(Collection<?> c, int depth) {
		StringBuilder builder = new StringBuilder();
		int size = c.size();
		if (size > 0) {
			int i = 0;
			for (Object o : c) {
				builder.append(typeToString("Collection[" + i++ + "]: ", o, depth - 1));
			}
		} else {
			builder.append("Collection[]: empty\n");
		}
		return builder;
	}

	/**
	 * . Returns a string holding the contents of the passed object,
	 * 
	 * @param scope
	 *            String
	 * @param parentObject
	 *            Object
	 * @return String
	 */
	private static StringBuilder complexTypeToString(String scope, Object parentObject, int depth) {
		StringBuilder buffer = new StringBuilder("");
		try {
			//
			// Ok, now we need to reflect into the object and add its child
			// nodes...
			//

			Class<?> cl = parentObject.getClass();
			while (cl != Object.class) {

				processFields(cl.getDeclaredFields(), scope, parentObject, buffer, depth);

				cl = cl.getSuperclass();
			}
		} catch (IllegalAccessException iae) {
			buffer.append(iae.toString());
		}
		return buffer;
	}

	public static String conversionFileSuffix(String fileName, String suffix) {
		String fName = "";
		if (fileName.contains(".")) {
			String name = fileName.substring(0, fileName.lastIndexOf("."));
			fName = name + "." + suffix;
		} else {
			fName = fileName;
		}
		return fName;
	}

	/**
	 * 加密密码
	 * 
	 * @param salt
	 *            盐值
	 * 
	 * @param password
	 *            密码
	 * 
	 * @return 加密后密码
	 */
	public static String createPassword(String salt, String password) {
		return sha256Digest(salt + password);
	}

	public static String dateTimeToStr(Date date) {
		return dateToStr(date, DATETIME_FORMAT);
	}

	/**
	 * 时间类型转字符串
	 * 
	 * @param date
	 *            Date
	 * 
	 * @return String
	 */
	public static String dateToStr(Date date) {
		return dateToStr(date, DATE_FORMAT);
	}

	/**
	 * 时间类型转字符串
	 * 
	 * @param date
	 *            Date
	 * 
	 * @param format
	 *            格式
	 * 
	 * @return String
	 */
	public static String dateToStr(Date date, String format) {

		if (date == null) {
			return "";
		} else {
			SimpleDateFormat sdf = new SimpleDateFormat(format);
			return sdf.format(date);
		}
	}

	/**
	 * 解码
	 * 
	 * @param str
	 * @return
	 */
	public static String decodeBase64(String str) {
		try {
			return new String(Base64.decodeBase64(str), "UTF-8");
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		return "";
	}

	/**
	 * 将摘要信息转换为相应的编码
	 * 
	 * @param code
	 *            编码类型
	 * @param message
	 *            摘要信息
	 * @return 相应的编码字符串
	 */
	private static String digest(String code, String message) {
		return digest(code, message, ITERATOR_COUNT);
	}

	/**
	 * 将摘要信息转换为相应的编码
	 * 
	 * @param code
	 *            编码类型
	 * @param message
	 *            摘要信息
	 * @param count
	 *            迭代次数
	 * @return 相应的编码字符串
	 */
	private static String digest(String code, String message, int count) {
		MessageDigest md;
		String result = null;
		try {
			md = MessageDigest.getInstance(code);
			byte[] bytes = message.getBytes(UTF8);
			for (int i = 0; i < count; i++) {
				bytes = md.digest(bytes);
			}
			result = byteArrayToHexString(bytes);
		} catch (NoSuchAlgorithmException e) {
			LOG.error("digest {} by {} error.", e);
		} catch (UnsupportedEncodingException e) {
			LOG.error("digest {} by {} error.", e);
			return message;
		}
		LOG.debug("digest result = {}." + result);
		return result;
	}


	/**
	 * 编码
	 * 
	 * @param str
	 * @return
	 */
	public static String encodeBase64(String str) {
		try {
			return new String(Base64.encodeBase64(str.getBytes("UTF-8")), "UTF-8");
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		return "";
	}

	/**
	 * 文件是否存在
	 * 
	 * @param filePath
	 *            文件路径
	 * @return 是否存在
	 */
	public static boolean fileExists(String filePath) {
		File file = new File(filePath);
		if (file.isFile() && file.exists()) {
			return true;
		}
		return false;
	}

	/**
	 * 目录是否存在
	 * 
	 * @param folder
	 *            文件夹路径
	 * @return 是否存在
	 */
	public static boolean folderExists(File folder) {
		if (!folder.isDirectory() || !folder.exists()) {
			return false;
		}
		return true;
	}

	/**
	 * 使用系统默认字符源生成验证码
	 * 
	 * @param verifySize
	 *            验证码长度
	 * @return
	 */
	public static String generateVerifyCode(int verifySize) {
		return generateVerifyCode(verifySize, VERIFY_CODES);
	}

	/**
	 * 使用指定源生成验证码
	 * 
	 * @param verifySize
	 *            验证码长度
	 * @param sources
	 *            验证码字符源
	 * @return
	 */
	public static String generateVerifyCode(int verifySize, String sources) {
		if (sources == null || sources.length() == 0) {
			sources = VERIFY_CODES;
		}
		int codesLen = sources.length();
		Random rand = new Random(System.currentTimeMillis());
		StringBuilder verifyCode = new StringBuilder(verifySize);
		for (int i = 0; i < verifySize; i++) {
			verifyCode.append(sources.charAt(rand.nextInt(codesLen - 1)));
		}
		return verifyCode.toString();
	}

	/**
	 * 获取所有文件
	 * 
	 * @param folderPath
	 *            文件夹路径
	 * @return 所有文件
	 */
	public static List<String> getAllFiles(String folderPath) {
		List<String> fileNames = new ArrayList<String>();
		File folder = new File(folderPath);
		if (!folderExists(folder)) {
			return fileNames;
		}
		File[] files = folder.listFiles();
		if (files == null || files.length == 0) {
			return fileNames;
		}
		for (File file : files) {
			if (file.isFile()) {
				fileNames.add(file.getName());
			}
		}
		return fileNames;
	}

	/**
	 * 获取所有子目录
	 * 
	 * @param folderPath
	 *            文件夹路径
	 * @return 所有子目录
	 */
	public static List<String> getAllFolders(String folderPath) {
		List<String> fileNames = new ArrayList<String>();
		File folder = new File(folderPath);
		if (!folderExists(folder)) {
			return fileNames;
		}
		File[] files = folder.listFiles();
		if (files == null || files.length == 0) {
			return fileNames;
		}
		for (File file : files) {
			if (file.isDirectory()) {
				fileNames.add(file.getName());
			}
		}
		return fileNames;
	}

	/**
	 * . 获取所有属性
	 * 
	 * @param filePath
	 *            文件路径
	 * 
	 * @return 所有属性
	 */
	public static Properties getAllProperties(String filePath) {
		Properties properties = new Properties();
		InputStream in = null;
		try {
			in = new BufferedInputStream(new FileInputStream(filePath));
			properties.load(in);
		} catch (FileNotFoundException e) {
			LOG.error("GetAllProperties error. File = {}", e);
		} catch (IOException e) {
			LOG.error("GetAllProperties error. File = {}", e);
		} finally {
			IOUtils.closeQuietly(in);
		}
		return properties;
	}

	public static String getDay() {

		return dateToStr(new Date(), "dd");
	}

	public static void getFileList(File file, List<String> list) {
		if (file.isDirectory()) {
			File[] lists = file.listFiles();
			if (list != null) {
				for (File f : lists) {
					getFileList(f, list);
				}

			}
		} else {
			String s = file.getAbsolutePath();
			String url = s.replaceAll("\\\\", "/");
			list.add(url);
		}
	}

	public static String getFileNameToDate(String fileName) {
		String fName = "";
		String time = String.valueOf(System.currentTimeMillis());
		if (!StringUtils.isEmpty(fileName)) {
			if (fileName.contains(".")) {
				String name = fileName.substring(fileName.lastIndexOf("."), fileName.length());
				fName = time + name;
			} else {
				fName = time;
			}
		}
		return fName;
	}

	/**
	 * 转Json字符串
	 * 
	 * @param obj
	 *            对象
	 * @return Json字符串
	 */
	public static String getJson(Object obj) {
		Gson gson = new Gson();
		return gson.toJson(obj);
	}

	/**
	 * 把Json字符串转成特定类型的对象实例;
	 * 
	 * @param the
	 *            type of the desired object
	 * 
	 * @param json
	 *            带转换Json字符串
	 * 
	 * @param classOfT
	 *            classOfT 转换类型
	 * 
	 * @return T 转换后对象实例
	 */
	public static <T> T getJSONObject(String json, Class<T> classOfT) {
		Gson gson = new Gson();
		return gson.fromJson(json, classOfT);
	}

	public static String getMonth() {

		return dateToStr(new Date(), "MM");
	}


	/**
	 * . 获取值
	 * 
	 * @param filePath
	 *            文件路径
	 * 
	 * @param key
	 *            键
	 * 
	 * @return 值
	 */
	public static String getPropertiesValueByKey(String filePath, String key) {
		if (StringUtils.isEmpty(key) || StringUtils.isEmpty(filePath)) {
			return null;
		}
		Properties properties = getAllProperties(filePath);
		String value = properties.getProperty(key);
		return value;
	}

	public static void getQRCode(String url, OutputStream os) {
		int width = 200;
		int height = 200;
		String format = "png";
		Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();
		hints.put(EncodeHintType.CHARACTER_SET, "utf-8");
		hints.put(EncodeHintType.MARGIN, 1);
		try {
			BitMatrix bitMatrix = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, width, height, hints);
			MatrixToImageWriter.writeToStream(bitMatrix, format, os);
		} catch (WriterException e) {
			LOG.error(e.getMessage(), e);
		} catch (IOException e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private static Color getRandColor(int fc, int bc) {
		if (fc > 255)
			fc = 255;
		if (bc > 255)
			bc = 255;
		int r = fc + RANDOM.nextInt(bc - fc);
		int g = fc + RANDOM.nextInt(bc - fc);
		int b = fc + RANDOM.nextInt(bc - fc);
		return new Color(r, g, b);
	}

	private static int getRandomIntColor() {
		int[] rgb = getRandomRgb();
		int color = 0;
		for (int c : rgb) {
			color = color << 8;
			color = color | c;
		}
		return color;
	}

	private static int[] getRandomRgb() {
		int[] rgb = new int[3];
		for (int i = 0; i < 3; i++) {
			rgb[i] = RANDOM.nextInt(255);
		}
		return rgb;
	}

	/**
	 * 获取盐值
	 * 
	 * @return 盐值
	 */
	public static String getRandomSalt() {
		return RandomStringUtils.randomAlphabetic(SALT_LENGTH);
	}



	/**
	 * 时间类型转字符串
	 * 
	 * @return String
	 */
	public static String getToday() {

		return dateToStr(new Date());
	}

	public static String getTodayTime() {

		return dateTimeToStr(new Date());
	}

	public static String getYear() {

		return dateToStr(new Date(), "yyyy");
	}

	/**
	 * . Method toString() exists
	 * 
	 * @param obj
	 *            Object
	 * @return boolean
	 */
	public static boolean hasToString(Object obj) {
		try {
			obj.getClass().getDeclaredMethod("toString");
			return true;
		} catch (NoSuchMethodException e) {
			return false;
		}
	}

	/**
	 * . Method isCollectionType
	 * 
	 * @param obj
	 *            Object
	 * @return boolean
	 */
	public static boolean isCollectionType(Object obj) {

		return obj.getClass().isArray() || obj instanceof Collection || obj instanceof Set;
	}

	/**
	 * . Method isComplexType
	 * 
	 * @param obj
	 *            Object
	 * @return boolean
	 */
	public static boolean isComplexType(Object obj) {
		return obj instanceof Boolean || obj instanceof Number || obj instanceof Character || obj instanceof String;
	}

	/**
	 * . Method processFields
	 * 
	 * @param fields
	 *            Field[]
	 * @param parentObject
	 *            Object
	 * @throws IllegalAccessException
	 *             Exception
	 */
	private static boolean isPasswordFields(Field[] fields, Object parentObject) throws IllegalAccessException {
		for (int i = 0; i < fields.length; i++) {
			if ("name".equals(fields[i].getName())) {
				fields[i].setAccessible(true);
				if (fields[i].get(parentObject) == null) {
					return false;
				}
				String name = fields[i].get(parentObject).toString();
				if (StringUtils.isNotEmpty(name) && name.contains("password")) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * . Returns a string instance the contents of the map object,
	 * 
	 * @param obj
	 *            Object
	 * @return String
	 */
	private static StringBuilder mapToString(Object obj, int depth) {
		StringBuilder builder = new StringBuilder();
		if (((Map<?, ?>) obj).isEmpty()) {
			builder.append("Map[]: empty\n");
		} else {
			for (Entry<?, ?> e : ((Map<?, ?>) obj).entrySet()) {
				builder.append(typeToString("Map[" + e.getKey() + "]: ", e.getValue(), depth - 1));
			}
		}
		return builder;
	}

	/**
	 * 将摘要信息转换成MD5编码
	 * 
	 * @param message
	 *            摘要信息
	 * @return MD5编码之后的字符串
	 */
	public static String md5Digest(String message) {
		return digest("MD5", message);
	}

	/**
	 * 生成指定验证码图像文件
	 * 
	 * @param w
	 * @param h
	 * @param outputFile
	 * @param code
	 * @throws IOException
	 */
	public static void outputImage(int w, int h, File outputFile, String code) throws IOException {
		if (outputFile == null) {
			return;
		}
		File dir = outputFile.getParentFile();
		if (!dir.exists()) {
			dir.mkdirs();
		}
		try {
			outputFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(outputFile);
			outputImage(w, h, fos, code);
			fos.close();
		} catch (IOException e) {
			throw e;
		}
	}

	/**
	 * 输出指定验证码图片流
	 * 
	 * @param w
	 * @param h
	 * @param os
	 * @param code
	 * @throws IOException
	 */
	public static void outputImage(int w, int h, OutputStream os, String code) throws IOException {
		int verifySize = code.length();
		BufferedImage image = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);
		Random rand = new Random();
		Graphics2D g2 = image.createGraphics();
		g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		Color[] colors = new Color[5];
		Color[] colorSpaces = new Color[] { Color.WHITE, Color.CYAN, Color.GRAY, Color.LIGHT_GRAY, Color.MAGENTA,
				Color.ORANGE, Color.PINK, Color.YELLOW };
		float[] fractions = new float[colors.length];
		for (int i = 0; i < colors.length; i++) {
			colors[i] = colorSpaces[rand.nextInt(colorSpaces.length)];
			fractions[i] = rand.nextFloat();
		}
		Arrays.sort(fractions);

		g2.setColor(Color.GRAY);// 设置边框色
		g2.fillRect(0, 0, w, h);

		Color c = getRandColor(200, 250);
		g2.setColor(c);// 设置背景色
		g2.fillRect(0, 2, w, h - 4);

		// 绘制干扰线
		Random random = new Random();
		g2.setColor(getRandColor(160, 200));// 设置线条的颜色
		for (int i = 0; i < 20; i++) {
			int x = random.nextInt(w - 1);
			int y = random.nextInt(h - 1);
			int xl = random.nextInt(6) + 1;
			int yl = random.nextInt(12) + 1;
			g2.drawLine(x, y, x + xl + 40, y + yl + 20);
		}

		// 添加噪点
		float yawpRate = 0.05f;// 噪声率
		int area = (int) (yawpRate * w * h);
		for (int i = 0; i < area; i++) {
			int x = random.nextInt(w);
			int y = random.nextInt(h);
			int rgb = getRandomIntColor();
			image.setRGB(x, y, rgb);
		}

		shear(g2, w, h, c);// 使图片扭曲

		g2.setColor(getRandColor(100, 160));
		int fontSize = h - 4;
		Font font = new Font("Algerian", Font.ITALIC, fontSize);
		g2.setFont(font);
		char[] chars = code.toCharArray();
		for (int i = 0; i < verifySize; i++) {
			AffineTransform affine = new AffineTransform();
			affine.setToRotation(Math.PI / 4 * rand.nextDouble() * (rand.nextBoolean() ? 1 : -1),
					(w / verifySize) * i + fontSize / 2, h / 2);
			g2.setTransform(affine);
			g2.drawChars(chars, i, 1, ((w - 10) / verifySize) * i + 5, h / 2 + fontSize / 2 - 10);
		}

		g2.dispose();
		ImageIO.write(image, "jpg", os);
	}

	/**
	 * 生成随机验证码文件,并返回验证码值
	 * 
	 * @param w
	 * @param h
	 * @param outputFile
	 * @param verifySize
	 * @return
	 * @throws IOException
	 */
	public static String outputVerifyImage(int w, int h, File outputFile, int verifySize) throws IOException {
		String verifyCode = generateVerifyCode(verifySize);
		outputImage(w, h, outputFile, verifyCode);
		return verifyCode;
	}

	/**
	 * 输出随机验证码图片流,并返回验证码值
	 * 
	 * @param w
	 * @param h
	 * @param os
	 * @param verifySize
	 * @return
	 * @throws IOException
	 */
	public static String outputVerifyImage(int w, int h, OutputStream os, int verifySize) throws IOException {
		String verifyCode = generateVerifyCode(verifySize);
		outputImage(w, h, os, verifyCode);
		return verifyCode;
	}


	// add end
	// added by huangwenhai on 2018-08-17
	@SuppressWarnings("unchecked")
	/**
	 * 
	 * @param url
	 * @param data
	 * @param timeout
	 *            响应等待超时时间，单位：毫秒
	 * @param httpHeaders
	 * @param responseType
	 * @return
	 */
	public static <T> T postJSON(String url, String data, int timeout, Map<String, String> httpHeaders,
			Class<T> responseType) {
		T ret = null;
		String respText = sendPost0(url, data.replaceAll("\\\\u003d", "="), timeout, httpHeaders);
		if (StringUtils.isNotBlank(respText)) {

			Gson gson = new GsonBuilder().setDateFormat(DATETIME_FORMAT).create();
			try {
				if (String.class.equals(responseType)) {
					ret = (T) respText;
				} else {
					ret = gson.fromJson(respText, responseType);
				}
			} catch (JsonSyntaxException e) {
				LOG.error("parsing response", e);
			}
		}

		return ret;
	}

	// added by huangwenhai on 2018-04-11
	@SuppressWarnings("unchecked")
	public static <T> T postJSON(String url, String data, int timeout, String sessionId, Class<T> responseType) {
		T ret = null;
		String respText = sendPost(url, data.replaceAll("\\\\u003d", "="), "application/json", timeout, sessionId);
		if (StringUtils.isNotBlank(respText)) {
			// 2018-04-11 11:37:28
			Gson gson = new GsonBuilder().setDateFormat("yyy-MM-dd hh:mm:ss").create();
			try {
				if (String.class.equals(responseType)) {
					ret = (T) respText;
				} else {
					ret = gson.fromJson(respText, responseType);
				}
			} catch (JsonSyntaxException e) {
				LOG.error("parsing response", e);
			}
		}

		return ret;
	}

	/**
	 * . Method processFields
	 * 
	 * @param fields
	 *            Field[]
	 * @param scope
	 *            String
	 * @param parentObject
	 *            Object
	 * @param buffer
	 *            StringBuilder
	 * @throws IllegalAccessException
	 *             Exception
	 */
	private static void processFields(Field[] fields, String scope, Object parentObject, StringBuilder buffer,
			int depth) throws IllegalAccessException {
		boolean isPassword = isPasswordFields(fields, parentObject);
		for (int i = 0; i < fields.length; i++) {
			String fieldName = fields[i].getName();
			if (!checkFieldNameOK(fieldName)) {
				continue;
			}
			fields[i].setAccessible(true);
			if (!Modifier.isStatic(fields[i].getModifiers())) {
				if (isPassword && "value".equals(fieldName) || fieldName.contains("password")) {
					buffer.append(typeToString(scope + "." + fieldName, "******", depth - 1));
				} else {
					buffer.append(typeToString(scope + "." + fieldName, fields[i].get(parentObject), depth - 1));
				}
			}
		}
	}


	/**
	 * .以FORM方式(application/x-www-form-urlencoded)发送HTTP请求，并返回相应消息
	 * 
	 * @param url
	 *            请求URL
	 * @param data
	 *            请求数据
	 * @return 请求相应
	 */
	public static String sendFormPost(String url, String data, int timeout, String sessionId) {
		return sendPost(url, data.replaceAll("\\\\u003d", "="), "application/x-www-form-urlencoded", timeout,
				sessionId);
	}

	/**
	 * .以JSON方式(application/json)发送HTTP请求，并返回相应消息
	 * 
	 * @param url
	 *            请求URL
	 * @param data
	 *            请求数据
	 * @return 请求相应
	 */
	public static String sendJSONPost(String url, String data, int timeout, String sessionId) {
		return sendPost(url, data.replaceAll("\\\\u003d", "="), "application/json", timeout, sessionId);
	}

	/**
	 * .以JSON方式(application/json)发送HTTP请求，并实时返回相应消息
	 * 
	 * @param url
	 *            请求URL
	 * @param data
	 *            请求数据
	 * @return 请求相应
	 */
	public static String sendJSONPostImmediate(String url, String data, String sessionId) {
		return sendPost(url, data.replaceAll("\\\\u003d", "="), "application/json", 1000, sessionId);
	}

	/**
	 * .发送HTTP请求，并返回相应消息
	 * 
	 * @param url
	 *            请求URL
	 * @param data
	 *            请求数据
	 * @param contentType
	 *            请求类型
	 * @param timeout
	 *            请求超时设置
	 * @return 请求相应
	 */
	// modified by huangwenhai on 2018-08-17
	/*
	 * private static String sendPost(String url, String data, String contentType,
	 * int timeout,String sessionId) { //modified by huangwenhai on 2017-08-03
	 * 添加日志，并在调用失败时抛出异常，以通知上层代码 if (LOG.isDebugEnabled()) { LOG.debug(String.
	 * format("HTTP invoke:url=%s,requestBody=%s,contentType=%s,timeOut=%d,sessionId=%s"
	 * , url, data, contentType, timeout, sessionId)); } StringBuffer sbf = new
	 * StringBuffer(); HttpURLConnection connection = null; try { connection =
	 * (HttpURLConnection) new URL(url).openConnection();
	 * connection.setDoInput(true); connection.setDoOutput(true);
	 * connection.setRequestMethod("POST"); if(!StringUtils.isEmpty(sessionId)) {
	 * connection.setRequestProperty("Cookie", sessionId); }
	 * connection.setConnectTimeout(timeout); connection.setReadTimeout(timeout);
	 * connection.setUseCaches(false); connection.setInstanceFollowRedirects(true);
	 * connection.setRequestProperty("Content-Type", contentType); // added by
	 * huangwenhai on 2018-03-22 城管项目：统一在总队创建用户账户
	 * connection.setRequestProperty("X-Requested-With", "hyecs"); // add end
	 * connection.connect();
	 * 
	 * IOUtils.write(data, connection.getOutputStream(), StandardCharsets.UTF_8);
	 * 
	 * for(String line : IOUtils.readLines(connection.getInputStream(),
	 * StandardCharsets.UTF_8)) { sbf.append(line); } }catch (Exception e) {
	 * LOG.error("Failed to invoke:" + url, e); // throw new
	 * RuntimeException("Failed to invoke:" + url, e); // modification end }
	 * finally{ if (connection != null){ connection.disconnect(); } } //modified by
	 * huangwenhai on 2018-04-13 // return sbf.toString(); String ret =
	 * sbf.toString(); if (LOG.isDebugEnabled()) {
	 * LOG.debug(String.format("response text:%s", ret)); } return ret;
	 * //modification end }
	 */
	private static String sendPost(String url, String data, String contentType, int timeout, String sessionId) {
		Map<String, String> httpHeaders = null;
		if (!"application/json".equals(contentType) || StringUtils.isNotBlank(sessionId)) {
			httpHeaders = new HashMap<>();
			httpHeaders.put("Content-Type", contentType);
			httpHeaders.put("Cookie", sessionId);
		}
		String ret = sendPost0(url, data, timeout, httpHeaders);
		return ret;
	}

	protected static String sendPost0(String url, String data, int timeout, Map<String, String> httpHeaders) {

		String contentType = "application/json";
		if (null != httpHeaders) {
			String ct = httpHeaders.get("Content-Type");
			if (StringUtils.isNotBlank(ct)) {
				contentType = ct;
			}
		}
		if (LOG.isDebugEnabled()) {
			LOG.debug(String.format("HTTP invoke:url=%s,requestBody=%s,contentType=%s,timeOut=%d,httpHeaders=%s", url,
					data, contentType, timeout, httpHeaders));
		}
		String resp = null;
		HttpURLConnection connection = null;
		try {
			connection = (HttpURLConnection) new URL(url).openConnection();
			connection.setDoInput(true);
			connection.setDoOutput(true);
			connection.setRequestMethod("POST");

			if (null != httpHeaders) {
				for (Map.Entry<String, String> httpHeaderEntry : httpHeaders.entrySet()) {
					connection.setRequestProperty(httpHeaderEntry.getKey(), httpHeaderEntry.getValue());
				}
			}
			connection.setConnectTimeout(timeout);
			connection.setReadTimeout(timeout);
			connection.setUseCaches(false);
			connection.setInstanceFollowRedirects(true);
			connection.setRequestProperty("Content-Type", contentType);
			connection.connect();

			IOUtils.write(data, connection.getOutputStream(), StandardCharsets.UTF_8);
			List<String> lines = IOUtils.readLines(connection.getInputStream(), StandardCharsets.UTF_8);
			resp = StringUtils.join(lines, "\r\n");
		} catch (Exception e) {
			LOG.error("Failed to invoke:" + url, e);
		} finally {
			if (connection != null) {
				connection.disconnect();
			}
		}

		if (LOG.isDebugEnabled()) {
			LOG.debug(String.format("response text:%s", resp));
		}
		return resp;
	}
	

	/**
	 * 将摘要信息转换成SHA-256编码
	 * 
	 * @param message
	 *            摘要信息
	 * @return SHA-256编码之后的字符串
	 */
	public static String sha256Digest(String message) {
		return digest("SHA-256", message);
	}

	/**
	 * 将摘要信息转换成SHA-512编码
	 * 
	 * @param message
	 *            摘要信息
	 * @return SHA-512编码之后的字符串
	 */
	public static String sha512Digest(String message) {
		return digest("SHA-512", message);
	}

	/**
	 * 将摘要信息转换成SHA编码
	 * 
	 * @param message
	 *            摘要信息
	 * @return SHA编码之后的字符串
	 */
	public static String shaDigest(String message) {
		return digest("SHA", message);
	}

	private static void shear(Graphics g, int w1, int h1, Color color) {
		shearX(g, w1, h1, color);
		shearY(g, w1, h1, color);
	}

	private static void shearX(Graphics g, int w1, int h1, Color color) {

		int period = RANDOM.nextInt(2);

		boolean borderGap = true;
		int frames = 1;
		int phase = RANDOM.nextInt(2);

		for (int i = 0; i < h1; i++) {
			double d = (double) (period >> 1)
					* Math.sin((double) i / (double) period + (6.2831853071795862D * (double) phase) / (double) frames);
			g.copyArea(0, i, w1, 1, (int) d, 0);
			if (borderGap) {
				g.setColor(color);
				g.drawLine((int) d, i, 0, i);
				g.drawLine((int) d + w1, i, w1, i);
			}
		}

	}

	private static void shearY(Graphics g, int w1, int h1, Color color) {

		int period = RANDOM.nextInt(40) + 10; // 50;

		boolean borderGap = true;
		int frames = 20;
		int phase = 7;
		for (int i = 0; i < w1; i++) {
			double d = (double) (period >> 1)
					* Math.sin((double) i / (double) period + (6.2831853071795862D * (double) phase) / (double) frames);
			g.copyArea(i, 0, 1, h1, 0, (int) d);
			if (borderGap) {
				g.setColor(color);
				g.drawLine(i, (int) d, i, 0);
				g.drawLine(i, (int) d + h1, i, h1);
			}

		}

	}

	/**
	 * 时间字符串转换为日期
	 * 
	 * @param date
	 *            String 需要转换的字符串
	 * @param format
	 *            转换格式
	 * @return Date 返回日期
	 */
	public static Date strToDate(String date, String format) {
		Date time = null;
		if (StringUtils.isEmpty(date)) {
			LOG.info("date is null ");
		} else {
			SimpleDateFormat sdf = new SimpleDateFormat(format);
			try {
				time = sdf.parse(date);
			} catch (ParseException e) {
				LOG.error("parse time exception ", e);
			}
		}
		return time;
	}

	/**
	 * 功能描述：时间相减得到分钟数
	 * 
	 * @param beginDate
	 *            beginDate
	 * @param endDate
	 *            endDate
	 * @return long
	 */
	public static long subMinutes(Date beginDate, Date endDate) {
		return (endDate.getTime() - beginDate.getTime()) / MILLISENCOND_OF_MINUTE;
	}

	/**
	 * @param task
	 * @return
	 * @see java.util.concurrent.ExecutorService#submit(java.util.concurrent.Callable)
	 */
	public static <T> Future<T> submit(Callable<T> task) {
		return EXECUTOR_SERVICE.submit(task);
	}

	/**
	 * @param task
	 * @return
	 * @see java.util.concurrent.ExecutorService#submit(java.lang.Runnable)
	 */
	public static Future<?> submit(Runnable task) {
		return EXECUTOR_SERVICE.submit(task);
	}

	/**
	 * .批量提交任务
	 * 
	 * @param task
	 *            任务
	 * @param count
	 *            数量
	 * @param isDaemon
	 *            是否以精灵线程启动
	 * @return {@link java.util.concurrent.Future} 列表
	 */
	public static List<Future<?>> submit(Runnable task, int count, boolean isDaemon) {
		/*
		 * modified by huangwenhai on 2018-08-23 性能优化 减少系统的总线程数量。
		 * 服务端程序一般无需特别的使用守护线程。尤其是线程中要执行I/O操作时更不适合使用守护线程。
		 * 
		 */
		// CustomizableThreadFactory factory = new CustomizableThreadFactory();
		// factory.setDaemon(isDaemon);
		//
		// ExecutorService service = Executors.newCachedThreadPool(factory);
		final ExecutorService service = EXECUTOR_SERVICE;
		// modification end
		List<Future<?>> futures = new ArrayList<Future<?>>();
		for (int i = 0; i < count; i++) {
			futures.add(service.submit(task));
		}
		return futures;
	}

	/**
	 * The typeToString() method is used to dump the contents of a passed object of
	 * any type (or collection) to a String. This can be very useful for debugging
	 * code that manipulates complex structures.
	 * 
	 * @param obj
	 *            对象
	 * @return String
	 */
	public static String toString(Object obj) {
		return typeToString("", obj, 2).toString();
	}

	/**
	 * . Returns a string instance the contents of the object,
	 * 
	 * @param obj
	 *            Object
	 * @return String
	 */
	private static StringBuilder typeToString(String scope, Object obj, int depth) {
		StringBuilder builder = new StringBuilder();
		if (depth == 0) {
			builder.append(scope).append(String.valueOf(obj)).append("    ");
		} else if (obj == null) {
			builder.append(scope).append("null").append("    ");
		} else if (obj.getClass().isArray()) {
			// 数组类型
			builder.append(arrayToString(obj, depth));
		} else if (obj instanceof Collection) {
			// Collection类型
			builder.append(collectionToString((Collection<?>) obj, depth));
		} else if (obj instanceof Map) {
			// Map类型
			builder.append(mapToString((Map<?, ?>) obj, depth));
		} else if (isComplexType(obj) && !hasToString(obj)) {
			// 其他复杂对象类型
			return complexTypeToString("Object", obj, depth);
		} else {
			// 简单对象类型
			builder.append(scope).append(obj.toString()).append("    ");
		}
		return builder;
	}

	/**
	 * 校验密码
	 * 
	 * @param salt
	 *            盐值
	 * 
	 * @param password
	 *            密码
	 * 
	 * @param result
	 *            加密后密码
	 * 
	 * @return 结果
	 */
	public static boolean verifyPassword(String salt, String password, String result) {
		if (StringUtils.isEmpty(result)) {
			return false;
		}
		return result.equals(sha256Digest(password));
	}

	/**
	 * . 写入属性
	 * 
	 * @param filePath
	 *            文件路径
	 * 
	 * @param key
	 *            键
	 * 
	 * @param value
	 *            值
	 * 
	 * @return
	 */
	public static void writeProperties(String filePath, String key, String value) throws IOException {
		Properties pps = new Properties();
		InputStream in = null;
		OutputStream out = null;
		try {
			in = new FileInputStream(filePath);
			// 从输入流中读取属性列表（键和元素对）
			pps.load(in);
			// 调用 Hashtable 的方法 put。使用 getProperty 方法提供并行性。
			// 强制要求为属性的键和值使用字符串。返回值是 Hashtable 调用 put 的结果。
			out = new FileOutputStream(filePath);
			pps.setProperty(key, value);
			// 以适合使用 load 方法加载到 Properties 表中的格式，
			// 将此 Properties 表中的属性列表（键和元素对）写入输出流
			pps.store(out, "Update " + key + " name");
		} catch (Exception e) {
			LOG.error("Write property error. File = {}, key = {}, value = {}", e);
		} finally {
			IOUtils.closeQuietly(in);
			IOUtils.closeQuietly(out);
		}
	}

	public static String randomHexStr(int len) {
		try {
			StringBuffer result = new StringBuffer();
			for (int i = 0; i < len; i++) {
				// 随机生成0-15的数值并转换成16进制
				result.append(Integer.toHexString(new Random().nextInt(16)));
			}
			return result.toString().toUpperCase();
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			return "00CCCC";
		}
	}

	/**
	 * 保留一位小数，不进行四舍五入
	 * 
	 * @param d
	 * @return
	 */
	public static Double saveOneBitOne(Double d) {
		BigDecimal bd = new BigDecimal(d);
		Double tem = bd.setScale(1, BigDecimal.ROUND_FLOOR).doubleValue();
		return tem;
	}

	/**
	 * 保留两位小数,不进行四舍五入
	 * 
	 * @param d
	 * @return
	 */
	public static Double saveOneBitTwo(Double d) {
		BigDecimal bd = new BigDecimal(d);
		Double tem = bd.setScale(2, BigDecimal.ROUND_FLOOR).doubleValue();
		return tem;
	}

	/**
	 * 保留两位小数,进行四舍五入
	 * 
	 * @param d
	 * @return
	 */
	public static Double saveOneBitTwoRound(Double d) {
		BigDecimal bd = new BigDecimal(d);
		Double tem = bd.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
		return tem;
	}

	/**
	 * 保留一位小数，进行四舍五入（该方法经测试 较为精准）
	 * 
	 * @param d
	 * @return
	 */
	public static Double saveOneBitOneRound(Double d) {
		String str = String.format("%.1f", d);
		double c = Double.parseDouble(str);
		return c;
	}


	public static void main(String[] args) {

		splitTextFile("E:/splitFile/access.log","E:/splitFile",1000);
	}

	/**
	 * 分割text文本文件
	 * @param src 原始文件
	 * @param target 目标路径
	 * @param size 文件行数等于此值时，切换新的文件
	 */
	public static void splitTextFile(String src,String target,int size) {
		FileReader fr = null;
		FileWriter fw = null;
		BufferedReader bf = null;
		try {
			fr = new FileReader(src);
			bf = new BufferedReader(fr);
			fw = new FileWriter(new File(target + "1.log"));
			String str = "";
			// 按行读取字符串
			int i = 0;
			int t = 2;
			while ((str = bf.readLine()) != null) {
				System.out.println(str);
				i++;
				fw.write(str);
				fw.write(System.getProperty("line.separator"));
				fw.flush();
				// fw.close();
				if (i % size == 0) {
					fw = new FileWriter(new File(target +t+++ ".log"));
				}
			}
		} catch (IOException e) {
			LOG.error(e.getMessage(),e);
			e.printStackTrace();
		}finally
		{
			closeQuietly(bf);
			closeQuietly(fw);
			closeQuietly(fr);
		}
	}

	public static void closeQuietly(Closeable closeable) {
		try {
			if (closeable != null) {
				closeable.close();
			}
		} catch (IOException ioe) {
			LOG.error(ioe.getMessage(), ioe);
		}
	}
	public static String getUUID() {
		String uuid = UUID.randomUUID().toString();
		return uuid.replaceAll("-", "");
	}

}
