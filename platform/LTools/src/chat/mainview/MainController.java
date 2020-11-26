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

package chat.mainview;

import java.net.URL;
import java.util.ResourceBundle;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;

import chat.Login;
import chat.bean.MenuBean;
import chat.deploy.AddServerController;
import chat.service.MenuEventService;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.TreeItem;
import javafx.scene.control.TreeView;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;

public class MainController implements Initializable {
	private final static Logger LOG = Logger.getLogger(MainController.class);
	
	@FXML
	private TreeView<MenuBean> menuTreeView;
	
	@FXML
	private TreeView<MenuBean> menuTreeView1;
	
	private MainController _this;
	
	@FXML
	private AnchorPane rightPane;
		
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		Login.rightPane = this.rightPane;
		this._this = this;
		ImageView folderIcon = Login.getTreeImg("/resource/images/Folder_16px.png");
        MenuBean rm = new MenuBean();
        rm.setName("系统菜单");
        rm.setId("1001");
        
		TreeItem<MenuBean> treeItem = new TreeItem<MenuBean>(rm);
        treeItem.setGraphic(folderIcon);
        treeItem.setExpanded(true);

       for(MenuBean b: Login.MENU_HOLDER.getList()){
            TreeItem <MenuBean>item = new TreeItem<MenuBean>(b);
            item.setGraphic(Login.getTreeImg(b.getImgUrl()));
            treeItem.getChildren().add(item);
        }
        menuTreeView.setRoot(treeItem);
        menuTreeView.addEventFilter(MouseEvent.MOUSE_CLICKED, new EventHandler<MouseEvent>()
        {
            public void handle(MouseEvent event)
            {
            	try {
					MenuBean name = ((TreeItem<MenuBean>)menuTreeView.getSelectionModel().getSelectedItem()).getValue();
					System.out.println("Node click: " + name);
					if(StringUtils.isNotBlank(name.getClick()))
					{
						MenuEventService service = (MenuEventService) Login.factory.getBean(name.getClick());
						service.executor(_this, name);
					}
				} catch (Exception e) {
					LOG.error(e.getMessage(), e);
				}
            }
        });
        
	}
	
	@FXML
	protected void clickMenu(ActionEvent event) {
		 System.out.println(event);
	}

	public TreeView<MenuBean> getMenuTreeView() {
		return menuTreeView;
	}

	public TreeView<MenuBean> getMenuTreeView1() {
		return menuTreeView1;
	}

}
