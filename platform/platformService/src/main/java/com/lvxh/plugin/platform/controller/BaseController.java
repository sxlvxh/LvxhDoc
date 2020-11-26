package com.lvxh.plugin.platform.controller;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.lvxh.plugin.platform.holder.BaseBusinessHolder;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.holder.ExportReqHolder;
import com.lvxh.plugin.platform.holder.GridResult;
import com.lvxh.plugin.platform.holder.Pages;
import com.lvxh.plugin.platform.holder.ServiceResult;
import com.lvxh.plugin.platform.holder.Sort;
import com.lvxh.plugin.platform.license.License;
import com.lvxh.plugin.platform.service.BaseBusinessService;
import com.lvxh.plugin.platform.utils.PUtils;

/**
 * .Controller接口定义
 *
 * @version 1.0.0
 */
public abstract class BaseController<T extends BaseBusinessHolder> extends MultiActionController {

	private static final Logger LOG = Logger.getLogger(BaseController.class);
	
	
	public static final int FAILURE = 1;

	public static final int SUCCESS = 0;
	
	private String fileServerUrl = "";
	
	private String loginUser = "";
	
	private String pwd = "";
	
	private String userCode = "";

	/**
	 * . 简单增删改查Service注入
	 */
	@Autowired
	protected BaseBusinessService<T> service;

	/**
	 * . 根据条件删除记录
	 * 
	 * @param holder
	 *            删除条件
	 * 
	 * @return 删除操作结果
	 */
	
