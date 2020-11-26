package com.lvxh.plugin.platform.utils;

import java.io.IOException; 

import javax.servlet.ServletException; 
import javax.servlet.http.HttpServletRequest; 
import javax.servlet.http.HttpServletResponse; 
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

/**
 * @author wucr
 *
 */
public class AuthImage extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet  {

    static final long serialVersionUID = 1L; 
    private static final Logger LOG = Logger.getLogger(AuthImage.class);
    
    public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
        response.setHeader("Pragma", "No-cache"); 
        response.setHeader("Cache-Control", "no-cache"); 
        response.setDateHeader("Expires", 0); 
        response.setContentType("image/jpeg"); 
        
        LOG.debug(" build new AuthImage...");
        //生成随机字串 
        String verifyCode = PUtils.generateVerifyCode(4); 
        //存入会话session 
        HttpSession session = request.getSession(true); 
        //删除以前的
        session.removeAttribute("verifyCode");
        session.setAttribute("verifyCode", verifyCode.toLowerCase()); 
        //生成图片 
        int w = 100, h = 30; 
        PUtils.outputImage(w, h, response.getOutputStream(), verifyCode); 
   
    } 
}
