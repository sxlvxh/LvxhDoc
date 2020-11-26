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

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.huaiye.plugin.plat.util.CodeGenModel;
import com.huaiye.plugin.plat.util.ModelSqlHolder;
import com.huaiye.plugin.util.CodeGenEcsModel;

import chat.Login;
import chat.bean.ProjectModelHolder;
import chat.service.db.ModelSqlService;
import chat.service.db.ProjectModelService;
import javafx.application.Platform;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.geometry.Insets;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Button;
import javafx.scene.control.ButtonType;
import javafx.scene.control.ComboBox;
import javafx.scene.control.ContentDisplay;
import javafx.scene.control.TableCell;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.HBox;
import javafx.stage.Modality;
import javafx.stage.Stage;
import javafx.util.Callback;

public class CoderController implements Initializable {
	private final static Logger LOG = Logger.getLogger(CoderController.class);
	
	@FXML
	private AnchorPane coderFxml;
	@FXML
	private Button search;
	
	@FXML
	private Button addSqlBtn;
	
	@FXML
	private Button searchSql;
	
	@FXML
	private TextField selectModel;
	
	@FXML
	private ComboBox<ProjectModelHolder> selectSqlModel;
	
	@FXML
	private TableColumn<ProjectModelHolder, String> dbIP;
	@FXML
	private TableColumn<ProjectModelHolder, String> dbName;
	@FXML
	private TableColumn<ProjectModelHolder, String> userName;
	/*@FXML
	private TableColumn<ProjectModelHolder, String> dbPwd;*/
	@FXML
	private TableColumn<ProjectModelHolder, String> model;
	/*@FXML
	private TableColumn<ProjectModelHolder, String> prefix;*/
	@FXML
	private TableColumn<ProjectModelHolder, String> fileFolder;
	@FXML
	private TableColumn<ProjectModelHolder, String> auto;
	@FXML
	private TableColumn<ProjectModelHolder, String> version;
	@FXML
	private TableColumn<ProjectModelHolder, String> packages;
	@FXML
	private TableColumn<ProjectModelHolder, String> opt;

	@FXML
	private TableColumn<ModelSqlHolder, String> sqlDesc;
	@FXML
	private TableColumn<ModelSqlHolder, String> className;
	@FXML
	private TableColumn<ModelSqlHolder, String> tableName;
	@FXML
	private TableColumn<ModelSqlHolder, String> strSql;
	@FXML
	private TableColumn<ModelSqlHolder, String> modelSqlId;
	
	@FXML
	private TableColumn<ModelSqlHolder, String> createTime;
	
	
	@FXML
	private TableColumn<ModelSqlHolder, String> opts;
	
	
	@FXML
	private TableView<ProjectModelHolder> tableID;
	
	@FXML
	private TableView<ModelSqlHolder> tableSqlID;

	private final ObservableList<ProjectModelHolder> data = FXCollections.observableArrayList();
	
	private final ObservableList<ModelSqlHolder> sqlData = FXCollections.observableArrayList();

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		initSearchTable();
		ProjectModelService pms = new ProjectModelService();
		List<ProjectModelHolder> list = new ArrayList<ProjectModelHolder>();
		//list.add(new ProjectModelHolder());
		List<ProjectModelHolder> ll = pms.getMobelList();
		list.addAll(ll);
		selectSqlModel.getItems().addAll(list);
		selectSqlModel.getSelectionModel().select(0);
		
		initModelSql();
		
