package com.huaiye.plugin.wsgateway.server;

import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

@WebService
@SOAPBinding(style = Style.RPC)
public interface WsService {
    
    boolean sendSieMsg(String msg);
    boolean sendTcpMsg(String msg);
    boolean upFile(String msg);
    boolean delFile(String msg);
}