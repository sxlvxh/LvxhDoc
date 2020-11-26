package com.lvxh.plugin.platform.utils;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;

public class ImageUtils {

	public static void main(String[] args) throws Exception {
		ImageUtils u = new ImageUtils();
	  u.imageToBase64("D:\\images","D:\\images");
	}

	public void alphaImg(String target, String src) throws IOException {
		BufferedImage image = ImageIO.read(new File(src));
		// 高度和宽度
		int height = image.getHeight();
		int width = image.getWidth();

		// 生产背景透明和内容透明的图片
		ImageIcon imageIcon = new ImageIcon(image);
		BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_4BYTE_ABGR);
		Graphics2D g2D = (Graphics2D) bufferedImage.getGraphics(); // 获取画笔
		g2D.fillRect( 0, 0 , width, height);
		g2D.drawImage(imageIcon.getImage(), 0, 0, null); // 绘制Image的图片，使用了imageIcon.getImage()，目的就是得到image,直接使用image就可以的

		int alpha = 0; // 图片透明度
		// 外层遍历是Y轴的像素
		for (int y = bufferedImage.getMinY(); y < bufferedImage.getHeight(); y++) {
			// 内层遍历是X轴的像素
			for (int x = bufferedImage.getMinX(); x < bufferedImage.getWidth(); x++) {
				int rgb = bufferedImage.getRGB(x, y);
				// 对当前颜色判断是否在指定区间内
				if (colorInRange(rgb)) {
					alpha = 0;
				} else {
					// 设置为不透明
					alpha = 255;
				}
				// #AARRGGBB 最前两位为透明度
				rgb = (alpha << 24) | (rgb & 0x00ffffff);
				bufferedImage.setRGB(x, y, rgb);
			}
		}
		// 绘制设置了RGB的新图片,这一步感觉不用也可以只是透明地方的深浅有变化而已，就像蒙了两层的感觉
		g2D.drawImage(bufferedImage, 0, 0, null);

		// 生成图片为PNG
		ImageIO.write(bufferedImage, "png", new File(target));
	}

	// 判断是背景还是内容
	public boolean colorInRange(int color) {
		int red = (color & 0xff0000) >> 16;// 获取color(RGB)中R位
		int green = (color & 0x00ff00) >> 8;// 获取color(RGB)中G位
		int blue = (color & 0x0000ff);// 获取color(RGB)中B位
		// 通过RGB三分量来判断当前颜色是否在指定的颜色区间内
		if (red >= color_range && green >= color_range && blue >= color_range) {
			return true;
		}
		;
		return false;
	}

	// 色差范围0~255
	public int color_range = 210;
	
	
	/**
     * base64编码转成图片文件
     * 
     * @param base64 图片的base64编码
     * @param filePath 图片文件的保存路径
     *                 
     * @return 
     * @throws Exception
     */
    public String decryptByBase64(String base64, String filePath) throws Exception{
        if (base64 == null && filePath == null) {
            return "生成文件失败，请给出相应的数据。";
        }
        try {
            Files.write(Paths.get(filePath),Base64.decodeBase64(base64), StandardOpenOption.CREATE);
        } catch (IOException e) {
            throw e;
        }
        return "指定路径下生成文件成功！";
    }
    
    public String imageToBase64(String filePath) throws Exception{
        if(StringUtils.isBlank(filePath)){
            return null;
        }
        String encode="";
        try{
            byte[] bytes = Files.readAllBytes(Paths.get(filePath));
            encode = Base64.encodeBase64String(bytes);
            System.out.println(encode);
        }catch (Exception e){
            throw e;
        }
        return encode;
    }
    
    public void imageToBase64(String filePath,String target) throws Exception{
        File fs = new File(filePath);
        File ff[] = fs.listFiles();
        if(ff !=null)
        {
        	File file = new File(target);
        	FileWriter fw = new FileWriter(new File("d:/img64.js"));
        	for(int i=0;i<ff.length;i++)
        	{
        		String encode="";
        		try{
        			byte[] bytes = Files.readAllBytes(Paths.get(ff[i].getAbsolutePath()));
        			encode = Base64.encodeBase64String(bytes);
        			System.out.println(ff[i].getName());
        			String str[] = (ff[i].getName()).split("\\.");
        			fw.write("'"+str[0]+"'"+":'"+encode+"',");
        			fw.write(System.getProperty("line.separator"));
        			fw.flush();
        			//System.out.println("'"+ff[i].getName()+"'"+":'"+encode+"'");
        		}catch (Exception e){
        			throw e;
        		}
        	}
        	fw.close();
        }
    }

}