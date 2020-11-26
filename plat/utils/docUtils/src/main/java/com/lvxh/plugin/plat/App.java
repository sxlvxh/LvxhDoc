package com.lvxh.plugin.plat;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.xmlbeans.impl.inst2xsd.util.Element;
import org.jodconverter.core.document.DefaultDocumentFormatRegistry;
import org.jodconverter.core.office.OfficeUtils;
import org.jodconverter.local.JodConverter;
import org.jodconverter.local.office.LocalOfficeManager;

import com.lowagie.text.DocumentException;
import com.lowagie.text.Image;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfContentByte;
import com.lowagie.text.pdf.PdfGState;
import com.lowagie.text.pdf.PdfImage;
import com.lowagie.text.pdf.PdfReader;
import com.lowagie.text.pdf.PdfStamper;

/**
 * Hello world!
 *
 */
public class App {
	public static void mai1n(String[] args) {
		/*
		 * OfficeManager officeManager = LocalOfficeManager.builder()
		 * .officeHome("D:\\Program Files (x86)\\OpenOffice 4") .portNumbers(2002, 2003,
		 * 2004, 2005) .processManager("com.lvxh.plugin.plat.CustomProcessManager")
		 * .build();
		 */

		File inputFile = new File("e://a.docx");
		File outputFile = new File("e://document.pdf");

		// Create an office manager using the default configuration.
		// The default port is 2002. Note that when an office manager
		// is installed, it will be the one used by default when
		// a converter is created.
		final LocalOfficeManager officeManager = LocalOfficeManager.install();
		try {

			// Start an office process and connect to the started instance (on port 2002).
			officeManager.start();

			JodConverter.convert(new File("e:/idx.html")).to(new File("e:/aa.pdf"))
					.as(DefaultDocumentFormatRegistry.PDF).execute();

			JodConverter.convert(new File("e:/idx.html")).to(new File("e:/aa.doc")).execute();

			
			BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(new File("e:/temp.pdf")));
			setWatermark1(bos,"e:/aa.pdf");
				
			//setWatermark1(bos,"e:/aa.pdf");
			
			PDDocument pdDocument = PDDocument.load(new File("e:/temp.pdf"));
			PDFRenderer renderer = new PDFRenderer(pdDocument);
			/* dpi越大转换后越清晰，相对转换速度越慢 */
			PdfReader reader = new PdfReader("E:/temp.pdf");
			int pages = reader.getNumberOfPages();
			StringBuffer imgFilePath = null;
			for (int i = 0; i < pages; i++) {

				// String imgFilePathPrefix = i+"_";// + File.separator + imagePDFName;
				imgFilePath = new StringBuffer("E:/");
				// imgFilePath.append(imgFilePathPrefix.substring(0,
				// imgFilePathPrefix.lastIndexOf(File.separator)));
				// imgFilePath.append(imagePDFName+"_");
				// imgFilePath.append(i);//去掉下划线
				imgFilePath.append(String.valueOf(i + 1));
				// imgFilePath.append("[第"+toChinese(String.valueOf(i + 1))+"页]"+imagePDFName);
				imgFilePath.append(".png");
				File dstFile = new File(imgFilePath.toString());
				BufferedImage image = renderer.renderImageWithDPI(i, 200);
				ImageIO.write(image, "png", dstFile);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			// Stop the office process
			OfficeUtils.stopQuietly(officeManager);
		}
	}
	public static void main(String[] args) {
		try {
			BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(new File("e:/temp.pdf")));
			setWatermark1(bos,"e:/aa.pdf");
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void setWatermark(BufferedOutputStream bos, String input) throws DocumentException, IOException {

		String text = "江苏怀业信息技术股份有限公司";
		PdfReader reader = new PdfReader(input);
		PdfStamper stamper = new PdfStamper(reader, bos);
		int total = reader.getNumberOfPages()+1;
		PdfContentByte content;
		BaseFont base = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.EMBEDDED);
		// BaseFont base =
		// BaseFont.createFont("/data/tmis/uploads/file/font/simsun.ttc,1",
		// BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
		PdfGState gs = new PdfGState();
		for (int i = 1; i < total; i++) {
			content = stamper.getOverContent(i);// 在内容上方加水印
			//content = stamper.getUnderContent(i);// 在内容下方加水印
			gs.setAlphaIsShape(true);
			gs.setFillOpacity(0.8f);
			content.setGState(gs);
			content.beginText();
			content.setRGBColorFill(0, 0, 255);
			content.setFontAndSize(base, 50);
			content.setTextMatrix(100, 250);
			content.showTextAligned(Element.UNBOUNDED, text, 100, 100, 35);
			
			content.showTextAligned(Element.UNBOUNDED, text, 100, 300, 35);
			
			content.showTextAligned(Element.UNBOUNDED, text, 100, 500, 35);
			
			content.showTextAligned(Element.UNBOUNDED, text, 100, 700, 35);
			// content.showTextAligned(Element.ALIGN_CENTER,
			// "检测管理信息系统！",400,250, 55);
			content.setRGBColorFill(0, 0, 0);
			content.setFontAndSize(base, 8);
			content.endText();
			
			Image image = Image.getInstance("e:/test.png");
            /*
              img.setAlignment(Image.LEFT | Image.TEXTWRAP);
              img.setBorder(Image.BOX); img.setBorderWidth(10);
              img.setBorderColor(BaseColor.WHITE); img.scaleToFit(100072);//大小
              img.setRotationDegrees(-30);//旋转
             */
            image.setAbsolutePosition(200, 206); // set the first background
                                                    // image of the absolute
            image.scaleToFit(200, 200);
            content.addImage(image,50,0,0,50,10,10);

		}
		stamper.close();
	}
	
	
	public static void setWatermark1(BufferedOutputStream bos, String input) throws DocumentException, IOException {

		String text = "江苏怀业信息技术股份有限公司";
		PdfReader reader = new PdfReader(input);
		PdfStamper stamper = new PdfStamper(reader, bos);
		int total = reader.getNumberOfPages()+1;
		PdfContentByte content;
		BaseFont base = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.EMBEDDED);
		// BaseFont base =
		// BaseFont.createFont("/data/tmis/uploads/file/font/simsun.ttc,1",
		// BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
		PdfGState gs = new PdfGState();
		for (int i = 1; i < total; i++) {
			content = stamper.getUnderContent(i);// 在内容上方加水印
			Image image = Image.getInstance("e:/internet_web_browser.png");
            /*
              img.setAlignment(Image.LEFT | Image.TEXTWRAP);
              img.setBorderColor(BaseColor.WHITE); img.scaleToFit(100072);//大小
              img.setRotationDegrees(-30);//旋转
             */
            image.setAbsolutePosition(100, 100); // set the first background
                                                    // image of the absolute
            image.scaleToFit(50, 50);
            
            content.addImage(image,50,0,0,50,500,0);
            content.addImage(image,50,0,0,50,400,0);
		}
		stamper.close();
	}
}
