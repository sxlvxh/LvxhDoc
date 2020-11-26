/*
 * . PlatUserService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platuser.serviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.huaiye.plugin.plat.platcontact.holder.PlatContactHolder;
import com.huaiye.plugin.plat.platcontact.service.PlatContactService;
import com.huaiye.plugin.plat.platcontactgroup.holder.PlatContactGroupHolder;
import com.huaiye.plugin.plat.platcontactgroup.service.PlatContactGroupService;
import com.huaiye.plugin.plat.platsms.holder.PlatSmsHolder;
import com.huaiye.plugin.plat.platsms.service.PlatSmsService;
import com.huaiye.plugin.plat.platuser.holder.PlatUserHolder;
import com.huaiye.plugin.plat.platuser.service.PlatUserService;
import com.huaiye.plugin.plat.platuserrole.holder.PlatUserRoleHolder;
import com.huaiye.plugin.plat.platuserrole.service.PlatUserRoleService;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.holder.BaseTreeHolder;
import com.lvxh.plugin.platform.impl.BaseBusinessServiceImpl;
import com.lvxh.plugin.platform.utils.PUtils;

/**
 * . 用户表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatUserServiceImpl extends BaseBusinessServiceImpl<PlatUserHolder> implements PlatUserService {

	@Autowired
	private PlatContactGroupService platContactGroupService;

	@Autowired
	private PlatUserRoleService platUserRoleService;
	
	@Autowired
	private PlatContactService platContactService;
	
	@Autowired
	private PlatSmsService platSmsService;
	
	@Override
	public BaseResult addUser(PlatUserHolder holder) {
		BaseResult result = new BaseResult();
		if (StringUtils.isNotEmpty(holder.getPassword())) {
			if (StringUtils.isEmpty(holder.getLoginName())) {
				holder.setLoginName(PUtils.getUUID());
			}
			holder.setUserCode(PUtils.getUUID());
			holder.setPassword(DigestUtils.sha256Hex(holder.getUserCode() + holder.getPassword()));
			PlatUserHolder _res = insert(holder);
			insertContactGroup(_res);
			result.setCode(0);
			result.setObj(_res);
			result.setDesc("操作成功");
		} else {
			result.setCode(1);
			result.setDesc("参数错误!");
		}
		return result;
	}

	public PlatContactGroupHolder insertContactGroup(PlatUserHolder holder) {
		PlatContactGroupHolder group = new PlatContactGroupHolder();
		group.setGroupName("联系人");
		group.setGroupIcon("/images/groupImg.png");
		group.setGroupType(2);
		group.setCreateUserId(holder.getCreateUserId());
		group.setGroupAdmin(holder.getUserCode());
		group.setUserCode(holder.getUserCode());
		group.setGroupCode(PUtils.getUUID());
		platContactGroupService.insert(group);
		
		PlatContactHolder contact = new PlatContactHolder();
		contact.setGroupCode(group.getGroupCode());
		contact.setUserCode(holder.getUserCode());
		contact.setIsdel(0);
		contact.setIsAdmin("0");
		contact.setFeiendStatus(0);
		contact.setFriendMark(holder.getName());
		contact.setFriendUserCode(holder.getUserCode());
		platContactService.insert(contact);
		return group;
	}

	@Override
	public BaseResult modifyUser(PlatUserHolder holder) {
		BaseResult result = new BaseResult();
		if (StringUtils.isNotEmpty(holder.getPassword())) {
			holder.setPassword(DigestUtils.sha256Hex(holder.getUserCode() + holder.getPassword()));
		}
		update(holder);
		result.setCode(0);
		result.setDesc("操作成功");
		return result;
	}

	@Override
	public BaseResult setUserRole(PlatUserHolder holder) {

		BaseResult result = new BaseResult();
		result.setCode(0);
		result.setDesc("操作成功");
		if (holder.getUserCode() == null) {
			result.setCode(1);
			result.setDesc("操作失败，用户编号不能为空！");
			return result;
		}
		PlatUserRoleHolder _role = new PlatUserRoleHolder();
		_role.setUserCode(holder.getUserCode());
		platUserRoleService.delete(_role);

		List<PlatUserRoleHolder> ll = new ArrayList<PlatUserRoleHolder>();
		List<BaseTreeHolder> treeList = holder.getTreeList();
		if (treeList != null) {
			for (BaseTreeHolder _tree : treeList) {
				PlatUserRoleHolder _r = new PlatUserRoleHolder();
				_r.setRoleId(Integer.parseInt(_tree.getId()));
				_r.setUserCode(holder.getUserCode());
				ll.add(_r);
			}
			platUserRoleService.insertBatch(ll);
		}
		return result;

	}

	@Override
	public boolean addFriend(PlatContactHolder holder, PlatUserHolder _user) {
		
		addUserToContact(holder, _user);
		
		PlatUserHolder _h = new PlatUserHolder();
		_h.setUserCode(holder.getUserCode());
		
		PlatUserHolder _u = get(_h);
		PlatContactHolder _c = new PlatContactHolder();
		_c.setUserCode(_user.getUserCode());
		_c.setFriendMark(_user.getName());
		addUserToContact(_c, _u);
		
		return true;
	
	}

	private void addUserToContact(PlatContactHolder holder, PlatUserHolder _user) {
		PlatContactGroupHolder _g = new PlatContactGroupHolder();
		_g.setGroupType(2);
		_g.setUserCode(_user.getUserCode());
		PlatContactGroupHolder group = platContactGroupService.get(_g);
		if(group == null)
		{
			group = insertContactGroup(_user);
		}
		PlatContactHolder _hh = new PlatContactHolder();
		BeanUtils.copyProperties(holder, _hh);
		_hh.setGroupCode(group.getGroupCode());
		_hh.setUserCode(_user.getUserCode());
		_hh.setFriendUserCode(holder.getUserCode());
		if(StringUtils.isNotBlank(holder.getFriendMark()))
		{
			_hh.setFriendMark(holder.getFriendMark());
		}else
		{
			PlatUserHolder _u = new PlatUserHolder();
			_u.setUserCode(holder.getUserCode());
			PlatUserHolder u = get(_u);
			if(u !=null)
			{
				_hh.setFriendMark(u.getName());
			}
		}
		_hh.setIsAdmin("1");
		_hh.setFeiendStatus(0);
		platContactService.insert(_hh);
	}

	@Override
	public boolean addCustomGroup(PlatContactGroupHolder holder, PlatUserHolder _user) {
		if(holder.getContactList() !=null && holder.getContactList().size() > 0)
		{
			if(StringUtils.isNotBlank(holder.getGroupCode()))
			{
				PlatContactGroupHolder _group = new PlatContactGroupHolder();
				_group.setGroupCode(holder.getGroupCode());
				PlatContactGroupHolder group = platContactGroupService.get(_group);
				if(group !=null)
				{
					List<PlatContactHolder> list = setCoustomContact(holder, _user, group);
					platContactService.insertBatch(list);
					
				}else
				{
					addNewGroup(holder, _user);
				}
			}else
			{
				addNewGroup(holder, _user);
			}
			
			return true;
		}
		return false;
	}

	private void addNewGroup(PlatContactGroupHolder holder, PlatUserHolder _user) {
		PlatContactGroupHolder group = new PlatContactGroupHolder();
		group .setGroupAdmin(_user.getUserCode());
		group.setGroupName("");
		group.setGroupIcon("/images/groupImg.png");
		group.setGroupType(1);
		group.setCreateUserId(_user.getId());
		group.setUserCode(_user.getUserCode());
		group.setGroupCode(PUtils.getUUID());
		
		List<PlatContactHolder> list = setCoustomContact(holder, _user, group);
		platContactGroupService.insert(group);
		platContactService.insertBatch(list);
	}

	private List<PlatContactHolder> setCoustomContact(PlatContactGroupHolder holder, PlatUserHolder _user,
			PlatContactGroupHolder group) {
		List<PlatContactHolder> list= new ArrayList<PlatContactHolder>();
		
		PlatContactHolder _c = new PlatContactHolder();
		_c.setGroupCode(group.getGroupCode());
		List<PlatContactHolder> clist = platContactService.getList(_c);
		Map<String,PlatContactHolder> map = new HashMap<String,PlatContactHolder>();
		if(clist !=null)
		{
			for(PlatContactHolder _contact : clist)
			{
			  map.put(_contact.getFriendUserCode(),_contact);
			}
		}
		int i=0;
		String groupName = "";
		for(PlatContactHolder _contact : holder.getContactList())
		{
			PlatContactHolder contact = new PlatContactHolder();
			contact.setGroupCode(group.getGroupCode());
			contact.setFriendUserCode(_contact.getUserCode());
			contact.setUserCode(_user.getUserCode());
			contact.setFriendMark(_contact.getFriendMark());
			
			if(StringUtils.isNotBlank(_contact.getFriendMark()))
			{
				contact.setFriendMark(_contact.getFriendMark());
			}else
			{
				PlatUserHolder _u = new PlatUserHolder();
				_u.setUserCode(_contact.getUserCode());
				PlatUserHolder u = get(_u);
				if(u !=null)
				{
					contact.setFriendMark(u.getName());
				}
			}
			
			contact.setIsAdmin("1");
			contact.setFeiendStatus(0);
			if(i>0)
			{
				groupName = groupName + "," + contact.getFriendMark();
			}else
			{
				groupName = groupName+_contact.getFriendMark();
			}
			if(_contact.getUserCode().equals(_user.getUserCode()))
			{
				contact.setIsAdmin("0");
			}
			if(map.get(contact.getFriendUserCode()) == null)
			{
				list.add(contact);
			}
			i++;
		}
		if(StringUtils.isBlank(group.getGroupName()))
		{
			group.setGroupName(groupName);
		}
		return list;
	}

	@Override
	public boolean deleteFriend(PlatContactHolder holder, PlatUserHolder _user) {
		PlatContactGroupHolder platContactGroup	= platContactGroupService.getCommonGroup(holder.getUserCode());
		if(platContactGroup !=null)
		{
			PlatContactHolder _c = new PlatContactHolder();
			_c.setGroupCode(platContactGroup.getGroupCode());
			_c.setFriendUserCode(_user.getUserCode());
			PlatContactHolder c = platContactService.get(_c);
			if(c!=null)
			{
				PlatContactHolder _temp = new PlatContactHolder();
				_temp.setId(c.getId());
				platContactService.delete(_temp);
			}
		}
		
		PlatContactGroupHolder platContactGroup1	= platContactGroupService.getCommonGroup(_user.getUserCode());
		if(platContactGroup1 !=null)
		{
			PlatContactHolder _c = new PlatContactHolder();
			_c.setGroupCode(platContactGroup1.getGroupCode());
			_c.setFriendUserCode(holder.getUserCode());
			PlatContactHolder c = platContactService.get(_c);
			if(c!=null)
			{
				PlatContactHolder _temp = new PlatContactHolder();
				_temp.setId(c.getId());
				platContactService.delete(_temp);
			}
		}
		PlatSmsHolder _sms = new PlatSmsHolder();
		_sms.setSrc(_user.getUserCode());
		_sms.setTarget(holder.getUserCode());
		_sms.setSmsType("chat");
		platSmsService.delete(_sms);
		
		PlatSmsHolder _sms1 = new PlatSmsHolder();
		_sms1.setSrc(holder.getUserCode());
		_sms1.setTarget(_user.getUserCode());
		_sms1.setSmsType("chat");
		platSmsService.delete(_sms1);
		
		return true;
	}

	@Override
	public boolean delGroupMember(PlatContactGroupHolder holder, PlatUserHolder _user) {
		if(StringUtils.isNotEmpty(holder.getGroupCode())) {
			for(PlatContactHolder bean : holder.getContactList()) {
				PlatContactHolder h = new PlatContactHolder();
				h.setGroupCode(holder.getGroupCode());
				h.setFriendUserCode(bean.getUserCode());
				platContactService.delete(h);
				
				PlatSmsHolder smsH = new PlatSmsHolder();
				smsH.setGroupCode(holder.getGroupCode());
				smsH.setTarget(bean.getUserCode());
				platSmsService.delete(smsH);
			}
			
			PlatContactHolder searchB = new PlatContactHolder();
			searchB.setGroupCode(holder.getGroupCode());
			List<PlatContactHolder> allMember = platContactService.getList(searchB);
			
			PlatContactGroupHolder  cgholder = new PlatContactGroupHolder();
			cgholder.setGroupCode(holder.getGroupCode());
			cgholder.setUserCode(_user.getUserCode());
			cgholder.setGroupType(1);
			
			int i = 0;
			String groupName = "";
			if(allMember.size() == 1) {
				PlatContactHolder ch  = new PlatContactHolder();
				ch.setGroupCode(holder.getGroupCode());
				platContactService.delete(ch);
				platContactGroupService.delete(cgholder);
				
				PlatSmsHolder smsH = new PlatSmsHolder();
				smsH.setGroupCode(holder.getGroupCode());
				platSmsService.delete(smsH);
			}else {
				for(PlatContactHolder contact : allMember) {
					if(i>0)
					{
						groupName = groupName + "," + contact.getFriendMark();
					}else
					{
						groupName = groupName+contact.getFriendMark();
					}
					i++;
				}
				PlatContactGroupHolder delh = platContactGroupService.get(cgholder);
				
				PlatContactGroupHolder updateHolder = new PlatContactGroupHolder();
				updateHolder.setGroupName(groupName);
				updateHolder.setId(delh.getId());
				platContactGroupService.update(updateHolder);
			}
		}
		return true;
	}

	@Override
	public boolean quitGroup(PlatContactGroupHolder holder, PlatUserHolder _user) {
		
		if(StringUtils.isNotBlank(holder.getGroupCode())) {
			PlatContactGroupHolder h = new PlatContactGroupHolder();
			h.setGroupCode(holder.getGroupCode());
			PlatContactGroupHolder a = platContactGroupService.get(h);
			if(a.getGroupAdmin().equals(_user.getUserCode())) {//如果是主持人
				platContactGroupService.delete(holder);
				PlatContactHolder dh = new PlatContactHolder();
				dh.setGroupCode(holder.getGroupCode());
				platContactService.delete(dh);
			}else {
				PlatContactHolder dh = new PlatContactHolder();
				dh.setFriendUserCode(holder.getUserCode());
				platContactService.delete(dh);
			}
		}else {
			return false;
		}
		
		return true;
	}

	@Override
	public boolean modifyGroup(PlatContactGroupHolder holder) {
		
		if(StringUtils.isNotEmpty(holder.getGroupCode())) {
			PlatContactGroupHolder h = new PlatContactGroupHolder();
			h.setGroupCode(holder.getGroupCode());
			PlatContactGroupHolder a = platContactGroupService.get(h);
			holder.setId(a.getId());
			platContactGroupService.update(holder);
		}else {
			return false;
		}
		
		return true;
	}

}
