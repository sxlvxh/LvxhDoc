package chat.netty.service;

import chat.netty.bean.Message;
import chat.netty.bean.MessageContent;

public interface NettyClientService {
    void excutor(MessageContent message);
}
