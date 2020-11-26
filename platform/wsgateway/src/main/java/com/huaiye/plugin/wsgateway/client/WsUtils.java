package com.huaiye.plugin.wsgateway.client;

import java.io.File;
import java.io.RandomAccessFile;
import javax.annotation.PostConstruct;

import org.apache.commons.codec.binary.Base64;
import org.apache.cxf.endpoint.Client;
import org.apache.cxf.jaxws.endpoint.dynamic.JaxWsDynamicClientFactory;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.huaiye.plugin.wsgateway.bean.FileInfo;
import com.huaiye.plugin.wsgateway.config.Config;

/**
 * 创建一个WebService客户端，测试WebService服务端的可用性
 */
@Component
@Lazy //必须为Lazy，否则服务器会因循环等待而无法启动。
public class WsUtils {
    private static final Logger LOG = Logger.getLogger(WsUtils.class);
    
    private static final JaxWsDynamicClientFactory dcf = JaxWsDynamicClientFactory.newInstance();
    public static Gson gson = new Gson();
    
//    final static String wsdlUrl = "http://192.168.1.116:8082/wsgateway/webService/wsService?wsdl";
    protected  Client client;
    
    @Autowired
    Config conf;
   
    
    public WsUtils() {
        
    }
    
    @PostConstruct
    public void init() {
        String wsdlUrl=conf.gatewayWsUrl;
        client = dcf.createClient(wsdlUrl);

    }

//    public static void main(String[] args) throws IOException {
//        Properties p=new Properties();
//        p.load(Files.newInputStream(Paths.get("/home/huaiye/wrkspc/eclipse_wrkspc2/wsgateway/src/main/resources/conf.properties")));
//       Object s = p.get("FILE_SAVE_DIR");
//       System.out.print(s);
//    }
    public static void main(String[] args) {
        // CXF动态客户端工厂

        // WSDL文档url配置()
//        String wsdlUrl = "http://192.168.1.116:8082/wsgateway/webService/wsService?wsdl";
//        System.out.println(executor(wsdlUrl, "sendSieMsg", "sendSieMsg"));
//        System.out.println(executor(wsdlUrl, "sendTcpMsg", "sendTcpMsg"));
        long time = System.currentTimeMillis();
       
        File file2 = new File(args[0]);//"d:/soft/DaemonTools_10.5.1.230.exe"
        WsUtils util=new WsUtils();
        Config conf=new Config();
        util.conf=conf;
        conf.gatewayWsUrl="http://192.168.1.116:8082/wsgateway/webService/wsService?wsdl";
        util.init();
       
        boolean ff = util.upfile(file2);
        System.out.println(ff);
      
        System.out.println((System.currentTimeMillis() - time) / 1000);
    }

//    public static boolean upfile(String wsdlUrl, File file2) {
    public  boolean upfile(File file2) {
        RandomAccessFile file;
        boolean ff = false;
        try {
            file = new RandomAccessFile(file2.getAbsoluteFile(), "r");
            long size = file.length();
            int step = 1024 * 1024;
            file.seek(0);
          // System.out.println("--------------------- " + size);
           long offset=0;
            while (true) {
                FileInfo info = new FileInfo();
                info.setSize(size);
                info.setName(file2.getName());
                info.setSrcName(file2.getAbsolutePath());
				info.setStart(offset);
                byte[] b;
                if (step > size - file.getFilePointer()) {
                    b = new byte[(int) (size - file.getFilePointer())];
                }else
                {
                    b = new byte[step];
                }
                info.setLength(b.length);
                file.readFully(b);
                String str = Base64.encodeBase64String(b);
                info.setContent(str);
				offset+=b.length;
//                boolean t = executor(wsdlUrl, "upFile", gson.toJson(info));
	              boolean t = executor( "upFile", gson.toJson(info));
                if (t) {
                    file.seek(file.getFilePointer());
                    ff = true;
                } else {
                    ff = false;
                }
                //System.out.println(info.getLength());
                if (file.getFilePointer() >= size) {
                    break;
                }
            }

        } catch (Exception e) {
        	LOG.error(e.getMessage(), e);
            ff = false;
        }
        return ff;
    }

//    public static boolean executor(String method, String params) {
//       return executor(null,method,params);
//    }
//    public static boolean executor(String url, String method, String params) {
    public boolean executor(String method, String params) {
        LOG.debug( method +"::::" + params);
     

        boolean res = false;
        Object[] objects = null;
        try {
            // 获取CXF客户端
//            Client client = dcf.createClient(url);
            // 调用Web Service方法
            objects = client.invoke(method, params);
            if (objects.length > 0) {
                res = (boolean) objects[0];
            }
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
        }
        return res;
    }

}
