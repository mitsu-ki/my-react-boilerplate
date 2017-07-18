import { EventEmitter } from 'fbemitter';
import AppConstant from '../../constants/index/app-constants';
import * as Relation from '../../models/index/relation';

let data: any;
let schema: any;
const emitter = new EventEmitter();

class AppStore {
  constructor() {
    this.data = Relation.Books.collection();
  }

  static init(initialSchema: Array<Object>) {
    schema = initialSchema;
    const storage = null;

    if (!storage) {
      data = [{}];
      schema.forEach(item => data[0][item.id] = item.sample)
    } else {
      data = JSON.parse(storage);
    }
  }

  static getData(): Array<Object> {
    return data;
  }

  static getSchema(): Array<Object> {
    return schema;
  }

  static setData(newData: Array<Object>) {
    data = newData;
    emitter.emit(AppConstant.EVENTS.CHANGED);
  }

  static appAddListener(eventType: string, fn: Function) {    
    emitter.addListener(eventType, fn);
  }

  static getRecord(id: number): Object | null {
    return id in data ? data[id] : null;
  }

  get data(): Array<Object> {
    return this.data;
  }
}

export default AppStore;
