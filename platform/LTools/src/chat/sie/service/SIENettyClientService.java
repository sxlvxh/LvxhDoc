package chat.sie.service;

import chat.sie.bean.SIEMessage;

public interface SIENettyClientService {
    void excutor(SIEMessage message);
}
