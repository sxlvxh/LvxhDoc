package test;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class ModalTest extends Application {

	/**
	 * @param args
	 *            the command line arguments
	 */
	public static void main(String[] args) {
		Application.launch(ModalTest.class, args);
	}

	@Override
	public void start(final Stage primaryStage) {
		primaryStage.setTitle("Hello World");
		Group root = new Group();
		Scene scene = new Scene(root, 500, 450, Color.LIGHTBLUE);
		Button btn = new Button();
		btn.setLayoutX(250);
		btn.setLayoutY(240);
		btn.setText("Show modal dialog");
		btn.setOnAction(new EventHandler<ActionEvent>() {

			@SuppressWarnings("unused")
			public void handle(ActionEvent event) {
				ModalDialog md = new ModalDialog(primaryStage);

			}
		});
		root.getChildren().add(btn);
		primaryStage.setScene(scene);
		primaryStage.show();
	}
}