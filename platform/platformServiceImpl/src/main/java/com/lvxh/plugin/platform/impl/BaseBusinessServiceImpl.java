package com.lvxh.plugin.platform.impl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.Gson;
import com.lvxh.plugin.platform.holder.BaseBusinessHolder;
import com.lvxh.plugin.platform.holder.BaseBusinessMapper;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.holder.GridResult;
import com.lvxh.plugin.platform.holder.Pages;
import com.lvxh.plugin.platform.holder.ServiceResult;
import com.lvxh.plugin.platform.utils.PUtils;

@Transactional
public class BaseBusinessServiceImpl<T extends BaseBusinessHolder> {

	private static final Logger LOG = Logger.getLogger(BaseBusinessServiceImpl.class);

	public static final Gson GSON = new Gson();

	/**
	 * . 主表Mapper对象
	 */
	@Autowired
	protected BaseBusinessMapper<T> mapper;

	/**
	 * . 删除对象
	 * 
	 * @param holder
	 *            待删除对象
	 * @return 删除行数
	 */
	public int delete(T holder) {
		return mapper.delete(holder);
	}

	/**
	 * . 删除对象
	 * 
	 * @param holder
	 *            待删除对象
	 * @return 删除行数
	 */
	public int deleteLogic(T holder) {
		holder.setIsdel(1);
		return update(holder);
	}

	/**
	 * . 批量删除对象
	 * 
	 * @param holder
	 *            待删除对象
	 * @return 删除行数
	 */
	public int deleteBatch(List<T> holders) {
		int count = 0;
		for (T holder : holders) {
			count += this.delete(holder);
		}
		return count;
	}
	
	/**
	 * . 批量删除对象
	 * 
	 * @param holder
	 *            待删除对象
	 * @return 删除行数
	 */
	public int deleteLogicBatch(List<T> holders) {
		int count = 0;
		for (T holder : holders) {
			count += this.deleteDummy(holder);
		}
		return count;
	}

	/**
	 * . 删除对象(假删除)
	 * 
	 * @param holder
	 *            待删除对象
	 * @return 删除行数
	 */
	public int deleteDummy(T holder) {
	    holder.setIsdel(1);
	    holder.setUpdateTime(new Date());
		return mapper.update(holder);
	}

	/**
	 * . 查询单条记录
	 * 
	 * @param holder
	 *            查询条件
	 * @return 对象列表
	 */
	public T get(T holder) {
		List<T> result = this.getList(holder);
		if (result == null || result.size() == 0) {
			return null;
		} else {
			return result.get(0);
		}
	}

	/**
	 * . 分页查询列表
	 * 
	 * @param holder
	 *            查询条件
	 * @return 对象列表
	 */
	public ServiceResult<T> getGrid(T holder) {
		initIsdel(holder);
		ServiceResult<T> result = new ServiceResult<T>();
		int totalCount = mapper.getCountOfSummary(holder);
		LOG.debug("getGrid total count : " + totalCount);
		Pages pages = holder.getPages();
		if (holder.getPages() == null) {
			holder.setPages(pages = new Pages());
		}
		pages.setTotalCount(totalCount);
		LOG.debug("getGrid total pages : " + pages);
		result.setHolder(holder);
		result.setList(mapper.getListOfSummary(holder));
		return result;
	}

	private void initIsdel(T holder) {
		if (holder != null) {
			if (holder.getIsdel() == null) {
				holder.setIsdel(0);
			} else if (holder.getIsdel() == 2) {
				holder.setIsdel(null);
			}
		}
	}

	/**
	 * . 无分页查询列表
	 * 
	 * @param holder
	 *            查询条件
	 * @return 对象列表
	 * @see com.bulrush.dao.BaseBusinessMapper#getList(com.BaseBusinessHolder.dao.BaseHolder)
	 */
	public List<T> getList(T holder) {
		initIsdel(holder);
		return mapper.getList(holder);
	}

	/**
	 * . 新增对象
	 * 
	 * @param holder
	 *            待新增对象
	 * @return 新增行数
	 */
	public T insert(T holder) {
		if (holder.getId() != null) {
			holder.setId(null);
		}
		holder.setIsdel(0);
		if (null == holder.getCreateTime()) {
			holder.setCreateTime(new Date());
		}
		LOG.debug(" insert : " + holder);
		mapper.insert(holder);
		return holder;
	}

	/**
	 * . 批量新增对象
	 * 
	 * @param holders
	 *            待新增对象
	 * @return 新增行数
	 */
	public int insertBatch(List<T> holders) {
		if (holders != null && holders.size() > 0) {
			for (T holder : holders) {
				if (holder.getId() != null) {
					holder.setId(null);
				}
				holder.setIsdel(0);
				if (null == holder.getCreateTime()) {
					holder.setCreateTime(new Date());
				}
			}
			return mapper.insertBatch(holders);
		}
		return -1;
	}

	/**
	 * . 更新对象
	 * 
	 * @param holder
	 *            待更新对象
	 * @return 更新行数
	 */
	public int update(T holder) {
		if (holder.getUpdateUserId() == null) {
			// holder.setUpdateUserId(getCurrentUserId());
		}
		holder.setUpdateTime(new Date());
		return mapper.update(holder);
	}

	/**
	 * . 批量更新对象
	 * 
	 * @param holders
	 *            待更新对象
	 * @return 更新行数
	 */
	public int updateBatch(List<T> holders) {
		int count = 0;
		for (T holder : holders) {
			count += this.update(holder);
		}
		return count;
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
	 * . 分页总数查询
	 * 
	 * @param holder
	 *            查询条件
	 * @return 分页数
	 */
	public int getCountOfSummary(T holder) {
		return mapper.getCountOfSummary(holder);
	};

	public void export(T holder, HttpServletRequest request, HttpServletResponse response) {
		LOG.debug(" export " + holder.getClass().getName());
		int total = 10000;
		if (holder.getExport().getTotal() > 0 && holder.getExport().getTotal() <= 65536) {
			total = holder.getExport().getTotal();
		}
		Pages page = new Pages();
		page.setCurPage(1);
		page.setPageSize(total);
		holder.setPages(page);
		List<T> list = getGrid(holder).getList();
		PUtils.getDataToExcel(holder, list, request, response);
	}
	
	public ServiceResult<T> exportReport(T holder) {
		LOG.debug(" export " + holder.getClass().getName());
		int total = 10000;
		if (holder.getExport()!=null && holder.getExport().getTotal() > 0 && holder.getExport().getTotal() <= 65536) {
			total = holder.getExport().getTotal();
		}
		Pages page = new Pages();
		page.setCurPage(1);
		page.setPageSize(total);
		holder.setPages(page);
		ServiceResult<T> result = getGrid(holder);
		result.setHolder(holder);
		return result;
	}
}
