import * as assign from 'object-assign';
import { EventEmitter2 } from 'eventemitter2';
import Dispatcher from '../dispatchers/common/dispatcher';
import Constant from '../constants/common/constants';

interface payloadType {
  actionType: string;
  data      : object;
}

class AppStore extends EventEmitter2 {
  constructor() {
    super();
    Dispatcher.register(this.register.bind(this))
  }

  register(payload: payloadType) {
    let registration = assign({}, this.registration(), {
      [Constant.ACTIONS.UPDATE] : this.update.bind(this),
      [Constant.ACTIONS.DESTROY]: this.destroy.bind(this)
    });

    registration[payload.actionType] && registration[payload.actionType](payload);
  }

  update() {
  }

  destroy() {
  }

  trigger() {
  }

  registration() {
    return {};
  }
}

export default AppStore;