		Login.queryBtnA = search;
		Login.queryBtnB = searchSql;
	}

	private void initModelSql() {
		ModelSqlHolder _holder = new ModelSqlHolder();
		ModelSqlService mss = new ModelSqlService();
		ProjectModelHolder _model = selectSqlModel.getValue();
		_holder.setModelID(_model == null ? "" : _model.getModelID());
		List<ModelSqlHolder> msl = mss.getList(_holder);
		sqlData.clear();
		sqlData.addAll(msl);
		tableSqlID.setItems(sqlData);
		
		sqlDesc     .setCellValueFactory(new PropertyValueFactory<ModelSqlHolder, String>("comment"))  ;
		className   .setCellValueFactory(new PropertyValueFactory<ModelSqlHolder, String>("className"));
		tableName   .setCellValueFactory(new PropertyValueFactory<ModelSqlHolder, String>("name"))  ;
		/*strSql    .setCellValueFactory(new PropertyValueFactory<ModelSqlHolder, String>("sql"));*/
		modelSqlId  .setCellValueFactory(new PropertyValueFactory<ModelSqlHolder, String>("modelID"));
		createTime  .setCellValueFactory(new PropertyValueFactory<ModelSqlHolder, String>("createTime"));
		opts        .setCellValueFactory(new PropertyValueFactory<ModelSqlHolder, String>("id"));
		opts.setCellFactory(
				new Callback<TableColumn<ModelSqlHolder, String>, TableCell<ModelSqlHolder, String>>() {

					@Override
					public TableCell<ModelSqlHolder, String> call(TableColumn<ModelSqlHolder, String> param) {

						TableCell<ModelSqlHolder, String> cell = new TableCell<ModelSqlHolder, String>() {
							public HBox paddedButton = new HBox();
							Button delBtn = new Button("删除");
							Button editBtn = new Button("修改");
							{
								paddedButton.setSpacing(5);
							    paddedButton.getChildren().addAll(delBtn, editBtn); 
							}
							
							@Override
							protected void updateItem(String item, boolean empty) {
								super.updateItem(item, empty);
								if (StringUtils.isNotBlank(item)) {
									paddedButton.setPadding(new Insets(2));
									delBtn.setOnMouseClicked((m) -> {
										Alert alert = new Alert(AlertType.CONFIRMATION);
										alert.setTitle("系统提示");
										alert.setHeaderText("是否删除当前记录？");
										alert.initOwner((Stage)delBtn.getScene().getWindow());
										
										Optional<ButtonType> result = alert.showAndWait();
										if (result.get() == ButtonType.OK){
											ModelSqlHolder _holder =new ModelSqlHolder();
											_holder.setId(item);
											ModelSqlService service = new ModelSqlService();
											service.delete(_holder);
											Login.queryBtnB.fire();
											
										} else {
											
										}
									});
									editBtn.setOnMouseClicked((m) -> {

										for(ModelSqlHolder _pro : msl)
										{
											if(_pro.getId().equals(item))
											{
												try {
													FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("updateSql.fxml"));
													Parent root = fxmlLoader.load();
													UpdateSqlController controller = fxmlLoader.getController(); 
													Stage secondStage = new Stage();
													Scene secondScene = new Scene(root, 612, 513);
													secondStage.setTitle("修改项目");
													Login.setWinIcon(secondStage);
													secondStage.initModality(Modality.APPLICATION_MODAL);
													secondStage.setScene(secondScene);
													secondStage.setResizable(false);
													secondStage.show();
													controller.update(_pro);
												} catch (Exception e) {
													LOG.error(e.getMessage(), e);
												}

											}
										}
									
									});
									setContentDisplay(ContentDisplay.GRAPHIC_ONLY);
									setGraphic(paddedButton);
								} else {
									setGraphic(null);
								}

							}
						};
						return cell;
					}
				});
	}

	private void initSearchTable() {
		initProjectModel();
	}

	private void initProjectModel() {
		data.clear();
		ProjectModelHolder _holder = new ProjectModelHolder();
		ProjectModelService pms = new ProjectModelService();
		_holder.setModelID(selectModel.getText());
		List<ProjectModelHolder> list = pms.getList(_holder);
		data.addAll(list);
		tableID.setItems(data);
		dbIP.setCellValueFactory(new PropertyValueFactory<ProjectModelHolder, String>("ip"));
		dbIP.setCellValueFactory(new PropertyValueFactory<ProjectModelHolder, String>("ip"));
		dbName.setCellValueFactory(new PropertyValueFactory<ProjectModelHolder, String>("dbSchema"));
		userName.setCellValueFactory(new PropertyValueFactory<ProjectModelHolder, String>("user"));
		/*dbPwd.setCellValueFactory(new PropertyValueFactory<ProjectModelHolder, String>("pwd"));*/
		model.setCellValueFactory(new PropertyValueFactory<ProjectModelHolder, String>("modelID"));
		/*prefix.setCellValueFactory(new PropertyValueFactory<ProjectModelHolder, String>("urlPrefix"));*/
		fileFolder.setCellValueFactory(new PropertyValueFactory<ProjectModelHolder, String>("codeFolder"));
		auto.setCellValueFactory(new PropertyValueFactory<ProjectModelHolder, String>("author"));
		version.setCellValueFactory(new PropertyValueFactory<ProjectModelHolder, String>("version"));
		packages.setCellValueFactory(new PropertyValueFactory<ProjectModelHolder, String>("packages"));
		opt.setCellValueFactory(new PropertyValueFactory<ProjectModelHolder,
		 String>("id"));
		opt.setCellFactory(
				new Callback<TableColumn<ProjectModelHolder, String>, TableCell<ProjectModelHolder, String>>() {

					@Override
					public TableCell<ProjectModelHolder, String> call(TableColumn<ProjectModelHolder, String> param) {

						TableCell<ProjectModelHolder, String> cell = new TableCell<ProjectModelHolder, String>() {
							public HBox paddedButton = new HBox();
							Button delBtn = new Button("删除");
							Button editBtn = new Button("修改");
							Button codegen = new Button("生成");
							Button codegen1 = new Button("生成老ECS代码");
							{
								paddedButton.setSpacing(5);
							    paddedButton.getChildren().addAll(delBtn, editBtn,codegen,codegen1); 
							}
							
							@Override
							protected void updateItem(String item, boolean empty) {
								super.updateItem(item, empty);
								if (StringUtils.isNotBlank(item)) {
									paddedButton.setPadding(new Insets(3));
									delBtn.setOnMouseClicked((m) -> {
										deleteProjectModel(item);
									});
									editBtn.setOnMouseClicked((m) -> {
										editProjectModelEvent(list, item);
									});
									codegen.setOnMouseClicked((m) -> {
										codegenEvent(list, item);
									});
									codegen1.setOnMouseClicked((m) -> {
										codegen1Event(list, item);
									});
									
									setContentDisplay(ContentDisplay.GRAPHIC_ONLY);
									setGraphic(paddedButton);
								} else {
									setGraphic(null);
								}

							}

							private void codegenEvent(List<ProjectModelHolder> list, String item) {
								for(ProjectModelHolder _pro : list)
								{
									if(_pro.getId().equals(item))
									{
										_pro.setUrlPrefix("");
										new CodeGenModel(_pro).executeFtl();
										
										Platform.runLater(()->{
											try {
												Desktop.getDesktop().open(new File(_pro.getCodeFolder()));
											} catch (IOException e) {
												LOG.error(e.getMessage(), e);
											}
										});
										
										
										Alert alert = new Alert(AlertType.CONFIRMATION);
										alert.setTitle("系统提示");
										alert.setHeaderText("代码生成完成！");
										alert.initOwner((Stage)delBtn.getScene().getWindow());
										alert.showAndWait();
										
									}
								}
							}
							
							private void codegen1Event(List<ProjectModelHolder> list, String item) {
								for(ProjectModelHolder _pro : list)
								{
									if(_pro.getId().equals(item))
									{
										_pro.setUrlPrefix("");
										new CodeGenEcsModel(_pro).executeFtl();
										
										Platform.runLater(()->{
											try {
												Desktop.getDesktop().open(new File(_pro.getCodeFolder()));
											} catch (IOException e) {
												LOG.error(e.getMessage(), e);
											}
										});
										
										
										Alert alert = new Alert(AlertType.CONFIRMATION);
										alert.setTitle("系统提示");
										alert.setHeaderText("代码生成完成！");
										alert.initOwner((Stage)delBtn.getScene().getWindow());
										alert.showAndWait();
										
									}
								}
							}


							private void editProjectModelEvent(List<ProjectModelHolder> list, String item) {
								for(ProjectModelHolder _pro : list)
								{
									if(_pro.getId().equals(item))
									{
										try {
											FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("updateProModel.fxml"));
											Parent root = fxmlLoader.load();
											UpdateProModelController controller = fxmlLoader.getController(); 
											Stage secondStage = new Stage();
											Scene secondScene = new Scene(root, 650, 211);
											secondStage.setTitle("修改项目");
											Login.setWinIcon(secondStage);
											secondStage.initModality(Modality.APPLICATION_MODAL);
											secondStage.setScene(secondScene);
											secondStage.setResizable(false);
											secondStage.show();
											controller.update(_pro);
										} catch (Exception e) {
											LOG.error(e.getMessage(), e);
										}

									}
								}
							}

							private void deleteProjectModel(String item) {
								Alert alert = new Alert(AlertType.CONFIRMATION);
								alert.setTitle("系统提示");
								alert.setHeaderText("是否删除当前记录？");
								alert.initOwner((Stage)delBtn.getScene().getWindow());
								
								Optional<ButtonType> result = alert.showAndWait();
								if (result.get() == ButtonType.OK){
									ProjectModelHolder _holder =new ProjectModelHolder();
									_holder.setId(item);
									ProjectModelService service = new ProjectModelService();
									service.delete(_holder);
									Login.queryBtnA.fire();
									
								} else {
									
								}
							}
						};
						return cell;
					}
				});
	}

	@FXML
	protected void addProjectModel(ActionEvent event) {
		try {
			Parent root = FXMLLoader.load(getClass().getResource("addProModel.fxml"));
			Stage secondStage = new Stage();
			Scene secondScene = new Scene(root, 650, 211);
			secondStage.setTitle("增加项目");
			Login.setWinIcon(secondStage);
			secondStage.initModality(Modality.APPLICATION_MODAL);
			secondStage.setScene(secondScene);
			secondStage.setResizable(false);
			secondStage.show();
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}

	}
	@FXML
	protected void addSqlEvent(ActionEvent event) {
		try {
			Parent root = FXMLLoader.load(getClass().getResource("addSql.fxml"));
			Stage secondStage = new Stage();
			Scene secondScene = new Scene(root, 650, 512);
			secondStage.setTitle("增加项目");
			Login.setWinIcon(secondStage);
			secondStage.initModality(Modality.APPLICATION_MODAL);
			secondStage.setScene(secondScene);
			secondStage.setResizable(false);
			secondStage.show();
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}

	}

	@FXML
	protected void searchBtnEvent(ActionEvent event) {
		initSearchTable();
	}
	
	@FXML
	protected void searchSqlBtnEvent(ActionEvent event) {
		initModelSql();
		
//		Platform.runLater(()->{
//			try {
//				Desktop.getDesktop().open(new File("C:/Program Files (x86)/Tencent/QQ/Bin/QQScLauncher.exe"));
//			} catch (IOException e) {
//				LOG.error(e.getMessage(), e);
//			}
//		});
	}

}
