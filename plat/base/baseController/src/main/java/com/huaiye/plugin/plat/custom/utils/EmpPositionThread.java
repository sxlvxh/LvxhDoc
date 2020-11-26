package com.huaiye.plugin.plat.custom.utils;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.huaiye.plugin.plat.platpositionhis.holder.PlatPositionHisHolder;
import com.huaiye.plugin.plat.platpositionhis.service.PlatPositionHisService;
import com.lvxh.plugin.platform.utils.PUtils;

public class EmpPositionThread implements Runnable {
	
	private static final Logger LOG = Logger.getLogger(EmpPositionThread.class);

	private PlatPositionHisService PlatPositionHisService;
	
	public EmpPositionThread(PlatPositionHisService PlatPositionHisService) {
		super();
		this.PlatPositionHisService = PlatPositionHisService;
	}

	@Override
	public void run() {
         while(true)
         {
        	 try {
				List<PlatPositionHisHolder> list  = new ArrayList<PlatPositionHisHolder>();
				int size = PlatUtils.drainTo(list, 100);
				if(size > 0 )
				{
					PlatPositionHisService.insertBatch(list);
					final List<PlatPositionHisHolder> _list = list;
					PUtils.submit(new Runnable() {
						
						@Override
						public void run() {
							sendGspToUser(_list);
						}
					});
				}
				if(size < 10)
				{
					LOG.debug(" no data sleep 1000 ! ");
					Thread.sleep(1000);
				}
				
			} catch (Exception e) {
				LOG.error(e.getMessage(),e);
			}
         }
	}

	public void sendGspToUser(List<PlatPositionHisHolder> list){
			// @TODO;
	}

}
