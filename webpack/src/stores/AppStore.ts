import { EventEmitter2 } from 'eventemitter2';
import * as assign from 'object-assign';

import Dispatcher from '../dispatchers/common/Dispatcher';
import Constant from '../constants/common/Constants';

import BaseModel from '../models/BaseModel';

class AbstractStore extends EventEmitter2 {
  static inheritPolyfill(Klass) {
    if (Klass.getInstance === undefined) Klass.getInstance = AbstractStore.getInstance.bind(Klass);
  }

  static getInstance(key) {
    key = parseInt(key, 10);
    if (!this.instances) this.instances = {};
    this.instances[key] = this.instances[key] || new this(key);
    return this.instances[key];
  }

  constructor(key) {
    super();

    this.key = key;
    this._state = new BaseModel();

    Dispatcher.register(this.register.bind(this));
  }

  register(payload) {
    let registration = assign({}, this.registration(), {
      [Constant.ACTIONS.UPDATE]          : this.update.bind(this),
      [Constant.ACTIONS.DESTROY]         : this.destroy.bind(this),
      [Constant.ACTIONS.SUBSCRIPTION]    : this.subscription.bind(this),
      [Constant.ACTIONS.SUBSCRIPTION_END]: this.subscriptionEnd.bind(this)
    });

    registration[payload.actionType] && registration[payload.actionType](payload);
  }

  update(payload) {
    this._state.update(payload.data);
    this.trigger();
  }

  destroy(payload) {
    this._state.destroy(payload.data);
    this.trigger();
  }

  registration() {
    return {};
  }

  subscription(payload) {
    this._state.destroy({
      messages: [{
        id        : Constant.MESSAGE.SUBSCRIPTION_ERROR,
        _destroyed: true
      }]
    });
    this._state.update(payload.data);
    this.trigger();
  }

  subscriptionEnd(payload) {
    this._state.destroy({
      messages: [{
        id        : Constant.MESSAGE.LOADING,
        _destroyed: true
      }]
    });
    this._state.update(payload.data);
    this.trigger();
  }

  trigger() {
    throw 'Abstract Method called.';
  }

  get state() {
    return this._state.toObject();
  }
}

export default AbstractStore;
