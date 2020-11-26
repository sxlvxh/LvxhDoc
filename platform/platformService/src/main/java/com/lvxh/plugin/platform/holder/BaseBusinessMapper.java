package com.lvxh.plugin.platform.holder;

import java.util.List;

/**
 * . Mapper接口定义
 * 
 * @version 1.0.0
 */
public interface BaseBusinessMapper<T extends BaseBusinessHolder> {

	/**
	 * . 删除对象
	 * 
	 * @param holder
	 *            待删除对象
	 * @return 删除行数
	 */
	int delete(T holder);

	/**
	 * . 分页总数查询
	 * 
	 * @param holder
	 *            查询条件
	 * @return 分页数
	 */
	int getCountOfSummary(T holder);

	/**
	 * . 无分页查询列表
	 * 
	 * @param holder
	 *            查询条件
	 * @return 对象列表
	 */
	List<T> getList(T holder);

	/**
	 * . 分页列表查询
	 * 
	 * @param holder
	 *            查询条件
	 * @return 分页对象列表
	 */
	List<T> getListOfSummary(T holder);

	/**
	 * . 新增对象
	 * 
	 * @param holder
	 *            待新增对象
	 * @return 新增行数
	 */
	int insert(T holder);
	
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

}
