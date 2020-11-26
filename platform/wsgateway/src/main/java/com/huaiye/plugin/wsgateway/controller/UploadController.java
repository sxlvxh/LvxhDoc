package com.huaiye.plugin.wsgateway.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.huaiye.plugin.wsgateway.bean.FilesHolder;
import com.huaiye.plugin.wsgateway.config.Config;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.holder.GridResult;
import com.lvxh.plugin.platform.holder.Pages;
import com.lvxh.plugin.platform.utils.PUtils;

@RequestMapping("/upload")
@Controller
public class UploadController {
	private final static Logger LOG = Logger.getLogger(UploadController.class);

	public static final Map<String,String> MAP = new HashMap<String,String>();
	static
	{
		MAP.put("application/javascript", "js");
		MAP.put("image/png", "img");
		MAP.put("image/jpeg", "img");
		MAP.put("video/mp4", "mp4");
		MAP.put("text/plain", "txt");
		MAP.put("application/zip", "zip");
		MAP.put("application/pdf", "pdf");
		MAP.put("application/vnd.openxmlformats-officedocument.wordprocessingml.document", "word");
		MAP.put("application/vnd.ms-excel", "excel");
		MAP.put("image/gif", "img");
		MAP.put("application/msword", "word");
		MAP.put("text/html", "html");
		MAP.put("application/x-sql", "sql");
		MAP.put("video/x-matroska", "mkv");
		MAP.put("video/webm", "mp4");
		MAP.put("application/x-gzip", "gz");
		MAP.put("application/x-zip-compressed", "zip");
		
	}
	
	@Autowired
	private Config config;


	@RequestMapping(value = "doUpload", method = RequestMethod.POST)
	@ResponseBody
	public BaseResult upload(@RequestParam(value = "upfile") MultipartFile upfile[]) {
		BaseResult result = new BaseResult();
		result.setCode(0);
		result.setDesc("上传成功");

		String today = PUtils.dateToStr(new Date(),"yyyyMMdd");
			List<FilesHolder> list = new ArrayList<FilesHolder>();
			try {

				if (upfile != null && upfile.length > 0) {
					// 循环获取file数组中得文件
					for (int i = 0; i < upfile.length; i++) {
						MultipartFile file = upfile[i];

						String originalFilename = file.getOriginalFilename();
						String last = originalFilename.substring(originalFilename.lastIndexOf("."),
								originalFilename.length());
						String uuid = PUtils.getUUID();
						String newName = uuid + last;
						String path = config.fileSaveDir + "/userfiles/"+today+"/";
						File storageFile = new File(path + newName);
						if(!storageFile.exists())
						{
							storageFile.mkdirs();
						}
						file.transferTo(storageFile);
						FilesHolder _h = new FilesHolder();
						_h.setFileUrl("/userfiles/"+today+"/"+newName);
						_h.setFileName(originalFilename);
						_h.setFileCode(uuid);
						_h.setFileType(file.getContentType());
						_h.setFileSize(file.getSize());
						_h.setFileConverterStatus(0);
						String type = MAP.get(_h.getFileType());
						
						if(StringUtils.isNotBlank(type))
						{
							_h.setOneType(type);
							
						}else
						{
							_h.setOneType("other");
						}
						list.add(_h);
					}
					if (list.size() > 0) {
						result.setResult(list);
					}
				} else {
					result.setCode(1);
					result.setDesc("upload file is empty!");
					LOG.error("upload file is empty!");
				}
			} catch (Exception e) {
				result.setCode(1);
				result.setDesc(e.getMessage());
				LOG.error("upload failed ", e);
			}
		return result;
	}
	
	@RequestMapping(value = "download", method = RequestMethod.POST)
	public void download(FilesHolder holder,HttpServletRequest request, HttpServletResponse response) {
			PUtils.downLoad(holder.getFileName(), config.fileSaveDir + holder.getFileUrl(), request, response);
	}
	
	
	protected BaseResult toBaseResult(int code, String desc) {
		return toBaseResult(code, desc, null);
	}

	protected BaseResult toBaseResult(int code, String desc, Object result) {
		BaseResult baseResult = new BaseResult();
		baseResult.setCode(code);
		baseResult.setDesc(desc);
		baseResult.setResult(result);
		return baseResult;
	}

	protected BaseResult toGridResult(int code, String desc, Object result, Pages pages) {
		GridResult gridResult = new GridResult();
		gridResult.setCode(code);
		gridResult.setDesc(desc);
		gridResult.setResult(result);
		gridResult.setPages(pages);
		return gridResult;
	}
}
