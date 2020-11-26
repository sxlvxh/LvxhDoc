package cn.hylexus.jt808.service;

import cn.hylexus.jt808.vo.req.LocationInfoUploadMsg;

public class TestJt808Service implements JT808Service {

	@Override
	public void executor(LocationInfoUploadMsg holder) {
		System.out.println(" ============================= " + holder);

	}

}
