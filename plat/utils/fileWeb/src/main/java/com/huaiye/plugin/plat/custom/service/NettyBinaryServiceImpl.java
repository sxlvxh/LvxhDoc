package com.huaiye.plugin.plat.custom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.huaiye.plugin.plat.custom.controller.UploadController;
import com.huaiye.plugin.plat.platfiles.holder.PlatFilesHolder;
import com.huaiye.plugin.plat.platfiles.service.PlatFilesService;
import com.lvxh.plugin.websocket.BinaryBean;
import com.lvxh.plugin.websocket.NettyBinaryService;

@Service
public class NettyBinaryServiceImpl implements NettyBinaryService {

	@Autowired
	private PlatFilesService platFilesService;
	
	@Override
	public void excutor(BinaryBean bean) {
		try {
			PlatFilesHolder holder = new PlatFilesHolder();
			holder.setFileCode(bean.getCode());
			holder.setFileUrl("/userfiles"+ bean.getFilePath().split("userfiles")[1]);
			holder.setFileName(bean.getName());
			holder.setOneType(UploadController.MAP.get(bean.getFileType()));
			holder.setFileType(bean.getFileType());
			holder.setUserCode(bean.getUserCode());
			holder.setUpUserCode(bean.getUserCode());
			holder.setFileSize(bean.getSize());
			platFilesService.insert(holder);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
