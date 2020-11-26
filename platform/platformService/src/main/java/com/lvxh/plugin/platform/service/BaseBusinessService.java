package com.lvxh.plugin.platform.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;
import com.lvxh.plugin.platform.holder.ServiceResult;

/**
 * . Service抽象接口定义
 * 
 * @version 1.0.0
 */
public interface BaseBusinessService<T extends BaseBusinessHolder> {

	

	/**
	 * . 删除对象
	 * 
	 * @param holder
	 *            待删除对象
	 * @return 删除行数
	 */
	int delete(T holder);
	
	/**
	 * . 删除对象
	 * 
	 * @param holder
	 *            待删除对象
	 * @return 删除行数
	 */
	 int deleteLogic(T holder);

	/**
	 * . 批量删除对象
	 * 
	 * @param holder
	 *            待删除对象	 * @return 删除行数
	 */
	int deleteBatch(List<T> holders);
	
	
	/**
	 * . 批量假删除对象
	 * 
	 * @param holder
	 *            待删除对象	 * @return 删除行数
	 */
	int deleteLogicBatch(List<T> holders);
	

	/**
	 * . 删除对象(假删除)
	 * 
	 * @param holder
	 *            待删除对象
	 * @return 删除行数
	 */
	int deleteDummy(T holder);

	/**
	 * . 查询单条记录
	 * 
	 * @param holder
	 *            查询条件
	 * @return 对象列表
	 */
	T get(T holder);


	/**
	 * . 分页查询列表
	 * 
	 * @param holder
	 *            查询条件
	 * @return 对象列表
	 */
	ServiceResult<T> getGrid(T holder);

	/**
	 * . 无分页查询列表
	 * 
	 * @param holder
	 *            查询条件
	 * @return 对象列表
	 */
	List<T> getList(T holder);

	/**
	 * . 新增对象
	 * 
	 * @param holder
	 *            待新增对象
	 * @return 新增行数
	 */
	 T insert(T holder);

	/**
	 * . 批量新增对象
	 * 
	 * @param holders
	 *            待新增对象
	 * @return 新增行数
	 */
	int insertBatch(List<T> holders) ;

	
	/**
	 * . 更新对象
	 * 
	 * @param holder
	 *            待更新对象
	 * @return 更新行数
	 */
	int update(T holder);

	/**
	 * . 批量更新对象
	 * 
	 * @param holders
	 *            待更新对象
	 * @return 更新行数
	 */
	int updateBatch(List<T> holders);
	
	/**
	 * . 分页总数查询
	 * 
	 * @param holder
	 *            查询条件
	 * @return 分页数
	 */
	int getCountOfSummary(T holder);



	void export(T holder, HttpServletRequest request, HttpServletResponse response);
	
	ServiceResult<T> exportReport(T holder);
}