public class Screenshot {/*

	public static BASE64Encoder encoder = new BASE64Encoder();

	*//**
	 * 截图
	 * 
	 * @param filePath
	 *            截图保存文件夹路径
	 * @param fileName
	 *            截图文件名称
	 * @throws Exception
	 *//*
	public static void captureScreen(String filePath, String fileName) throws Exception {
		Long l = System.currentTimeMillis();
		Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
		Rectangle screenRectangle = new Rectangle(screenSize);
		Robot robot = new Robot();
		BufferedImage image = robot.createScreenCapture(screenRectangle);
		// 截图保存的路径
		File screenFile = new File(filePath + fileName);
		// 如果文件夹路径不存在，则创建
		if (!screenFile.getParentFile().exists()) {
			screenFile.getParentFile().mkdirs();
		}

		// 指定屏幕区域，参数为截图左上角坐标(100,100)+右下角坐标(500,500)
		BufferedImage subimage = image.getSubimage(0, 0, 1920, 1080);
		// ImageIO.write(subimage, "png", screenFile);
		
		// 对字节数组Base64编码
				BASE64Encoder encoder = new BASE64Encoder();
				

		String strImg = encoder.encode(imageToBytes(subimage,"png"));
		// System.out.println(1111);
		System.out.println(System.currentTimeMillis() - l);

	}

	public static void main(String[] args) throws Exception {
		for (int i = 0; i < 100; i++) {
			Date now = new Date();
			SimpleDateFormat sdfPath = new SimpleDateFormat("yyyyMMdd");
			SimpleDateFormat sdfName = new SimpleDateFormat("yyyyMMddHHmmss");
			String path = sdfPath.format(now);
			String name = sdfName.format(now);
			captureScreen("D:" + File.separator + path + File.separator, name + ".png");
			//Thread.sleep(100);
		}
	}

	// 图片转化成base64字符串
	public static String ImageToBase64(String fileName) {
		// 将图片文件转化为字节数组字符串，并对其进行Base64编码处理
		// String imgFile = "D:\\20190904\\20190904100308.png";//待处理的图片
		InputStream in = null;
		byte[] data = null;
		// 读取图片字节数组
		try {
			in = new FileInputStream(fileName);
			data = new byte[in.available()];
			in.read(data);
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		// 对字节数组Base64编码
		BASE64Encoder encoder = new BASE64Encoder();
		// 返回Base64编码过的字节数组字符串
		return encoder.encode(data);
	}

	// base64字符串转化成图片
	public static boolean Base64ToImage(String imgStr) {
		// 对字节数组字符串进行Base64解码并生成图片
		if (imgStr == null) // 图像数据为空
			return false;
		BASE64Decoder decoder = new BASE64Decoder();
		try {
			// Base64解码
			byte[] b = decoder.decodeBuffer(imgStr);
			for (int i = 0; i < b.length; ++i) {
				if (b[i] < 0) {// 调整异常数据
					b[i] += 256;
				}
			}
			// 生成png图片
			String imgFilePath = "E:\\photo\\new_timg.png";// 新生成的图片
			OutputStream out = new FileOutputStream(imgFilePath);
			out.write(b);
			out.flush();
			out.close();
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	*//**
	 * 转换BufferedImage 数据为byte数组
	 * 
	 * @param image
	 *            Image对象
	 * @param format
	 *            image格式字符串.如"gif","png"
	 * @return byte数组
	 *//*
	public static byte[] imageToBytes(BufferedImage bImage, String format) {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		try {
			ImageIO.write(bImage, format, out);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return out.toByteArray();
	}

	*//**
	 * 转换byte数组为Image
	 * 
	 * @param bytes
	 * @return Image
	 *//*
	public static Image bytesToImage(byte[] bytes) {
		Image image = Toolkit.getDefaultToolkit().createImage(bytes);
		try {
			MediaTracker mt = new MediaTracker(new Label());
			mt.addImage(image, 0);
			mt.waitForAll();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		return image;
	}
*/}