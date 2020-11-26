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

package chat.jst;

import java.io.BufferedReader;
import java.io.Closeable;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ResourceBundle;

import org.apache.log4j.Logger;

import chat.bean.BaseResult;
import chat.netty.client.NettyClient;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

public class JstController implements Initializable {
	private final static Logger LOG = Logger.getLogger(JstController.class);

	@FXML
	private Button saveBtn;

	@FXML
	private Button testBtn;

	@FXML
	private Button selectFile;

	@FXML
	private TextField dbIP;
	@FXML
	private TextField dbName;
	@FXML
	private TextField dbUser;

	@FXML
	private TextField dbPwd;

	@FXML
	private TextField filePath;

	@FXML
	private TextArea resultContent;

	final FileChooser fileChooser = new FileChooser();
	
	private Connection conn = null;

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		dbIP.setText("36.153.138.107");
		dbName.setText("somdb");
		dbUser.setText("root");
		dbPwd.setText("Huaiye@2013**");
		filePath.setText("C:/Users/Administrator.DESKTOP-GD07T2C/Desktop/手机卡号与用户卡号20191219142939.csv");
	}

	@FXML
	protected void saveEvent(ActionEvent event) {
		Platform.runLater(new Runnable() {
			@Override
			public void run() {
				try {
					// BufferedReader buff = new BufferedReader(new InputStreamReader(new
					// FileInputStream("test.txt"),"UTF-8"))
					FileInputStream fs = null;
					InputStreamReader fr = null;
					BufferedReader bf = null;
					try {
						fs = new FileInputStream(filePath.getText());
						fr = new InputStreamReader(fs, "GBK");
						bf = new BufferedReader(fr);
						
						String str = "";
						// 按行读取字符串
						int i = 0;
						int t = 2;
						while ((str = bf.readLine()) != null) {
							i++;
							//System.out.println(str);
							String ss[] = str.split(",");
							insert(ss, str);
							/*if (i % 10 == 0) {
						Thread.sleep(100);
						break;
					}*/
						}
					} catch (IOException e) {
						LOG.error(e.getMessage(), e);
					} finally {
						closeQuietly(bf);
						closeQuietly(fr);
					}
					
					Alert alert = new Alert(AlertType.CONFIRMATION);
					alert.setTitle("系统提示");
					alert.setHeaderText("操作成功！");
					alert.initOwner((Stage) saveBtn.getScene().getWindow());
					alert.showAndWait();
					
				} catch (Exception e) {
					LOG.error(e.getMessage(), e);
				}
				
			}
		});

	}

	public static void closeQuietly(Closeable closeable) {
		try {
			if (closeable != null) {
				closeable.close();
			}
		} catch (IOException ioe) {
			LOG.error(ioe.getMessage(), ioe);
		}
	}

	@FXML
	protected void testEvent(ActionEvent event) {
		try {
			Alert alert = new Alert(AlertType.CONFIRMATION);
			alert.setTitle("系统提示");
			if (getConn() != null) {

				alert.setHeaderText("连接数据库成功！");
			} else {
				alert.setHeaderText("连接数据库失败！");

			}
			alert.initOwner((Stage) saveBtn.getScene().getWindow());
			alert.showAndWait();
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}

	}

	public Connection getConn() {
		try {
			if(conn == null)
			{
				Class.forName("com.mysql.jdbc.Driver").newInstance();
				conn = DriverManager.getConnection("jdbc:mysql://" + dbIP.getText() + ":30001/" + dbName.getText(),
						dbUser.getText(), dbPwd.getText());
			}
			//LOG.debug(" connection successful! ");
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		return conn;
	}

	@FXML
	protected void fileChooser(ActionEvent event) {
		Stage stage = (Stage) selectFile.getScene().getWindow();

		File file = fileChooser.showOpenDialog(stage);
		if (file != null) {
			filePath.setText(file.getAbsolutePath().replace("\\", "/"));
		}
	}

	@FXML
	protected void removeEvent(ActionEvent event) {

		Connection conn = null;
		PreparedStatement stmt = null;
		BaseResult result = new BaseResult();
		try {
			conn = getConn();
			stmt = conn.prepareStatement("delete from gcms_jst_num");
			if (stmt.execute()) {
				result.setCode(0);
				result.setDesc("操作成功！");
			} else {
				result.setCode(1);
				result.setDesc("操作失败！");
			}

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			result.setCode(1);
			result.setDesc("操作失败！");
		} finally {
			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(), e);
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(), e);
				}
			}
		}

		Alert alert = new Alert(AlertType.CONFIRMATION);
		alert.setTitle("系统提示");
		alert.setHeaderText("操作成功！");
		alert.initOwner((Stage) saveBtn.getScene().getWindow());
		alert.showAndWait();

	}

	public BaseResult insert(String bb[], String str) {
		Connection conn = null;
		PreparedStatement stmt = null;
		BaseResult result = new BaseResult();
		String sql = "insert into gcms_jst_num (NAME, CITY, DISTRICT, STREET, COMMUNITY, residential, BUILDING, PHONE, CARD_NUMBER, CARD_DATE, BLUE_INTEGRAL, GREEN_INTEGRAL, PHONE_NUMBER, TOTAL_SCORE, INTEGRAL_USED, REGION, TYPE, WEIGHT, FREQUENCY, AFFILIATE, ISDEL) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		try {
			conn = getConn();
			stmt = conn.prepareStatement(sql);
			//System.out.println(bb.length);
			for (int i = 0; i < 20; i++) {
				stmt.setString(i + 1, bb[i]);
			}
			stmt.setInt(21, 0);
			stmt.execute();
			result.setCode(0);
			result.setDesc("操作成功！");

			/*
			 * resultContent.appendText(str);
			 * resultContent.appendText(System.getProperty("line.separator"));
			 */
					// TODO Auto-generated method stub
					/*Platform.runLater(new Runnable() {
						
						@Override
						public void run() {
							new Thread(new Runnable() {
								
						public void run() {
							// TODO Auto-generated method stub
							resultContent.appendText(str);
							resultContent.appendText(System.getProperty("line.separator"));
						}
							}).start();
							
						}
					});*/
					
					

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			result.setCode(1);
			result.setDesc("操作失败！");
			LOG.error(" =============== " + str);
			Platform.runLater(new Runnable() {

				@Override
				public void run() {
					// TODO Auto-generated method stub
					resultContent.appendText("【插入失败的数据！ 】" + str);
					resultContent.appendText(System.getProperty("line.separator"));

				}
			});

		} finally {
			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(), e);
				}
			}
			/*if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					LOG.error(e.getMessage(), e);
				}
			}*/
		}
		return result;
	}
}
