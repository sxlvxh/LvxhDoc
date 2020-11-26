package com.huaiye.plugin.plat.platmenu.holder;

import java.io.Serializable;
import java.util.List;

public class RoleDataBean implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 8133274012661538925L;
	
	private List<?> blist;
	private List<?> flist;
	private PlatMenuHolder menu;

	public List<?> getBlist() {
		return blist;
	}


	public void setBlist(List<?> blist) {
		this.blist = blist;
	}


	public List<?> getFlist() {
		return flist;
	}


	public void setFlist(List<?> flist) {
		this.flist = flist;
	}


	public PlatMenuHolder getMenu() {
		return menu;
	}


	public void setMenu(PlatMenuHolder menu) {
		this.menu = menu;
	}


	@Override
	public String toString() {
		return "RoleDataBean [blist=" + blist + ", flist=" + flist + ", menu="
				+ menu + "]";
	}

}
