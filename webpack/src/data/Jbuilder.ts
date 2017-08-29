import * as _ from 'lodash';

class Jbuilder {
  private data: object;
  private isArray: boolean;
  private nestKey: string[];
  constructor() {
    this.data = this.data || {};
    this.isArray = false;
    this.nestKey = [];
  }

  public encode(fn: Function) {
    return fn(this);
  }

  public set(key: string, val: string | any[] | object | Function, ...keys: string[]) {
    this.nestKey.push(key);
    if(typeof val === "function") return val();

    let updateObj = {};

    if(keys.length === 0) {
      updateObj = {
        [key]: val
      };
    } else {
      let attributes = this.isArray ? [] : {};
      console.log(this.isArray);
      
      _.map(keys, (target) => {
        this.isArray ? attributes[attributes.length + 1] = {[target]: val[target]} : _.assign(attributes, {[target]: val[target]});
      });
      
      updateObj = _.set({}, this.nestKey, attributes);
    }

    _.assign(this.data, updateObj);
    this.nestKey = [];
    this.isArray = false;
  }

  public array(arrayObj: object[], fn: Function) {
    if(!fn) throw new Error("Function not found");
    this.isArray = true;

    _.each(arrayObj, (obj, i: number) => {
      return fn(obj);
    });
  }

  public child(fn: Function) {
    this.isArray = true;
    return fn();
  }

  public extract(obj: object, ...attributes: string[]) {
    if(_.isObject(obj)) {
      this.extractHashValues(obj, attributes);
    } else {
      this.extractMethodValues(obj, attributes);
    }
  }

  public render() {
    return this.data;
    // return JSON.stringify(this.data);
  }

  // private extractHashValues(obj: object, attributes) {
  //   return _.each(attributes, (key) => {
  //     return this.set(key, obj[key]);
  //   });
  // }

  // private extractMethodValues(obj: object, attributes) {
  //   return _.each(attributes, (key) => {
  //     return this.set(key, obj[key]);
  //   });
  // }
};



export default new Jbuilder();
