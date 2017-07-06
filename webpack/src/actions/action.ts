import Dispatcher from '../dispatchers/common/Dispatcher';
import Constants from '../constants/common/Constants';

class Actions {
  public create(data: object): void {
    Dispatcher.dispatch({
      actionType: Constants.ACTIONS.CREATE,
      data      : data
    });
  }

  public update(id: number, data: object): void {
    Dispatcher.dispatch({
      actionType: Constants.ACTIONS.UPDATE,
      id        : id,
      data      : data
    });
  }

  public del(id: number): void {
    Dispatcher.dispatch({
      actionType: Constants.ACTIONS.DESTROY,
      id        : id
    });
  }
}

export default Actions;