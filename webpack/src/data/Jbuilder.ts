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
    if(typeof val === "function") {
      this.nestKey.push(key);
      _.assign(this.data, {[key]: []});
      return val();
    }

    if(this.isArray) {
      console.log(this.nestKey);
      
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

  public extract(obj: object, ...attributes: string[]) {
    if(_.isObject(obj)) {
      this.extractHashValues(obj, attributes);
    } else {
      this.extractMethodValues(obj, attributes);
    }
  }

  public render() {
    return JSON.stringify(this.data);
  }

  private extractHashValues(obj, attributes) {
    return _.each(attributes, (key) => {
      return this.set(key, obj[key]);
    });
  }

  private extractMethodValues(obj, attributes) {
    // attributes.each{ |key| _set_value key, obj.public_send(key) }
    return _.each(attributes, (key) => {
      return this.set(key, obj[key]);
    });
  }
};

export default new Jbuilder();
