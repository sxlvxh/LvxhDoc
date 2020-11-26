package application;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;

public class Main extends Application {
	@FXML
	private Button go;
	@FXML
	private TextField url;
	@FXML
	private WebView web;
	
	private WebEngine webEngine;
	
    @Override
    public void start(Stage primaryStage) {
        try {
            // Read file fxml and draw interface.
            Parent root = FXMLLoader.load(getClass()
                    .getResource("/application/main.fxml"));

            primaryStage.setTitle("My Application");
            primaryStage.setScene(new Scene(root));
            primaryStage.show();
            

        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    
    @Override
	public void init() throws Exception {
		// TODO Auto-generated method stub
		super.init();
		System.out.println(111);
	}


	public static void main(String[] args) {
        launch(args);
    }
    
    
    @FXML
	protected void open(ActionEvent event) {
    	if(webEngine == null)
    	{
    		 webEngine = web.getEngine();
    	}
    	webEngine.load(url.getText());
	}

}

