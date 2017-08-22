import * as React from 'react';
import * as assign from 'object-assign';
import * as _ from 'lodash';
import AppStore from '../stores/sample/app-store';
import AppConstant from '../constants/sample/app-constants';
import AppAction from '../actions/sample/app-action';
// import SubLoader from './sub-loader';
import Jbuilder from '../data/Jbuilder';
// const global = Function('return this')();

export interface AppProps {}

export interface AppState {
  // Sub?: React.Component<any, any>;
}

class App extends React.Component<AppProps, AppState> {
  private boundStoreHdl: Function;
  private _store: AppState;

  constructor(props: AppProps, state: AppState) {
    super(props, state);

    // this.state = {
    //   Sub: undefined
    // };

    this.state = assign({}, this.store.state);

    this.boundStoreHdl = this.storeHdl.bind(this);
  }

  componentDidMount() {
    this.store.addListener(AppConstant.EVENTS.CHANGED, this.boundStoreHdl);
  }

  componentWillUnmount() {
    this.store.removeListener(AppConstant.EVENTS.CHANGED, this.boundStoreHdl);
  }

  // load() {
  //   const script: HTMLScriptElement = document.createElement('script');
  //   script.onload = () => {
  //     this.setState({
  //       Sub: global.Sub
  //     });
  //   };
  //   script.src = '/debug/sub.js';
  //   document.body.appendChild(script);
  // }

  render(): JSX.Element {
    let data = {
      id   : 1,
      name : "my name",
      email: "test@test.com" 
    };
    let array = [1, 2, 3];
    let arrayObj = [
      {
        rank    : 1,
        customer: {
          name : "user1",
          email: "test@test.com"
        }
      },
      {
        rank    : 2,
        customer: {
          name : "user2",
          email: "user2@test.com"
        }
      }
    ];

    let jbuilder = new Jbuilder();
    jbuilder.encode((json: Jbuilder) => {
      json.set("foo", array);
      json.set("all_data", data);
      json.set("specific_data", data, "name", "email");
      json.set("children", () => {
        console.log('child');
        console.log();

        
        json.array(arrayObj, () => {
          console.log('grand child');
          // json.set("rank", )
        });
      });
    });

    console.log(jbuilder.render());

    return (
      <div>
        {/* <h1>sample</h1>
        {this.resolveContents()} */}
        {/* {this._resolveSub()} */}
        {/* <button type="button"
                onClick={this.clickHdl.bind(this)}>
          update button
        </button> */}
      </div>
    );
  }

  clickHdl() {
    AppAction.addBook.call(AppAction);
  }

  resolveContents() {
    return _.map(this.state.books, (item, i) => {
      console.log(item);
      
      return (
        <div key={i}>
          {item.name}
        </div>
      );
    });
  }

  // _resolveSub() {
  //   if(global.Sub) {
  //     return (<global.Sub message="Sub World"/>);
  //   } else {
  //     return (<SubLoader load={this.load.bind(this)}/>);
  //   }
  // }

  private storeHdl(): void {
    this.setState(this.store.state);
  }

  get store(): any {
    this._store = this._store || AppStore.getInstance("surveys");
    
    return this._store;
  }
}

export default App;
