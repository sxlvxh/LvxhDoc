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

package chat;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.xml.XmlBeanDefinitionReader;
import org.springframework.core.io.FileSystemResource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import chat.bean.MenuHolder;
import javafx.application.Application;
import javafx.event.EventHandler;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Button;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;
import javafx.stage.WindowEvent;

public class Login extends Application {

	private final static Logger LOG = Logger.getLogger(Login.class);
	private static FileSystemResource resource;
	public static String filePath;
	public static DefaultListableBeanFactory factory;
	public static final Properties CONF_PRO = new Properties();
	public static Stage stage;
	public static MenuHolder MENU_HOLDER;// =gson.fromJson((String) Login.CONF_PRO.get("MENU_LIST"),MenuHolder.class);
	public static final Gson GSON = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
	public static AnchorPane rightPane;
	public static Button queryBtnA;
	public static Button queryBtnB;
	static {
		filePath = new File("").getAbsolutePath();
		PropertyConfigurator.configure(filePath + "/resource/conf/log4j.properties ");
		resource = new FileSystemResource(filePath + "/resource/conf/spring.xml");
		factory = new DefaultListableBeanFactory();
		XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(factory);
		reader.loadBeanDefinitions(resource);

		File file = new File(filePath + "/resource/conf/conf.properties");
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(file);
			CONF_PRO.load(fis);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					LOG.error(e.getMessage(), e);
				}
			}
		}

		MENU_HOLDER = GSON.fromJson(txt2String(new File(filePath + "/resource/conf/menu.json")), MenuHolder.class);
	}

	@Override
	public void start(Stage stage) throws Exception {
		Login.setStage(stage);
		Parent root = FXMLLoader.load(getClass().getResource("login.fxml"));
		stage.setTitle("登录");
		setWinIcon(stage);
		stage.setResizable(false);
		stage.setScene(new Scene(root, 400, 275));
		stage.setOnCloseRequest(new EventHandler<WindowEvent>() {
			@Override
			public void handle(WindowEvent event) {
				System.exit(0);
			}
		});
		stage.show();
	}

	public static void main(String[] args) {
		Application.launch(Login.class, args);
	}

	public static Stage getStage() {
		return stage;
	}

	public static void setStage(Stage stage) {
		Login.stage = stage;
	}

	public static String txt2String(File file) {
		StringBuilder result = new StringBuilder();
		FileInputStream fs = null;
		InputStreamReader fr = null;
		BufferedReader br = null;
		try {
			fs = new FileInputStream(file);
			fr = new InputStreamReader(fs, "UTF-8");
			br = new BufferedReader(fr);
			String s = null;
			while ((s = br.readLine()) != null) {
				result.append(s);
			}
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					LOG.error(e.getMessage(), e);
				}
			}
			if (fr != null) {
				try {
					fr.close();
				} catch (IOException e) {
					LOG.error(e.getMessage(), e);
				}
			}
			if (fs != null) {
				try {
					fs.close();
				} catch (IOException e) {
					LOG.error(e.getMessage(), e);
				}
			}
		}
		return result.toString();
	}

	public static ImageView getTreeImg(String url) {
		ImageView folderIcon = new ImageView();
		Image folderImage;
		try {
			folderImage = new Image(new URL("file:/" + filePath + url).toExternalForm());
			folderIcon.setImage(folderImage);
			folderIcon.setFitWidth(16);
			folderIcon.setFitHeight(16);
		} catch (MalformedURLException e) {
			LOG.error(e.getMessage(), e);
		}
		return folderIcon;
	}

	public static void setWinIcon(Stage secondStage) {
		try {
			secondStage.getIcons().add(new Image(
					new URL("file:/" + Login.filePath + "/resource/images/logo/animal_owl_48px_12156_easyicon.net.png").toExternalForm()));
		} catch (MalformedURLException e) {
			LOG.error(e.getMessage(), e);
		}
	}

	public static void savePro() {
		File file = new File(filePath + "/resource/conf/conf.properties");
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(file);
			CONF_PRO.store(fos, "about:blank");
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		} finally {
			if (fos != null) {
				try {
					fos.close();
				} catch (IOException e) {
					LOG.error(e.getMessage(), e);
				}
			}
		}

		// Touch.refrushUrl();
	}

	public static void alert(Stage stag, String text) {
		Alert alert = new Alert(AlertType.CONFIRMATION);
		alert.setTitle("系统提示");
		alert.setHeaderText(text);
		alert.initOwner(stag);
		alert.showAndWait();
	}
}
