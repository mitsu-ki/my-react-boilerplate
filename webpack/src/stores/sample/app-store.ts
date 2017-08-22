import AbstractStore from '../abstract-store';
import AppConstants from '../../constants/sample/app-constants';
import AppData from '../../data/sample/app-data';


class AppStore extends AbstractStore {
  public static emit: Function;
  constructor(key: string) {    
    super(key);    
    this._state = AppData.render();
  }

  public trigger(): void {    
    this.emit(AppConstants.EVENTS.CHANGED);
  }
}

export default AppStore;