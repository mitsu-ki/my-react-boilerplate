import * as _ from 'lodash';

class Jbuilder {
  private data: object;
  private isArray: boolean;
  private parentKey: string;
  constructor() {
    this.data = this.data || {};
    this.isArray = false;
    this.parentKey = "";
  }

  public encode(fn: Function) {
    return fn(this);
  }

  public set(key: string, val: string | any[] | object | Function, ...keys: string[]) {
    if(typeof val === "function") {
      this.parentKey = key;
      _.assign(this.data, {[key]: []});
      return val();
    }

    if(this.isArray) {
      console.log("array type script");
    } else {
      // keyが複数設定されていた場合はイテレートするため条件分岐
      if(keys.length === 0) {
        _.assign(this.data, {[key]: val});
        this.isArray = false;
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
  }

  public array(arrayObj: object[], fn: Function) {
    if(!fn) throw new Error("Function not found");
    this.isArray = true;

    _.each(arrayObj, (obj, i: number) => {
      // this.data[parent_key][i][children_key] = obj[children_key];
      return fn(obj);
    });
  }

  public child(fn: Function) {
    console.log("this is child");
    this.isArray = true;
    // this.data[parent_key][0][children_key] = obj[children_key];
    return fn();
  }

  public extract() {}

  public render() {
    return JSON.stringify(this.data);
  }
};

export default Jbuilder;
