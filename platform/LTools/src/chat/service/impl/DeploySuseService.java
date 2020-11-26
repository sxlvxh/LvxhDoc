package chat.service.impl;

import java.io.IOException;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import chat.Login;
import chat.bean.MenuBean;
import chat.deploy.DeployController;
import chat.mainview.MainController;
import chat.service.MenuEventService;
import javafx.collections.ObservableList;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;

@Service
public class DeploySuseService implements MenuEventService {

	private final static Logger LOG = Logger.getLogger(DeploySuseService.class);
	
	@Override
	public void executor(MainController controller, MenuBean mneu) {
		Parent root;
		try {
			root = FXMLLoader.load(DeployController.class.getResource("deploy.fxml"));
			ObservableList<Node> nodes = Login.rightPane.getChildren();
			if(nodes!=null && nodes.size() > 0)
			{
				nodes.remove(0);
			}
			Login.rightPane.getChildren().add(root);
			
		} catch (IOException e) {
			LOG.error(e.getMessage(), e);
		}
		
	}

}
