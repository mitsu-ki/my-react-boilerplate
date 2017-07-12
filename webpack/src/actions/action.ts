import Dispatcher from '../dispatchers/common/Dispatcher';
import Constants from '../constants/common/Constants';

class Actions {
  static delete(key: number | string): void {
    console.log(key);
    Dispatcher.dispatch({
      actionType: Constants.ACTIONS.BOOKS_DELETE,
      id        : key
    });
  }
}

export default Actions;