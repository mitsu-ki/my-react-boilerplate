import Dispatcher from '../dispatchers/common/dispatcher';
import Constant from '../constants/common/constants';

abstract class AbstractAction {  
  public static update(data: Object): void {
    Dispatcher.dispatch({
      actionType: Constant.ACTIONS.UPDATE,
      data      : data
    });
  }

  public static destroy(data: Object): void {
    Dispatcher.dispatch({
      actionType: Constant.ACTIONS.DESTROY,
      data      : data
    });
  }
}

export default AbstractAction;
