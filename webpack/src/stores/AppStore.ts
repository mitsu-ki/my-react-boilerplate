import * as assign from 'object-assign';
// import * as Immutable from 'immutable';
const Immutable = require('immutable');
import { ReduceStore } from 'flux/utils';

import Books from '../models/Books';
import Authors from '../models/Authors';
import BookStores from '../models/BookStores';

// import { Dispatcher } from 'flux';
import Dispatcher from '../dispatchers/common/Dispatcher';
import Constants from '../constants/common/Constants';

interface TState {};
interface payload {};
interface actionType {
  type: string;
  data?: string | object;
}
class stateType extends Immutable {}

class AppStore extends ReduceStore<TState, payload> {
  getInitialState() {
    return Immutable.Map(assign(
      {},
      Books,
      Authors,      
      BookStores
    ));
  }

  reduce(state: stateType, action: actionType) {
    switch (action.type) {
      case Constants.ACTIONS.BOOKS_DELETE:
        console.log(action);
        console.log(state);
        state.delete(action.data);
        return state.update('books', () => action.data);

      default:
        return state;
    }
  }
}

// const dispatcher = new Dispatcher();
const appStore = new AppStore(Dispatcher);

export default appStore;
