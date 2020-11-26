package application;
import javafx.application.Application;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;
 
/**
 * A sample that demonstrates some properties of nodes. Use the controls to
 * change opacity or horizontal position.
 */
public class NodePropertiesApp extends Application {
 
    private Rectangle rectA;
    private Rectangle rectB;
    private Rectangle rectC;
 
    public Parent createContent() {
 
        //X position of node = X + LayoutX + TranslateX
        rectA = new Rectangle(50, 50, Color.LIGHTSALMON);
        //set position of node temporary (can be changed after)
        rectA.setTranslateX(10);
 
        rectB = new Rectangle(50, 50, Color.LIGHTGREEN);
        //set position of node when addinf to some layout
        rectB.setLayoutX(20);
        rectB.setLayoutY(10);
 
        rectC = new Rectangle(50, 50, Color.DODGERBLUE);
        //last posibility of setting X position of node
        rectC.setX(30);
        rectC.setY(20);
        //opacity of node can be set
        rectC.setOpacity(0.8);
 
        Pane root = new Pane(rectA, rectB, rectC);
        root.setPrefSize(130, 100);
        root.setMinSize(130, 100);
        root.setMaxSize(130, 100);
 
        return root;
    }
 
    @Override
    public void start(Stage primaryStage) throws Exception {
        primaryStage.setScene(new Scene(createContent()));
        primaryStage.show();
    }
 
    /**
     * Java main for when running without JavaFX launcher
     */
    public static void main(String[] args) {
        launch(args);
    }
}