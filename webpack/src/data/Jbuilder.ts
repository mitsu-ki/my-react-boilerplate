import * as _ from 'lodash';
import * as assign from 'object-assign';

class Jbuilder {
  private data: object;
  private isArray: boolean;
  private isChild: boolean;
  private isLastArray: boolean;
  private nestKey: string[];
  constructor() {
    this.data = this.data || {};
    this.initialize();
    this.nestKey = [];
  }

  public encode(fn: Function) {
    return fn(this);
  }

  public set(key: string, val: string | any[] | object | Function, ...keys: string[]) {
    console.log("isLastArray: " + this.isLastArray);
    if (this.isArray) {
      // this.isLastArray ? null * this.nestKey.push(key);
    } else {
      this.nestKey.push(key);
    }

    if(typeof val === "function") return val();

    let updateObj = {};

    if(keys.length === 0) {
      updateObj = {
        [key]: val
      };
    } else {
      let attributes = {};
      
      _.map(keys, (target) => {
        _.assign(attributes, {[target]: val[target]});
      });
      
      updateObj = _.set({}, this.nestKey, this.isArray ? [attributes] : attributes);
    }

    console.log(updateObj);
    console.log(this.data);

    _.assign(this.data, updateObj);

    if(this.isLastArray) this.nestKey = [];
    this.initialize();
  }

  public array(arrayObj: object[], fn: Function) {
    if(!fn) throw new Error("Function not found");
    this.isLastArray = false;

    _.each(arrayObj, (obj, i: number) => {
      this.isArray = true;
      if(i === arrayObj.length) this.isLastArray = true;
      return fn(obj);
    });
  }

  public child(fn: Function) {
    this.isChild = true;
    this.isLastArray = true;
    return fn();
  }

  public render() {
    return this.data;
    // return JSON.stringify(this.data);
  }

  private initialize() {
    this.isArray = false;
    this.isChild = false;
    this.isLastArray = true;
  }
};

export default new Jbuilder();
