package com.huaiye.plugin.plat.custom.service;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;

import org.apache.log4j.Logger;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.jodconverter.core.document.DefaultDocumentFormatRegistry;
import org.jodconverter.core.office.OfficeUtils;
import org.jodconverter.local.JodConverter;
import org.jodconverter.local.office.LocalOfficeManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.huaiye.plugin.plat.custom.bean.FileConverterBean;
import com.huaiye.plugin.plat.custom.bean.FileList;
import com.huaiye.plugin.plat.custom.bean.FileParams;
import com.huaiye.plugin.plat.custom.config.Config;
import com.huaiye.plugin.plat.platfiles.holder.PlatFilesHolder;
import com.huaiye.plugin.plat.platfiles.service.PlatFilesService;
import com.lowagie.text.Image;
import com.lowagie.text.pdf.PdfContentByte;
import com.lowagie.text.pdf.PdfReader;
import com.lowagie.text.pdf.PdfStamper;
import com.lvxh.plugin.netty.base.NettyCache;
import com.lvxh.plugin.platform.utils.PUtils;
import com.lvxh.plugin.websocket.NettyBinaryService;
import com.lvxh.plugin.websocket.WebSocketServer;

@Component
public class Initialization {

	private final static Logger LOG = Logger.getLogger(Initialization.class);

	public static final BlockingQueue<PlatFilesHolder> FILE_QUEUE = new LinkedBlockingQueue<PlatFilesHolder>(2000);

	public static final int POI = 120;

	public static int drainTo(Collection<? super PlatFilesHolder> c, int maxElements) {
		return FILE_QUEUE.drainTo(c, maxElements);
	}

	public static void put(PlatFilesHolder e) throws InterruptedException {
		FILE_QUEUE.put(e);
	}

	public static PlatFilesHolder take() throws InterruptedException {
		return FILE_QUEUE.take();
	}

	@Autowired
	private Config config;

	@Autowired
	private PlatFilesService platFilesService;
	
	@Autowired
	private NettyBinaryService nettyBinaryService;

