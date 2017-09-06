import * as _ from 'lodash';

// function noop(): void {
//   return;
// };

class Jbuilder {
  constructor() {
    this.ignoreFalse = false;
    this.convert = null;
    this.data = {};
  };
  public create(prop, val) {
    if(val === undefined && typeof prop === "function") {
      prop(this);
    } else if (typeof prop === "function") {
      val(this);
      this.data[prop] = this.data;
    } else {
      if (this.ignoreFalse === val) this.prepareValue(val);
    }

    return this;
  }

  private setIgnoreFalse(val) {
    this.ignoreFalse = val;
  }

  private setConvert(fn) {
    this.convert = fn;
  }

  private prepareValue(val) {
    if(this.convert) val = this.convert(val);

    return val;
  }

  private target() {
    let json = this.data;
    return JSON.stringify(json);
  }

  private extract() {
    if(arguments.length < 2) throw new Error();

    let args = arguments;
    let obj = args[0];
    let self = this;

    if(_.isArray(object)) {
      self.data = [];
      _.forEach(obj, (val) => {
        self.data.push(self.extractFormObject(val, args));
      });
    } else {
      self.data = self.extractFormObject(obj, args);
    }
  }

  private extractFormObject(val, keys) {
    let result = {};

    for(let i = 0; i < keys.length; i++) {
      let key = keys[i];
      result[key] = this.prepareValue(val[key]);
    }

    return result;
  }

  private child(props) {
    let tempContainer = new Jbuilder();
    props(tempContainer);

    if(_.isArray(this.data)) {
      this.data.push(tempContainer.data);
    }
  }


  // private data: object;
  // private isArray: boolean;
  // private isChild: boolean;
  // private isLastArray: boolean;
  // private nestKey: string[];
  // private funcTimes: number;

  // constructor() {
  //   this.data = this.data || {};
  //   this.initialize();
  //   this.nestKey = [];
  //   this.funcTimes = 0;
  // }

  // public encode(fn: Function) {
  //   return fn(this);
  // }

  // public set(key: string, val: string | any[] | object | Function, ...keys: string[]) {
  //   // console.log("isLastArray: " + this.isLastArray);
  //   this.funcTimes++;
  //   if (this.isArray) {
  //     noop();
  //     // this.XXX = this.isLastArray ? null * this.nestKey.push(key);
  //   } else {
  //     this.nestKey.push(key);
  //   }

  //   if(typeof val === "function") return val();

  //   let updateObj = {};

  //   if(keys.length === 0) {
  //     updateObj = { [key]: val };
  //   } else {
  //     let attributes = {};
      
  //     _.map(keys, (target) => {
  //       _.assign(attributes, {[target]: val[target]});
  //     });
      
  //     updateObj = _.set({}, this.nestKey, this.isArray ? [attributes] : attributes);
  //   }

  //   this.merge(updateObj);
  //   // console.log(updateObj);
  //   // console.log(this.updateData);

  //   _.assign(this.data, updateObj);

  //   if(this.isLastArray) this.nestKey = [];
  //   this.initialize();
  // }

  // // **トップレベルでないと使えない**
  // // json.array(people, (person) => {
  // //   json.name(person.name);
  // //   json.age(person.birthday);
  // // });
  // //
  // // [ { "name": David", "age": 32 }, { "name": Jamie", "age": 31 } ]
  // //
  // // If you omit the block then you can set the top level array directly:
  // // 
  // // json.array([1, 2, 3]);
  // // 
  // // [1,2,3];
  // public array(arrayObj: object[], fn: Function) {
  //   if(1 < this.funcTimes) throw new Error("'array' should be used only at the top level");
  //   // if(!fn) return _.assign(this.data, arrayObj);
    
  //   _.each(arrayObj, (obj, i: number) => {
  //     this.isArray = true;
  //     if(i === arrayObj.length) this.isLastArray = true;
  //     return fn(obj);
  //   });
  // }

  // public extract(obj, ...attributes) {
  //   _.each(attributes, (key) => {
  //     this.setValue(key, obj[key]);
  //   });
  // }

  // // json.comments(() => {
  // //   json.child(json.content("hello"));
  // //   json.child(json.content("world"));
  // // });
  // // 
  // // { "comments": [ { "content": "hello" }, { "content": "world" } ]}
  // public child(obj: object) {
  //   if(_.isArray(this.data)) {
  //     this.data = [];
  //   } else {
  //     this.data = this.data.push(obj);
  //   }
  //   this.isChild = true;
  //   this.isLastArray = true;
  //   return fn();
  // }

  // public render() {
  //   return this.data;
  //   // return JSON.stringify(this.data);
  // }

  // private merge(hashOrArray) {
  //   this.data = _.merge(this.data, hashOrArray);
  // }

  // private initialize() {
  //   console.log("init");
  //   this.isArray = false;
  //   this.isChild = false;
  //   this.isLastArray = true;
  //   this.funcTimes = 0;
  // }

  // private setValue(key: string, value) {
  //   if(_.isNull(this.data)) throw new Error("This data is null");
  //   if(_.isArray(this.data)) throw new Error("This data should be an array");
  //   if(this.isBlank) this.data = {};
  //   this.data[key] = value;
  //   // return if @ignore_nil && value.nil? or _blank?(value)
  //   // @attributes = {} if _blank?
  //   // @attributes[_key(key)] = value
  // }
};

export default new Jbuilder();

