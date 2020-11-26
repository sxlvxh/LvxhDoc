/*
 * Copyright (c) 2011, 2014 Oracle and/or its affiliates.
 * All rights reserved. Use is subject to license terms.
 *
 * This file is available and licensed under the following license:
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *  - Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  - Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in
 *    the documentation and/or other materials provided with the distribution.
 *  - Neither the name of Oracle nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

package chat.netty;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;
import java.util.UUID;

import org.apache.log4j.Logger;

import chat.netty.bean.MessageContent;
import chat.netty.client.NettyClient;
import chat.netty.service.NettyClientService;
import chat.netty.service.impl.NettyClientServiceImpl;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;

public class NettyController implements Initializable {
	private final static Logger LOG = Logger.getLogger(NettyController.class);

	@FXML
	private Button login;
	
	@FXML
	private Button send;
	
	@FXML
	private Button logout;
	
	@FXML
	private TextField serverIp;
	@FXML
	private TextField serverPort;
	@FXML
	private TextField target;
	
	@FXML
	private TextField src;
	
	@FXML
	private TextArea content;
	
	@FXML
	private TextArea recvMsg;
	
	private NettyClient client;

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
	}

	@FXML
	protected void loginEvent(ActionEvent event) {
		try {
			client = new NettyClient();
			NettyClientService service  = new NettyClientServiceImpl(this);
			client.start(serverIp.getText(),src.getText(),Integer.parseInt(serverPort.getText()),service);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}

	}
	@FXML
	protected void sendEvent(ActionEvent event) {
		try {
			List<String> list = new ArrayList<String>();
			//list.add(target.getText());
			String st[] = target.getText().split(",");
			for(String ss:st)
			{
				list.add(ss);
			}
			MessageContent msg = new MessageContent();
			msg.setContent(content.getText());
			msg.setSrc(src.getText());
			msg.setTargets(list);
			msg.setUid(UUID.randomUUID().toString());
			msg.setGroupCode(null);
			msg.setMsgType("chat");
			client.sendMsg(msg);
			
			recvMsg.appendText(NettyClient.GSON.toJson(msg));
			recvMsg.appendText(System.getProperty("line.separator"));
			
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}

	}

	@FXML
	protected void  logoutEvent() {
		client.close();
	}

	public Button getLogin() {
		return login;
	}

	public void setLogin(Button login) {
		this.login = login;
	}

	public Button getSend() {
		return send;
	}

	public void setSend(Button send) {
		this.send = send;
	}

	public Button getLogout() {
		return logout;
	}

	public void setLogout(Button logout) {
		this.logout = logout;
	}

	public TextField getServerIp() {
		return serverIp;
	}

	public void setServerIp(TextField serverIp) {
		this.serverIp = serverIp;
	}

	public TextField getServerPort() {
		return serverPort;
	}

	public void setServerPort(TextField serverPort) {
		this.serverPort = serverPort;
	}

	public TextField getTarget() {
		return target;
	}

	public void setTarget(TextField target) {
		this.target = target;
	}

	public TextField getSrc() {
		return src;
	}

	public void setSrc(TextField src) {
		this.src = src;
	}

	public TextArea getContent() {
		return content;
	}

	public void setContent(TextArea content) {
		this.content = content;
	}

	public TextArea getRecvMsg() {
		return recvMsg;
	}

	public void setRecvMsg(TextArea recvMsg) {
		this.recvMsg = recvMsg;
	}
	
}
