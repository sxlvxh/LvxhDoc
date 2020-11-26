package com.huaiye.plugin.plat.custom.controller;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.huaiye.plugin.plat.custom.config.Config;
import com.huaiye.plugin.plat.custom.service.Initialization;
import com.huaiye.plugin.plat.platfiles.holder.PlatFilesHolder;
import com.huaiye.plugin.plat.platfiles.service.PlatFilesService;
import com.huaiye.plugin.plat.platuser.holder.PlatUserHolder;
import com.huaiye.plugin.plat.platuser.service.PlatUserService;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.holder.GridResult;
import com.lvxh.plugin.platform.holder.Pages;
import com.lvxh.plugin.platform.holder.ServiceResult;
import com.lvxh.plugin.platform.utils.ImageUtils;
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

	@Autowired
	private PlatFilesService platFilesService;

	@Autowired
	private PlatUserService platUserService;

	@RequestMapping(value = "doUpload", method = RequestMethod.POST)
	@ResponseBody
	public BaseResult upload(PlatUserHolder holder, @RequestParam(value = "upfile") MultipartFile upfile[]) {
		BaseResult result = new BaseResult();
		result.setCode(0);
		result.setDesc("上传成功");

		if (StringUtils.isBlank(holder.getLoginName()) && StringUtils.isBlank(holder.getMobilePhone())) {
			result.setCode(1);
			result.setDesc("登录账号或密码错误！");
			return result;
		}

		if (StringUtils.isBlank(holder.getPassword())) {
			result.setCode(1);
			result.setDesc("登录账号或密码错误！");
			return result;
		}

		PlatUserHolder _holder = new PlatUserHolder();
		_holder.setLoginName(holder.getLoginName());
		_holder.setMobilePhone(holder.getMobilePhone());
		PlatUserHolder user = platUserService.get(_holder);
		String today = PUtils.dateToStr(new Date(),"yyyyMMdd");
		if (user != null) {
			List<PlatFilesHolder> list = new ArrayList<PlatFilesHolder>();
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
						String path = config.filesServerBase + "/userfiles/"+user.getUserCode()+"/"+today+"/";
						File storageFile = new File(path + newName);
						if(!storageFile.exists())
						{
							storageFile.mkdirs();
						}
						file.transferTo(storageFile);
						
						PlatFilesHolder _h = new PlatFilesHolder();
						if("imgAlpha".equals(holder.getRemark()))
						{
							ImageUtils img = new ImageUtils();
							img.alphaImg(path +"alpha_"+newName, path + newName);
							_h.setFileUrl("/userfiles/"+user.getUserCode()+"/"+today+"/alpha_"+newName);
						}else
						{
							_h.setFileUrl("/userfiles/"+user.getUserCode()+"/"+today+"/"+newName);
						}
						
						_h.setFileName(originalFilename);
						_h.setFileCode(uuid);
						_h.setFileType(file.getContentType());
						_h.setUpUserCode(holder.getUserCode());
						_h.setUserCode(user.getUserCode());
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
						platFilesService.insertBatch(list);
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
		} else {
			result.setCode(1);
			result.setDesc("登录账号或密码错误！");
			return result;
		}
		return result;
	}
	
	@RequestMapping(value = "download", method = RequestMethod.POST)
	public void download(PlatFilesHolder holder,HttpServletRequest request, HttpServletResponse response) {
		PlatFilesHolder _holder = platFilesService.get(holder);
		if(_holder !=null)
		{
			PUtils.downLoad(_holder.getFileName(), config.filesServerBase + _holder.getFileUrl(), request, response);
		}
	}
	
	
	@RequestMapping(value = "/converter", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult converter(@RequestBody PlatFilesHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		BaseResult rest = new BaseResult();
		PlatFilesHolder _h = new PlatFilesHolder();
		_h.setFileCode(holder.getFileCode());
		PlatFilesHolder h = platFilesService.get(_h);
		if(h !=null)
		{
			try {
				h.setFileConverterStatus(holder.getFileConverterStatus());
				Initialization.put(h);
				rest.setCode(0);
				rest.setDesc("操作成功！");
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			}
		}else
		{
			rest.setCode(1);
			rest.setDesc("文件码错误！");
		}
		return rest;
	}
	
	/**
	 * 
	 * @return
	 */
	@RequestMapping("/page")
	public ModelAndView init(HttpServletRequest req, HttpServletResponse resp) {
		req.getSession().setAttribute("FILES_SERVER_VISIT", config.filesServerVisit);
		return new ModelAndView("/html/page");
	}
	
	/**
	 * . 根据条件查询记录
	 * 
	 * @param holder
	 *            查询条件
	 * @return 更新操作结果
	 */
	@RequestMapping(value = "/grid", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getGrid(@RequestBody PlatFilesHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug("start to get grid records by page, params is: " + String.valueOf(holder));
		try {
			ServiceResult<PlatFilesHolder> r = platFilesService.getGrid(holder);
			List<PlatFilesHolder> results = r.getList();
			return toGridResult(0, "分页查询成功", results, r.getHolder().getPages());
		} catch (Exception e) {
			LOG.error("get records by page records failed.", e);
			return toBaseResult(1, "分页查询失败");
		}
	}
	
	/**
     * . 根据条件查询记录
     * 
     * @param holder
     *            查询条件
     * @return 更新操作结果
     */
	@RequestMapping(value = "/list", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getList(@RequestBody PlatFilesHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug("start to get all records, params is: " + String.valueOf(holder));
		try {
            List<PlatFilesHolder> records = platFilesService.getList(holder);
            BaseResult ret = toBaseResult(0, "查询成功", records);
            return ret;
		} catch (Exception e) {
			LOG.error("get all records failed.", e);
			return toBaseResult(1, "查询失败");
		}
	}
	
	/**
     * . 根据条件查询记录
     * 
     * @param holder
     *            查询条件
     * @return 更新操作结果
     */
	@RequestMapping(value = "/delete", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult delete(@RequestBody PlatFilesHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug("start to get all records, params is: " + String.valueOf(holder));
		try {
			PlatFilesHolder records = platFilesService.get(holder);
			
			if(records !=null)
			{
				File file = new File(config.filesServerBase  + records.getFileUrl());
				file.delete();
				platFilesService.delete(holder);
				/*
				 * if(StringUtils.isNotBlank(records.getFileParams())) { Gson gson =new Gson();
				 * 
				 * }
				 */
			}
			
            BaseResult ret = toBaseResult(0, "查询成功", records);
            return ret;
		} catch (Exception e) {
			LOG.error("get all records failed.", e);
			return toBaseResult(1, "查询失败");
		}
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
