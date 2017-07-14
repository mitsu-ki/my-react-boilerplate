import Dispatcher from '../dispatchers/common/dispatcher';
import Constants from '../constants/common/constants';

class Actions {
  public create(data: object): void {
    Dispatcher.dispatch({
      actionType: Constants.ACTIONS.CREATE,
      data      : data
    });
  }

  public update(data: object): void {
    Dispatcher.dispatch({
      actionType: Constants.ACTIONS.UPDATE,
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