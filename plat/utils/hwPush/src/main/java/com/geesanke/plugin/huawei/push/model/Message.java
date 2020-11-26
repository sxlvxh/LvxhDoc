
package com.geesanke.plugin.huawei.push.model;

import com.geesanke.plugin.huawei.push.model.Action.Param;
import com.geesanke.plugin.huawei.push.model.enums.ActionType;
import com.geesanke.plugin.huawei.push.model.enums.MessageType;

public class Message {

    // 1 透传异步消息 3 系统通知栏异步消息 注意：2 和 4 以后为保留后续扩展使用
    private Integer type;
    // 消息内容
    private Body body;

    private Action action;

    
    public Message() {
    }

    private Message(MessageBuilder messageBuilder) {
        this.type = messageBuilder.type;
        this.body = messageBuilder.body;
        this.action = messageBuilder.action;
    }

    public static MessageBuilder newInstance() {
        return new MessageBuilder();
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Body getBody() {
        return body;
    }

    public void setBody(Body body) {
        this.body = body;
    }

    public Action getAction() {
        return action;
    }

    public void setAction(Action action) {
        this.action = action;
    }




    public static final class MessageBuilder {
        private Integer type;
        private Body body;
        private Action action;

        private MessageBuilder() {
        }

        public MessageBuilder addType(MessageType messageType) {
            this.type = messageType.getType();
            return this;
        }
        
        public MessageBuilder addType(Integer type) {
            this.type = type;
            return this;
        }
        
        public MessageBuilder addBody(String content,String title) {
            Body newBody = Body.newInstance().addContent(content).addTitle(title).build();
            this.body = newBody;
            return this;
        }
        
        public MessageBuilder addBody(Body body) {
            this.body = body;
            return this;
        }

        public MessageBuilder addAction(ActionType type,String action) {
            
            Action newAction = Action.newInstance()
                                        .addType(type)
                                        .addParam(Param.newInstance()
                                                                .addParam(type, action)
                                                            .build())
                                    .build();
            this.action = newAction;
            return this;
        }
        
        public MessageBuilder addAction(Action action) {
            this.action = action;
            return this;
        }
        

        public Message build() {
            return new Message(this);
        }
    }


    
    
    
}
