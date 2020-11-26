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

package chat.coder;

import java.io.File;
import java.net.URL;
import java.util.ResourceBundle;
import java.util.UUID;

import org.apache.log4j.Logger;

import chat.Login;
import chat.bean.BaseResult;
import chat.bean.ProjectModelHolder;
import chat.service.db.ProjectModelService;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.stage.DirectoryChooser;
import javafx.stage.Stage;

public class AddProModelController implements Initializable {
	
	private final static Logger LOG = Logger.getLogger(AddProModelController.class);
	
	@FXML
	private AnchorPane coderFxml;

	@FXML
	private TextField dbIP;
	@FXML
	private TextField dbName;
	@FXML
	private TextField userName;
	@FXML
	private PasswordField dbPwd;
	@FXML
	private TextField model;
	@FXML
	private TextField fileFolder;
	@FXML
	private TextField auto;
	@FXML
	private TextField version;
	@FXML
	private TextField packages;
	@FXML
	private TextField opt;
	
	@FXML
	private Button canelBtn;
	@FXML
	private Button saveBtn;

	@FXML
	private Button fileChooserBtn;

	final DirectoryChooser fileChooser = new DirectoryChooser();
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		dbIP.setText("192.168.3.131");
		dbName.setText("db");
		userName.setText("root");
		dbPwd.setText("root");
		model.setText("ecs");
		fileFolder.setText("d:/plugins");
		auto.setText("lvxh");
		version.setText("V100R002C01-SNAPSHOT");
		packages.setText("com.huaiye.plugin");
	}

	@FXML
	protected void saveProjectModel(ActionEvent event) {
		ProjectModelHolder _holder = new ProjectModelHolder();
		_holder.setId(UUID.randomUUID().toString());
		_holder.setIp(dbIP.getText());
		_holder.setAuthor(auto.getText());
		_holder.setCodeFolder(fileFolder.getText());
		_holder.setDbSchema(dbName.getText());
		_holder.setModelID(model.getText());
		_holder.setPackages(packages.getText());
		_holder.setPwd(dbPwd.getText());
		_holder.setUser(userName.getText());
		_holder.setVersion(version.getText());
		
		
		ProjectModelService service = new ProjectModelService();
		BaseResult result = service.insert(_holder);
		LOG.debug(" insert project model result " + result.getCode());
		if(result.getCode() == 0)
		{
			Stage stage = (Stage)saveBtn.getScene().getWindow();
			stage.close();
			Login.queryBtnA.fire();
		}
		else
		{
			Alert alert = new Alert(AlertType.ERROR);
			alert.setTitle("系统提示");
			alert.setHeaderText("增加数据失败！");
			alert.setContentText(result.getDesc());
			alert.initOwner((Stage)saveBtn.getScene().getWindow());
			alert.showAndWait();
		}
	}
	
	@FXML
	protected void cancelProjectModel(ActionEvent event) {
		Stage stage = (Stage)saveBtn.getScene().getWindow();
	    stage.close();
	}
	
	@FXML
	protected void fileChooser(ActionEvent event) {
		Stage stage = (Stage)fileChooserBtn.getScene().getWindow();
		
		File file = fileChooser.showDialog(stage);
		if (file != null) {
			fileFolder.setText(file.getAbsolutePath().replace("\\", "/"));
		}
	}

}
