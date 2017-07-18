import AppStore from '../stores/index/app-store';

class Actions {
  static create(newRecord: {}): void {
    this.data.unshift(newRecord);
    AppStore.setData(this.data);
  }

  static delete(id: number): void {
    this.data.splice(id, 1);
    AppStore.setData(this.data);
  }

  static updateRecord(id: number, newRecord: {}): void {
    this.data[id] = newRecord;
    AppStore.setData(this.data);  
  }

  static updateField(id: number, key: string, value: string | number) {
    this.data[id][key] = value;
    AppStore.setData(this.data);
  }

  get data(): Array<Object> {
    return AppStore.getData();
  }
}

export default Actions;