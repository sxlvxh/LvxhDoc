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

import com.huaiye.plugin.plat.util.LUtil;
import com.huaiye.plugin.plat.util.ModelSqlHolder;

import chat.Login;
import chat.service.db.ModelSqlService;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.stage.DirectoryChooser;
import javafx.stage.Stage;

public class UpdateSqlController implements Initializable {
	@FXML
	private AnchorPane coderFxml;

	@FXML
	private TextField sqlDesc;
	@FXML
	private TextField className;
	@FXML
	private TextField tableName;
	@FXML
	private TextArea strSql;
	@FXML
	private Label modelSqlId;
	
	@FXML
	private Button canelBtn;
	@FXML
	private Button saveBtn;

	@FXML
	private Button fileChooserBtn;
	
	private String id;

	final DirectoryChooser fileChooser = new DirectoryChooser();
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
	}

	@FXML
	protected void saveProjectModel(ActionEvent event) {
		ModelSqlHolder _holder = new ModelSqlHolder();
		_holder.setClassName(className.getText());
		_holder.setComment(LUtil.getUTF8(sqlDesc.getText()));
		_holder.setModelID(modelSqlId.getText());
		_holder.setName(tableName.getText());
		_holder.setSql(strSql.getText());
		_holder.setId(id);
		
		
		ModelSqlService service = new ModelSqlService();
		service.modify(_holder);
		
		Stage stage = (Stage)saveBtn.getScene().getWindow();
	    stage.close();
	    
	    Login.queryBtnB.fire();
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
			//fileFolder.setText(file.getAbsolutePath().replace("\\", "/"));
		}
	}

	public void update(ModelSqlHolder holder)
	{
		
		sqlDesc.setText(holder.getComment());
		className.setText(holder.getClassName());
		tableName.setText(holder.getName());
		strSql.setText(holder.getSql());
		modelSqlId.setText(holder.getModelID());		
		id = holder.getId();
	}
}
