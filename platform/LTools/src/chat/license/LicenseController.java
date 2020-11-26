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

package chat.license;

import java.awt.Desktop;
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
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ResourceBundle;

import org.apache.log4j.Logger;

import com.huaiye.plugin.util.License2;

import chat.bean.BaseResult;
import chat.netty.client.NettyClient;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Button;
import javafx.scene.control.DatePicker;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.stage.DirectoryChooser;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

public class LicenseController implements Initializable {
	private final static Logger LOG = Logger.getLogger(LicenseController.class);

	@FXML
	private Button saveBtn;
	@FXML
	private Button selectFile;

	@FXML
	private TextField licenseKey;
	@FXML
	private TextField userSize;

	@FXML
	private TextField filePath;
	
	@FXML
	private DatePicker endTime;

	final DirectoryChooser  fileChooser = new DirectoryChooser();

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		this.endTime.setValue(LocalDate.now());
	}

	@FXML
	protected void saveEvent(ActionEvent event) {
		Platform.runLater(new Runnable() {
			@Override
			public void run() {
				try {
                    System.out.println( endTime.getValue());
					License2.generateLicense(licenseKey.getText().trim(), endTime.getValue()+" 00:00:00", Integer.parseInt(userSize.getText()),filePath.getText().trim());
					Platform.runLater(()->{
						try {
							Desktop.getDesktop().open(new File(filePath.getText().trim()));
						} catch (IOException e) {
							LOG.error(e.getMessage(), e);
						}
					});
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
	protected void fileChooser(ActionEvent event) {
		Stage stage = (Stage) selectFile.getScene().getWindow();

		File file = fileChooser.showDialog(stage);
		if (file != null) {
			filePath.setText(file.getAbsolutePath().replace("\\", "/"));
		}
	}

	
}
