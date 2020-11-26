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

package chat.setting;

import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ResourceBundle;

import org.apache.log4j.Logger;

import chat.Login;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

public class SettingController implements Initializable {
	private final static Logger LOG = Logger.getLogger(SettingController.class);

	@FXML
	private Button saveBtn;
	
	@FXML
	private Button testBtn;
	
	@FXML
	private TextField dbIP;
	@FXML
	private TextField dbName;
	@FXML
	private TextField dbUser;
	
	@FXML
	private TextField dbPwd;
	

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		dbIP.setText(Login.CONF_PRO.getProperty("db.host"));
		dbName.setText(Login.CONF_PRO.getProperty("db.schema"));
		dbUser.setText(Login.CONF_PRO.getProperty("db.user"));
		dbPwd.setText(Login.CONF_PRO.getProperty("db.password"));
	}

	@FXML
	protected void saveEvent(ActionEvent event) {
		try {
			
			Login.CONF_PRO.put("db.host", dbIP.getText());
			Login.CONF_PRO.put("db.schema", dbName.getText());
			Login.CONF_PRO.put("db.user", dbUser.getText());
			Login.CONF_PRO.put("db.password", dbPwd.getText());
			
			Login.savePro();
			
			Alert alert = new Alert(AlertType.CONFIRMATION);
			alert.setTitle("系统提示");
			alert.setHeaderText("操作成功！");
			alert.initOwner((Stage)saveBtn.getScene().getWindow());
			alert.showAndWait();
			
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}

	}
	@FXML
	protected void testEvent(ActionEvent event) {
		try {
			Alert alert = new Alert(AlertType.CONFIRMATION);
			alert.setTitle("系统提示");
			if(getConn()!=null)
			{
				
				alert.setHeaderText("连接数据库成功！");
			}
			else
			{
				alert.setHeaderText("连接数据库失败！");

			}
			alert.initOwner((Stage)saveBtn.getScene().getWindow());
			alert.showAndWait();
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}

	}

	public Connection getConn() {
		Connection conn = null;
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			conn = DriverManager.getConnection(
					"jdbc:mysql://" + dbIP.getText() + ":"+Login.CONF_PRO.getProperty("db.port")+"/"
							+ dbName.getText(),
					dbUser.getText(), dbPwd.getText());
			LOG.debug(" connection successful! ");
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		return conn;
	}
}
