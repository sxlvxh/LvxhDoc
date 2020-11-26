package com.huaiye.plugin.plat.custom.utils;

import javax.servlet.http.HttpServletRequest;

import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.lvxh.plugin.platform.service.Constants;

public class FilesUtils {
	
	
	public static PlatUserListHolder getSessionUser(HttpServletRequest req) {
		Object obj = req.getSession().getAttribute(Constants.LOGIN_USER);
		if (obj != null) {
			return (PlatUserListHolder) obj;
		} else {
			return null;
		}

	}

}
