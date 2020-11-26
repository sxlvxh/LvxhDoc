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

package chat.deploy;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.huaiye.plugin.plat.util.ModelSqlHolder;
import com.sun.media.jfxmediaimpl.platform.Platform;

import chat.Login;
import chat.bean.ProjectModelHolder;
import chat.bean.ServerHolder;
import chat.service.db.ServerService;
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
import javafx.scene.control.PasswordField;
import javafx.scene.control.TableCell;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.HBox;
import javafx.stage.Modality;
import javafx.stage.Stage;
import javafx.util.Callback;
import utils.LvxhJschUtil;

public class DeployController implements Initializable {
	private final static Logger LOG = Logger.getLogger(DeployController.class);

	@FXML
	private AnchorPane coderFxml;
	@FXML
	private Button search;

	@FXML
	private Button addSqlBtn;

	@FXML
	private Button useraddID;

	@FXML
	private Button searchSql;

	@FXML
	private TextField selectModel;

	@FXML
	private TextField suseUser;

	@FXML
	private PasswordField suseUserPwd;

	@FXML
	private TextArea suseUserLog;

	@FXML
	private ComboBox<ServerHolder> selectSqlModel;

	@FXML
	private TableColumn<ServerHolder, String> ip;
	@FXML
	private TableColumn<ServerHolder, String> name;
	@FXML
	private TableColumn<ServerHolder, String> user;
	@FXML
	private TableColumn<ServerHolder, String> opt;

	@FXML
	private TableView<ServerHolder> tableID;

	private final ObservableList<ServerHolder> data = FXCollections.observableArrayList();

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		initSearchTable();
		ServerService pms = new ServerService();
		List<ServerHolder> list = new ArrayList<ServerHolder>();
		List<ServerHolder> ll = pms.getList(new ServerHolder());
		list.addAll(ll);
		selectSqlModel.getItems().addAll(list);

		Login.queryBtnA = search;
	}

	private void initModelSql() {

	}

	private void initSearchTable() {
		initProjectModel();
	}

	private void initProjectModel() {
		data.clear();
		ServerHolder _holder = new ServerHolder();
		_holder.setName(selectModel.getText());
		ServerService pms = new ServerService();
		List<ServerHolder> list = pms.getList(_holder);
		data.addAll(list);
		tableID.setItems(data);
		ip.setCellValueFactory(new PropertyValueFactory<ServerHolder, String>("ip"));
		name.setCellValueFactory(new PropertyValueFactory<ServerHolder, String>("name"));
		user.setCellValueFactory(new PropertyValueFactory<ServerHolder, String>("user"));
		opt.setCellValueFactory(new PropertyValueFactory<ServerHolder, String>("id"));
		opt.setCellFactory(new Callback<TableColumn<ServerHolder, String>, TableCell<ServerHolder, String>>() {

			@Override
			public TableCell<ServerHolder, String> call(TableColumn<ServerHolder, String> param) {

				TableCell<ServerHolder, String> cell = new TableCell<ServerHolder, String>() {
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
								deleteProjectModel(item);
							});
							editBtn.setOnMouseClicked((m) -> {
								editProjectModelEvent(list, item);
							});
							setContentDisplay(ContentDisplay.GRAPHIC_ONLY);
							setGraphic(paddedButton);
						} else {
							setGraphic(null);
						}

					}

					private void editProjectModelEvent(List<ServerHolder> list, String item) {
						for (ServerHolder _pro : list) {
							if (_pro.getId().equals(item)) {
								try {
									FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("updateServer.fxml"));
									Parent root = fxmlLoader.load();
									UpdateServerController controller = fxmlLoader.getController();
									Stage secondStage = new Stage();
									Scene secondScene = new Scene(root, 335, 182);
									secondStage.setTitle("修改服务器");
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
						alert.initOwner((Stage) delBtn.getScene().getWindow());

						Optional<ButtonType> result = alert.showAndWait();
						if (result.get() == ButtonType.OK) {
							ServerHolder _holder = new ServerHolder();
							_holder.setId(item);
							ServerService service = new ServerService();
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
			Parent root = FXMLLoader.load(getClass().getResource("addServer.fxml"));
			Stage secondStage = new Stage();
			Scene secondScene = new Scene(root, 335, 182);
			secondStage.setTitle("增加服务器");
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

		// Platform.runLater(()->{
		// try {
		// Desktop.getDesktop().open(new File("C:/Program Files
		// (x86)/Tencent/QQ/Bin/QQScLauncher.exe"));
		// } catch (IOException e) {
		// LOG.error(e.getMessage(), e);
		// }
		// });
	}

	@FXML
	protected void useraddEvent(ActionEvent event) {
		ServerHolder _model = selectSqlModel.getValue();
		String userName = suseUser.getText();
		String userPwd = suseUserPwd.getText();
		if (_model == null) {
			Login.alert((Stage) useraddID.getScene().getWindow(), "请选择服务器！");
		} else if (StringUtils.isBlank(userName) || StringUtils.isBlank(userPwd)) {
			Login.alert((Stage) useraddID.getScene().getWindow(), "账号和密码不能为空！");
		} else {
			addLog("建立ssh连接。。。");
			javafx.application.Platform.runLater(() -> {
				LvxhJschUtil demo = new LvxhJschUtil();
				if (demo.connect(_model.getUser(), _model.getPwd(), _model.getIp())) {
					addLog("ssh连接成功！");
					addLog("开始创建用户。。。");
					demo.execShell("groupadd " + userName);
					demo.execShell("useradd -g " + userName + " -d /home/" + userName + " -m -s /bin/bash " + userName);
					demo.execShell("passwd " + userName + "<< EOF");
					demo.execShell(userName);
					demo.execShell(userName);
					demo.execShell("EOF");
					addLog("创建用户完成！");
				}
			});
		}
		System.out.println(_model);
	}

	private void addLog(String text) {
		javafx.application.Platform.runLater(() -> {
			suseUserLog.appendText(text);
			suseUserLog.appendText(System.getProperty("line.separator"));
		});
	}

	@FXML
	protected void userdelEvent(ActionEvent event) {

	}

}