	@PostConstruct
	public void index() {
		PUtils.submit(()-> {
			NettyCache.nettyServer(config.tcpPort,config.webSocketPort,null);
		});
		
		PUtils.submit(()-> {
			WebSocketServer.init(config.filesServerBase, config.upFileSocketPort, nettyBinaryService);
		});
		
		PUtils.submit(new Runnable() {
			@Override
			public void run() {
				while (true) {
					try {
						List<PlatFilesHolder> list = new ArrayList<PlatFilesHolder>();
						drainTo(list, 20);
						if (list.size() > 0) {
							// final LocalOfficeManager officeManager = LocalOfficeManager.install();
							LocalOfficeManager officeManager = LocalOfficeManager.builder()
									.officeHome(config.officeHome).install().build();
							/*
							 * .builder() .officeHome("C:\\Program Files\\LibreOffice") .build();
							 */
							try {
								officeManager.start();
								//
								for (PlatFilesHolder _hh : list) {
									File src = new File(config.filesServerBase + _hh.getFileUrl());
									List<FileList> FileListl = new ArrayList<FileList>();
									switch (_hh.getFileConverterStatus()) {
									// 默认状态
									case 0:
										LOG.debug(" this default status ： " + _hh);
										break;
									// 1 转换为word
									case 1:
										toWord(_hh, src, FileListl);
										break;
									// 2 转换为pdf
									case 2:
										toPdf(_hh, src, FileListl);
										break;
									// 3 转换为图片
									case 3:
										FileListl = toImg(_hh, src, FileListl);
										break;
									// 4 转化为word和pdf
									case 4:
										toWordAndPdf(_hh, src, FileListl);
										break;
									// 5转换为pdf和图片
									case 5:
										FileListl = toPdfAndImg(_hh, src, FileListl);
										break;
									// 6 转换为word和图片
									case 6:
										FileListl = toWordAndImg(_hh, src, FileListl);
										break;
									// 7 转换为word，pdf和图片
									case 7:
										FileListl = toWordPdfAndImg(_hh, src, FileListl);
										break;
									//
									default:
										LOG.debug(" this status is other : " + _hh);
									}
									updateFilesDB(_hh, FileListl);
								}

							} catch (Exception e) {
								LOG.error(e.getMessage(), e);
							} finally {
								OfficeUtils.stopQuietly(officeManager);
								try {
									Thread.sleep(2000);
								} catch (Exception e) {
									LOG.error(e.getMessage(), e);
								}
							}
						}
					} catch (Exception e) {
						LOG.error(e.getMessage(), e);
					}
				}

			}

			private List<FileList> toWordPdfAndImg(PlatFilesHolder _hh, File src, List<FileList> FileListl)
					throws IOException {
				if (isTxtFile(_hh)) {
					FileConverterBean fb = converterToPdfAction(_hh, src);
					FileConverterBean fb2 = converterToWordAction(_hh, src);
					FileListl = pdfToImg(_hh, fb.getFileTarget());
					FileListl.add(fb.getFileList());
					FileListl.add(fb2.getFileList());

				} else if (isWordFile(_hh)) {
					// 转pdf
					FileConverterBean _b = converterToPdfAction(_hh, src);
					FileListl.add(_b.getFileList());
					FileListl = pdfToImg(_hh, _b.getFileTarget());

				} else if (isPdfFile(_hh)) {
					// 转图片
					FileListl = pdfToImg(_hh, src);
					// 转word
					FileConverterBean _b = converterToWordAction(_hh, src);
					FileListl.add(_b.getFileList());
				}
				return FileListl;
			}

			private List<FileList> toWordAndImg(PlatFilesHolder _hh, File src, List<FileList> FileListl)
					throws IOException {
				if (isWordFile(_hh) || isTxtFile(_hh)) {

					FileConverterBean fileTarget = converterToPdfAction(_hh, src);
					// 转图片
					FileListl = pdfToImg(_hh, fileTarget.getFileTarget());
					// 转word
					if (!isWordFile(_hh)) {
						FileConverterBean fb = converterToWordAction(_hh, src);
						FileListl.add(fb.getFileList());
					}
				} else if (isPdfFile(_hh)) {
					FileListl = pdfToImg(_hh, src);

					FileConverterBean fb = converterToWordAction(_hh, src);
					FileListl.add(fb.getFileList());
				}
				return FileListl;
			}

			private List<FileList> toPdfAndImg(PlatFilesHolder _hh, File src, List<FileList> FileListl)
					throws IOException {
				if (isWordFile(_hh) || isTxtFile(_hh)) {
					FileConverterBean fb = converterToPdfAction(_hh, src);
					FileListl = pdfToImg(_hh, fb.getFileTarget());
					FileListl.add(fb.getFileList());
				} else if (isPdfFile(_hh)) {
					FileListl = pdfToImg(_hh, src);
				}
				return FileListl;
			}

			private void toWordAndPdf(PlatFilesHolder _hh, File src, List<FileList> FileListl) {
				if (isWordFile(_hh)) {
					FileConverterBean _b = converterToPdfAction(_hh, src);
					FileListl.add(_b.getFileList());
				} else if (isPdfFile(_hh)) {
					FileConverterBean _b = converterToWordAction(_hh, src);
					FileListl.add(_b.getFileList());
				} else if (isTxtFile(_hh)) {
					FileConverterBean _b = converterToPdfAction(_hh, src);
					FileListl.add(_b.getFileList());
					FileConverterBean _b2 = converterToWordAction(_hh, src);
					FileListl.add(_b2.getFileList());
				}
			}

			private List<FileList> toImg(PlatFilesHolder _hh, File src, List<FileList> FileListl) throws IOException {
				if (isWordFile(_hh) || isTxtFile(_hh)) {

					FileConverterBean fb = converterToPdfAction(_hh, src);
					FileListl = pdfToImg(_hh, fb.getFileTarget());
				} else if (isPdfFile(_hh)) {
					FileListl = pdfToImg(_hh, src);
				}
				return FileListl;
			}

			private void toPdf(PlatFilesHolder _hh, File src, List<FileList> FileListl) {
				if (isWordFile(_hh) || isTxtFile(_hh)) {
					FileConverterBean fb = converterToPdfAction(_hh, src);
					FileListl.add(fb.getFileList());
				}
			}

			private void toWord(PlatFilesHolder _hh, File src, List<FileList> FileListl) {
				if (isPdfFile(_hh) || isTxtFile(_hh)) {
					FileConverterBean fb = converterToWordAction(_hh, src);
					FileListl.add(fb.getFileList());
				}
			}

			private boolean isWordFile(PlatFilesHolder _hh) {
				return "word".equals(_hh.getOneType());
			}

			private boolean isPdfFile(PlatFilesHolder _hh) {
				return "pdf".equals(_hh.getOneType());
			}

			private boolean isTxtFile(PlatFilesHolder _hh) {
				return "txt".equals(_hh.getOneType()) || "sql".equals(_hh.getOneType())
						|| "html".equals(_hh.getOneType());
			}

			private void updateFilesDB(PlatFilesHolder _hh, List<FileList> fl) {
				FileParams p = new FileParams();

				if (fl != null && fl.size() > 0) {
					p.setFileList(fl);
				}

				_hh.setFileParams(new Gson().toJson(p));
				platFilesService.update(_hh);
			}

			private FileConverterBean converterToWordAction(PlatFilesHolder _hh, File src) {
				FileConverterBean f = new FileConverterBean();
				File target = new File(src.getParent() + "/" + _hh.getFileCode() + ".doc");
				FileList _b1 = new FileList();
				try {
					JodConverter.convert(src).to(target).as(DefaultDocumentFormatRegistry.DOC).execute();
					_b1.setName(_hh.getFileCode());
					_b1.setType("word");
					_b1.setUrl(_hh.getFileUrl().replace(src.getName(), target.getName()));
					f.setFileList(_b1);
				} catch (Exception e) {
					LOG.error(e.getMessage(), e);
				}

				f.setFileTarget(target);
				return f;
			}

			private FileConverterBean converterToPdfAction(PlatFilesHolder _hh, File src) {
				FileConverterBean f = new FileConverterBean();
				File target = new File(src.getParent() + "/" + _hh.getFileCode() + ".pdf");
				FileList _b1 = new FileList();

				try {
					JodConverter.convert(src).to(target).as(DefaultDocumentFormatRegistry.PDF).execute();
					_b1.setName(_hh.getFileCode());
					_b1.setType("pdf");
					_b1.setUrl(_hh.getFileUrl().replace(src.getName(), target.getName()));
					f.setFileList(_b1);
				} catch (Exception e) {
					LOG.error(e.getMessage(), e);
				}
				f.setFileTarget(target);
				return f;
			}

			private List<FileList> pdfToImg(PlatFilesHolder _hh, File src) throws IOException {
				PDDocument pdDocument = PDDocument.load(src);
				PDFRenderer renderer = new PDFRenderer(pdDocument);
				PdfReader reader = new PdfReader(src.getAbsolutePath());
				int pages = reader.getNumberOfPages();
				String[] replaceL = _hh.getFileUrl().split("\\/");
				String replaceN = replaceL[replaceL.length - 1];
				StringBuffer imgFilePath = null;
				List<FileList> list = new ArrayList<FileList>();
				for (int i = 0; i < pages; i++) {
					imgFilePath = new StringBuffer(src.getParent() + "/" + _hh.getFileCode());
					imgFilePath.append(String.valueOf(i + 1));
					imgFilePath.append(".png");
					File dstFile = new File(imgFilePath.toString());
					BufferedImage image = renderer.renderImageWithDPI(i, POI);
					ImageIO.write(image, "png", dstFile);

					FileList _b1 = new FileList();
					_b1.setName(_hh.getFileCode() + String.valueOf(i + 1));
					_b1.setType("png");

					_b1.setUrl(_hh.getFileUrl().replace(replaceN, dstFile.getName()));
					list.add(_b1);

				}
				return list;
			}

		});
		
		
	}

	public void setWatermark1(String src, PlatFilesHolder bean) {

		BufferedOutputStream bos = null;
		FileOutputStream fos = null;
		PdfStamper stamper = null;
		String file = PUtils.getUUID();
		try {
			fos = new FileOutputStream(new File(config.filesServerBase + "/" + file));
			bos = new BufferedOutputStream(fos);
			PdfReader reader = new PdfReader(src);
			stamper = new PdfStamper(reader, bos);
			int total = reader.getNumberOfPages() + 1;
			PdfContentByte content;
			for (int i = 1; i < total; i++) {
				content = stamper.getUnderContent(i);// 在内容上方加水印
				Image image = Image.getInstance("e:/internet_web_browser.png");
				image.setAbsolutePosition(100, 100); // set the first background
														// image of the absolute
				image.scaleToFit(50, 50);

				content.addImage(image, 50, 0, 0, 50, 500, 0);
				content.addImage(image, 50, 0, 0, 50, 400, 0);
			}
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		} finally {
			PUtils.closeQuietly(fos);
			PUtils.closeQuietly(bos);
			if(stamper!=null)
			{
				try {
					stamper.close();
				} catch (Exception e) {
					LOG.error(e.getMessage(), e);
				} 
			}
		}
	}
}
