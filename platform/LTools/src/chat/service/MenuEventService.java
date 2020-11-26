package chat.service;

import chat.bean.MenuBean;
import chat.mainview.MainController;

public interface MenuEventService {
  void executor(MainController controller,MenuBean mneu);
}
