package test;

import javafx.stage.*;
import javafx.scene.*;
import javafx.scene.paint.Color;
import javafx.scene.control.*;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;

public class ModalDialog {
	Button btn;

	public ModalDialog(final Stage stg) {
		btn = new Button();

		final Stage stage = new Stage();
		// Initialize the Stage with type of modal
		stage.initModality(Modality.APPLICATION_MODAL);
		// Set the owner of the Stage
		stage.initOwner(stg);
		stage.setTitle("Top Stage With Modality");
		Group root = new Group();
		Scene scene = new Scene(root, 300, 250, Color.LIGHTGREEN);
		btn.setOnAction(new EventHandler<ActionEvent>() {
			public void handle(ActionEvent event) {
				stage.hide();
			}
		});

		btn.setLayoutX(100);
		btn.setLayoutY(80);
		btn.setText("OK");

		root.getChildren().add(btn);
		stage.setScene(scene);
		stage.show();

	}

}