	@RequestMapping(value = "/delete", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult delete(@RequestBody T holder, HttpServletRequest req, HttpServletResponse resp) {
		if(License.getCode() > 0)
		{
			return toBaseResult(FAILURE, License.getDesc());
		}
		return this.deleteBatch(Arrays.asList(holder), req, resp);
	}

	/**
	 * . 根据条件删除记录
	 * 
	 * @param holder
	 *            删除条件
	 * 
	 * @return 删除操作结果
	 */

	@RequestMapping(value = "/deleteLogic", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult deleteLogic(@RequestBody T holder, HttpServletRequest req, HttpServletResponse resp) {
		
		LOG.debug("start to deleteLogic, params is: " + String.valueOf(holder));
		try {
			if(License.getCode() > 0)
			{
				return toBaseResult(FAILURE, License.getDesc());
			}
			
			int code = service.deleteLogic(holder);
			
			LOG.debug(code + " deleteLogic have been deleted!");
			return toBaseResult(SUCCESS, "删除成功");
		} catch (Exception e) {
			LOG.error("delete deleteLogic failed.", e);
			return toBaseResult(FAILURE, "删除失败");
		}
		
	}

	/**
	 * . 根据条件批量删除记录
	 * 
	 * @param holders
	 *            删除条件
	 * 
	 * @return 删除操作结果
	 */
	@RequestMapping(value = "/deleteBatch", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult deleteBatch(@RequestBody List<T> holders, HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug("start to delete records, params is: " + String.valueOf(holders));
		try {
			if(License.getCode() > 0)
			{
				return toBaseResult(FAILURE, License.getDesc());
			}
			
			int code = service.deleteBatch(holders);
			LOG.debug(code + " record(s) have been deleted!");
			return toBaseResult(SUCCESS, "删除成功");
		} catch (Exception e) {
			LOG.error("delete records failed.", e);
			return toBaseResult(FAILURE, "删除失败");
		}
	}

	/**
	 * . 根据条件批量假删除记录
	 * 
	 * @param holders
	 *            删除条件
	 * 
	 * @return 删除操作结果
	 */
	@RequestMapping(value = "/deleteLogicBatch", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult deleteLogicBatch(@RequestBody List<T> holders, HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug("start to delete records, params is: " + String.valueOf(holders));
		try {
			if(License.getCode() > 0)
			{
				return toBaseResult(FAILURE, License.getDesc());
			}
			
			int code = service.deleteLogicBatch(holders);
			LOG.debug(code + " record(s) have been deleted!");
			return toBaseResult(SUCCESS, "删除成功");
		} catch (Exception e) {
			LOG.error("delete records failed.", e);
			return toBaseResult(FAILURE, "删除失败");
		}
	}
	
	@ExceptionHandler
	@ResponseBody
	public BaseResult exp(HttpServletRequest request, Exception ex) {
		request.setAttribute("ex", ex);
		LOG.error(" BaseController Exception : " + request.getRequestURI());
		LOG.error(ex.getMessage(), ex);
		return toBaseResult(FAILURE, "系统服务异常，请联系管理员。");
	}
	
	@InitBinder
	public void init(WebDataBinder binder) {
	 binder.registerCustomEditor(Date.class, new CustomDateEditor(new SimpleDateFormat(PUtils.DATE_FORMAT), true));
	}
	

	/**
	 * . 根据条件查询记录详细
	 * 
	 * @param holder
	 *            查条件
	 * 
	 * @return 操作结果
	 */
	@RequestMapping(value = "/detail", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult get(@RequestBody T holder, HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug("start to get record detail, params is: " + String.valueOf(holder));
		try {
			if(License.getCode() > 0)
			{
				return toBaseResult(FAILURE, License.getDesc());
			}
			return toBaseResult(SUCCESS, "查询详细成功", service.get(holder));
		} catch (Exception e) {
			LOG.error("get record detail failed.", e);
			return toBaseResult(FAILURE, "查询详细失败");
		}
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
	public BaseResult getGrid(@RequestBody T holder, HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug("start to get grid records by page, params is: " + String.valueOf(holder));
		try {
			if(License.getCode() > 0)
			{
				return toBaseResult(FAILURE, License.getDesc());
			}
			
			ServiceResult<T> r = service.getGrid(holder);
			List<T> results = r.getList();
			return toGridResult(SUCCESS, "分页查询成功", results, r.getHolder().getPages());
		} catch (Exception e) {
			LOG.error("get records by page records failed.", e);
			return toBaseResult(FAILURE, "分页查询失败");
		}
	}

    /**
     * 默认什么也不做，留给子类覆盖。
     * 
     * @param holder
     * @param req
     * @param resp
     */
    protected void doBeforeGetGrid(T holder, HttpServletRequest req,
            HttpServletResponse resp) {

    }

    /**
     * 默认什么也不做，留给子类覆盖。
     * 
     * @param holder
     * @param r
     * @param req
     * @param resp
     */
    protected void doAfterGetGrid(T holder, ServiceResult<T> r,
            HttpServletRequest req, HttpServletResponse resp) {

    }

    /**
     * 默认什么也不做，留给子类覆盖。
     * 
     * @param holder
     * @param req
     * @param resp
     */
    protected void doBeforeGetList(T holder, HttpServletRequest req,
            HttpServletResponse resp) {

    }

    /**
     * 默认什么也不做，留给子类覆盖。
     * 
     * @param records
     * @param req
     * @param resp
     */
    protected void doAfterGetList(List<T> records, HttpServletRequest req,
            HttpServletResponse resp) {

    }
    // add end 2019-03-15

    /**
     * . 根据条件查询记录
     * 
     * @param holder
     *            查询条件
     * @return 更新操作结果
     */
	@RequestMapping(value = "/list", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getList(@RequestBody T holder, HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug("start to get all records, params is: " + String.valueOf(holder));
		try {
			if(License.getCode() > 0)
			{
				return toBaseResult(FAILURE, License.getDesc());
			}
            List<T> records = service.getList(holder);
            BaseResult ret = toBaseResult(SUCCESS, "查询成功", records);
            // return toBaseResult(SUCCESS, "查询成功", service.getList(holder));
            return ret;
            // modification end 2019-03-15
		} catch (Exception e) {
			LOG.error("get all records failed.", e);
			return toBaseResult(FAILURE, "查询失败");
		}
	}

	/**
	 * . 插入记录
	 * 
	 * @param holder
	 *            待插入信息条件
	 * @return 插入操作结果
	 */
	@RequestMapping(value = "/insert", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult insert(@RequestBody T holder, HttpServletRequest req, HttpServletResponse resp) {
		
		if(License.getCode() > 0)
		{
			return toBaseResult(FAILURE, License.getDesc());
		}
		
		BaseResult rest = new BaseResult();
		holder.setCreateTime(new Date());
		holder.setCreateUserId(PUtils.getCreateUserID(req));
		holder.setIsdel(0);
		T _holder = service.insert(holder);
		rest.setObj(_holder);
		rest.setCode(0);
		rest.setDesc("操作成功!");
		return rest;
	}

	/**
	 * . 批量插入记录
	 * 
	 * @param holders
	 *            待插入信息条件
	 * @return 插入操作结果
	 */
	@RequestMapping(value = "/insertBatch", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult insertBatch(@RequestBody List<T> holders, HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug("start to insert records, params is: " + String.valueOf(holders));
		try {
			try {
				if(License.getCode() > 0)
				{
					return toBaseResult(FAILURE, License.getDesc());
				}
				
				int userId = PUtils.getCreateUserID(req);
				if (holders != null) {
					for (T t : holders) {
						t.setCreateTime(new Date());
						t.setCreateUserId(userId);
						t.setIsdel(0);
					}
				}
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			}

			int code = service.insertBatch(holders);
			LOG.debug(code + " record(s) have been inserted!");
			return toBaseResult(SUCCESS, "添加成功");
		} catch (Exception e) {
			LOG.error("insert records failed.", e);
			return toBaseResult(FAILURE, "添加失败");
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

	/**
	 * . 根据条件更新记录
	 * 
	 * @param holder
	 *            更新条件
	 * @return 更新操作结果
	 */
	@RequestMapping(value = "/update" , produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult update(@RequestBody T holder, HttpServletRequest req, HttpServletResponse resp) {
		if(License.getCode() > 0)
		{
			return toBaseResult(FAILURE, License.getDesc());
		}
		return this.updateBatch(Arrays.asList(holder), req, resp);
	}

	/**
	 * . 根据条件更新记录
	 * 
	 * @param holder
	 *            更新条件
	 * @return 更新操作结果
	 */
	@RequestMapping(value = "/updateBatch", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult updateBatch(@RequestBody List<T> holders, HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug("start to update records, params is: " + String.valueOf(holders));
		try {
			if(License.getCode() > 0)
			{
				return toBaseResult(FAILURE, License.getDesc());
			}
			
			try {
				int updateUserId = PUtils.getCreateUserID(req);
				if (holders != null) {
					for (T t : holders) {
						t.setUpdateTime(new Date());
						t.setUpdateUserId(updateUserId);
					}
				}
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			}

			int code = service.updateBatch(holders);
			LOG.debug(code + " record(s) have been updated!");
			return toBaseResult(SUCCESS, "更新成功");
		} catch (Exception e) {
			LOG.error("update records failed.", e);
			return toBaseResult(FAILURE, "更新失败");
		}
	}
	
	@RequestMapping("/export")
	public void export(T holder,HttpServletRequest request, HttpServletResponse response) {
    	
    	try {
    		
    		if(StringUtils.isNotBlank(holder.getReportJson()))
    		{
    			String dateFormat = PUtils.DATETIME_FORMAT;
    			Gson gson = new GsonBuilder().setDateFormat(dateFormat).create();
    			ExportReqHolder b = gson.fromJson(holder.getReportJson(),ExportReqHolder.class);
    		    holder.setExport(b);
    		    if(StringUtils.isNotBlank(b.getSort()))
    		    {
    		    	Sort sort = new Sort();
    		    	sort.setField(b.getSort());
    		    	holder.setSort(sort);
    		    }
    		}
			
			ServiceResult<T> result = service.exportReport(holder);
			PUtils.getDataToExcel(result.getHolder(), result.getList(), request, response);
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		}
    }
	
	@RequestMapping("/exportReport")
	public void exportReport(T holder,HttpServletRequest request, HttpServletResponse response) {
    	try {
    		ServiceResult<T> result = service.exportReport(holder);
    		System.out.println(holder.getReportJson());
    		Map<String,List<T>> map = new HashMap<String,List<T>>();
    		map.put("0", result.getList());
			PUtils.getReportExcel(result.getHolder(),map, request, response);
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		}
    }
    
	public int getCreateUserID(HttpServletRequest req) {
		return PUtils.getCreateUserID(req);
	}
	
	public String getFileServerUrl() {
		return fileServerUrl;
	}

	public void setFileServerUrl(String fileServerUrl) {
		this.fileServerUrl = fileServerUrl;
	}
	
	
	@RequestMapping(value = "upFormFile", method = RequestMethod.POST)
	public ModelAndView upFormFile(@RequestParam(value = "upfile") MultipartFile[] upfiles) {

		ModelAndView mav = new ModelAndView("html/uploadResp");
		ModelMap modelMap = mav.getModelMap();
		try {
			Gson gson = new Gson();
			modelMap.put("UPLOAD_RESP_INFO",gson.toJson(PUtils.doUpload(getFileServerUrl(),getLoginUser(),getPwd(),getUserCode(),upfiles)));
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		} 
		return mav;
	}
	
	@RequestMapping(value = "upJsonFile", method = RequestMethod.POST)
	@ResponseBody
	public BaseResult upJsonFile(@RequestParam(value = "upfile") MultipartFile[] upfiles) {
		return PUtils.doUpload(getFileServerUrl(),getLoginUser(),getPwd(),getUserCode(),upfiles);
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getLoginUser() {
		return loginUser;
	}

	public void setLoginUser(String loginUser) {
		this.loginUser = loginUser;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	
}
