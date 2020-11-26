package com.lvxh.plugin.plat;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.poi.poifs.filesystem.DirectoryEntry;
import org.apache.poi.poifs.filesystem.DocumentEntry;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.xwpf.usermodel.XWPFDocument;

import fr.opensagres.poi.xwpf.converter.pdf.PdfConverter;
import fr.opensagres.poi.xwpf.converter.pdf.PdfOptions;
 
 
 
public class HtmlToWord {
 
 public static boolean writeWordFile() {
 
  boolean w = false;
  String path = "e:/";
  
  try {
   if (!"".equals(path)) {
    
    // 检查目录是否存在
    File fileDir = new File(path);
    if (fileDir.exists()) {
     
     // 生成临时文件名称
     String fileName = "a.doc";
     String content = "<html>" +
           "<head>你好</head>" +
          "<body>" +
            "<table>" +
             "<tr>" +
              "<td>信息1</td>" +              
              "<td>信息2</td>" +              
              "<td>t3</td>" +              
             "<tr>" +
            "</table>" +
            "</body>" +
            "</html>";
     
     byte b[] = content.getBytes("GBK");
     FileInputStream fis = new FileInputStream(new File("e:/1111.html"));
     ByteArrayInputStream bais = new ByteArrayInputStream(b);
     POIFSFileSystem poifs = new POIFSFileSystem();
     DirectoryEntry directory = poifs.getRoot();
     directory.getEntries();
     DocumentEntry documentEntry = directory.createDocument("WordDocument", fis);
     FileOutputStream ostream = new FileOutputStream(path+ fileName);
     poifs.writeFilesystem(ostream);
     bais.close();
     ostream.close();
     
     
    /* String docPath = "e:/a.docx";
     String pdfPath = "e:/aa.pdf";

     XWPFDocument document;
     InputStream doc = new FileInputStream(docPath);
     document = new XWPFDocument(doc);
     PdfOptions options = PdfOptions.create();
     OutputStream out = new FileOutputStream(pdfPath);
     PdfConverter.getInstance().convert(document, out, options);

     doc.close();
     out.close();*/
	
    }
   }
 
  } catch (IOException e) {
   e.printStackTrace();
  }
 
  return w;
 }
 
 public static void main(String[] args){
  writeWordFile();
 }
 
}