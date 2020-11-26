package test;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import javafx.stage.StageStyle;

/**
 * 程序入口
 * @author Light
 */
public class JavaFXTest extends Application {
    
    @Override
    public void start(Stage stage) {
        
        stage.initStyle(StageStyle.TRANSPARENT);
        
        VBox root = new VBox();
        root.setId("root");
        // 引入样式
        root.getStylesheets().add(JavaFXTest.class.getResource("style.css").toString());
        
        //顶部
        VBox top = new VBox();
        top.setId("top");
        top.setPrefSize(300,26);
        // 标题栏
        AnchorPane title = new AnchorPane();
        Label close = new Label();
        close.setPrefWidth(33);
        close.setPrefHeight(26);
        close.setId("winClose");//winClose css样式Id
        title.getChildren().add(close);
        AnchorPane.setRightAnchor(close, 0.0);
        AnchorPane.setTopAnchor(close, 5.0);
        top.getChildren().add(title);
        
        // 内容
        VBox content = new VBox();
        content.setPrefWidth(300);
        content.setMinHeight(200);
        // 组装
        root.getChildren().addAll(top, content);
        Scene scene = new Scene(root);        
        stage.setScene(scene);
        
        // 显示
        stage.show();
    }
    
    

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }
    
}