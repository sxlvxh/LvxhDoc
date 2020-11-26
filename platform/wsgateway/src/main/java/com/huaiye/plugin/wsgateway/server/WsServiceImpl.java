package com.huaiye.plugin.wsgateway.server;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.BufferedOutputStream;

import org.apache.commons.codec.binary.Base64;
import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import com.huaiye.plugin.wsgateway.bean.FileInfo;
import com.huaiye.plugin.wsgateway.client.WsUtils;
import com.huaiye.plugin.wsgateway.config.Config;
import com.lvxh.plugin.netty.base.NettyCache;
import com.lvxh.plugin.netty.bean.Message;
import com.lvxh.plugin.sie.bean.SIEMessage;
import com.lvxh.plugin.sie.server.SIECache;

public class WsServiceImpl implements WsService,ApplicationContextAware {
	private static final Logger LOG = Logger.getLogger(WsServiceImpl.class);
	



    private ApplicationContext applicationContext;
    
    
    public void init() {
        Config conf=this.applicationContext.getBean(Config.class);
        File file=new File(conf.fileSaveDir);
        
        if(!file.exists())
        {
            file.mkdirs();
        }
    }
	
	@Override
	public boolean sendSieMsg(String msg) {
		try {
			LOG.debug(msg);
			SIEMessage bean = WsUtils.gson.fromJson(msg, SIEMessage.class);
			SIECache.sendSms(bean);
			return true;
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		return false;
		
	}

	@Override
	public boolean sendTcpMsg(String msg) {
		LOG.debug(msg);
		try {
			Message bean = WsUtils.gson.fromJson(msg, Message.class);
			NettyCache.wsToTcp(bean);
			return true;
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		return false;
	}

	@Override
	public  boolean upFile(String msg) {
		FileInfo info = WsUtils.gson.fromJson(msg, FileInfo.class);
//		File file = new File("d:/temp");
		Config conf=this.applicationContext.getBean(Config.class);
		File file=new File(conf.fileSaveDir);
		
//		if(!file.exists())
//		{
//			file.mkdirs();
//		}
		OutputStream out = null;
//		InputStream is = null;
		try {
			byte[] req = Base64.decodeBase64(info.getContent());
			String resultFileName=file.getAbsoluteFile()+"/" + info.getName();
			String resultFileName1=resultFileName;
			if(resultFileName.endsWith(".exe")) {
			    resultFileName1=resultFileName+".tmp" ; 
			}
			int bufSize=1024*2;
			out = new BufferedOutputStream(new FileOutputStream(resultFileName1, true),bufSize);
			out.write(req);
//			is = new ByteArrayInputStream(req);
//			byte[] buff = new byte[1024];
//			int len = 0;
//			while ((len = is.read(buff)) != -1) {
//				out.write(buff, 0, len);
//			}
//			System.out.println(info.getLength());

			out.flush();
           if((!resultFileName.equals(resultFileName1)) && info.getStart()+info.getLength()==info.getSize()) {
               new File(resultFileName1).renameTo(new File(resultFileName));
           }
//			out.close();
		} catch (Exception e) {
			//log.error(e.getMessage(), e);
		    LOG.error("",e);
		} finally {
//			if (is != null) {
//				try {
//					is.close();
//				} catch (IOException e) {
//					//log.error(e.getMessage(), e);
//				}
//			}
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {
					//log.error(e.getMessage(), e);
				}
			}
		}
		
		
		return true;
	}
	
	
	/**
	 * @author huangwenhai
	 */
	/*
	@Override
    public  boolean upFile1(String msg) {
        FileInfo info = WsUtils.gson.fromJson(msg, FileInfo.class);
        File file = new File("d:/temp");
      
        if(!file.exists())
        {
            file.mkdirs();
        }
        try (RandomAccessFile raf = new RandomAccessFile(file.getAbsoluteFile()+"/" + info.getName(),
                    "rw");){
            
            long offset=info.getStart();
            raf.seek(offset);

            byte[] req = Base64.decodeBase64(info.getContent());
            raf.write(req);

        } catch (FileNotFoundException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
      
        return true;
    }*/

	@Override
	public boolean delFile(String msg) {
		FileInfo info = WsUtils.gson.fromJson(msg, FileInfo.class);
		File file = new File(info.getFilePath());
		if(file.exists())
		{
			return file.delete();
		}
		return true;
	}

//    public Config getConf() {
//        return conf;
//    }
//
//    public void setConf(Config conf) {
//        this.conf = conf;
//    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext)
            throws BeansException {
       this.applicationContext=applicationContext;
        
    }


}