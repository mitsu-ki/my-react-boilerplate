import * as _ from 'lodash';
import * as assign from 'object-assign';
const jbuilder = require('jbuilder');

class JsonBuilder {
  constructor() {
    this.data = {};
  }

  static hasOne(key: string, obj: object): void {
    assign(
      this.data,
      JSON.parse(
        jbuilder.encode((json) => this.set(key, obj, json))
      )
    );
  }

  static set(key: string, obj, json): void {
    json.set([key], obj);
  }

  static hasMany(key: string, obj: object): void {
    assign(
      this.data,
      JSON.parse(
        jbuilder.encode((json) => this.manySet(key, obj, json))
      )
    );
  }

  static manySet(key: string, obj, json): void {
    json.set(key, (fn) => {
      this.manyMap(obj, fn);
    })
  }

  static manyMap(obj, fn) {
    for(let i = 0; i < obj.length; i++) {
      return _.each(obj, (property, key) => {
        fn.child((json) => {
          json.set(key, property);
        });
      });
    }
  }

  public static render() {
    return {};
  }

  get data(): object {
    return this.data || {};
  }
};

export default JsonBuilder;