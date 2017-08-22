import { EventEmitter2 } from 'eventemitter2';
import * as assign from 'object-assign';

import Dispatcher from '../dispatchers/common/dispatcher';
import Constant from '../constants/common/constants';

interface AbstractStore extends EventEmitter2 {
  key      : string;
  _state   : AbstractStore;
}
interface Ipayload {
  actionType: string;
  data      : this;
}

class AbstractStore extends EventEmitter2 {
  public static instances: {[key: string]: any};
  constructor(key: string) {
    super();

    this.key = key;
    Dispatcher.register(this.register.bind(this));
  }

  public static getInstance(key: string) {
    if (!this.instances) this.instances = {};
    this.instances[key] = this.instances[key] || new this(key);
    return this.instances[key];
  }

  public register(payload: Ipayload): void {
    let registration = assign({}, this.registration(), {
      [Constant.ACTIONS.UPDATE] : this.update.bind(this),
      [Constant.ACTIONS.DESTROY]: this.destroy.bind(this)
    });

    registration[payload.actionType] && registration[payload.actionType](payload);
  }

  public update(payload: Ipayload): void {
    this._state = assign(this._state, payload.data);
    this.trigger();
  }

  public destroy(payload: Ipayload): void {
    // this._state;
    this.trigger();
  }

  public registration(): {} {
    return {};
  }

  public trigger(): void {
    throw 'Abstract Method called.';
  }

  get state(): AbstractStore {
    return this._state;
  }
}

export default AbstractStore;
