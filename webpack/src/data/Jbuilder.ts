import * as _ from 'lodash';

interface Jbuilder {
  data: {};
}

class Jbuilder {
  constructor() {
    this.data = this.data || {};
  }

  public encode(fn: Function) {
    return fn(this);
  }

  public set(key: string, val: string | any[] | object | Function, ...keys: string[]) {
    if(typeof val === "function") return val(this);
    if(keys.length === 0) {
      _.assign(this.data, {[key]: val});
    } else {
      let updateObj = {
        [key]: {}
      };
      _.map(keys, (item) => {
        updateObj[key][item] = val[item];
      });

      _.assign(this.data, updateObj);
    }
  }

  public array(objs: string[], fn: Function) {
    console.log(fn);
    console.log(objs);
  }

  public render() {
    return this.data;
  }

};

export default Jbuilder;
