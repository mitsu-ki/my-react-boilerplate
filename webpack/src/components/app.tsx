import * as React from 'react';
import * as assign from 'object-assign';
// import * as _ from 'lodash';
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
    // model => TODO: relationを有効活用する
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

    // build
    let data = Jbuilder.encode((json) => {
      json.set('name', 'Mario');
    });
    // Jbuilder.encode((json) => {
    //   json.set("foo", array);
    //   json.set("all_data", data);
    //   json.set("specific_data", data, "name", "email");
    //   // this is bad
    //   json.set("array", () => {
    //     json.array(arrayObj, (obj: object) => {
    //       json.set("rank", obj, "rank");
    //     });
    //   });
    //   json.array(arrayObj, (obj: object) => {
    //     json.set("rank", obj, "rank");
    //   });
    //   json.set("child", () => {
    //     json.child(() => {
    //       json.set("child_key", data, "name");
    //     });
    //   });

    //   // json.set("more_child", () => { 
    //   //   json.child(() => {
    //   //     json.set("more_child_key1", () => {
    //   //       json.child(() => {
    //   //         json.set("more_child_end", data, "name", "email");
    //   //         json.set("more_child_end2", data);
    //   //       });
    //   //     });
    //   //   });
    //   // });
    // });

    console.log(data);

    // 次の形になるべき
    // {
    //    "foo":[1,2,3],
    //    "all_data": {
    //      "id":1,
    //      "name":"my name",
    //      "email":"test@test.com"
    //    },
    //    "specific_data": {
    //      "name":"my name",
    //      "email":"test@test.com"
    //    },
    //    "array": [
    //      {
    //        "rank":1
    //      },
    //      {
    //        "rank":2
    //      }
    //    ],
    //    "child": [
    //      {
    //        "child_key": "my name"
    //      }
    //    ]
    // }
    

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

  // resolveContents() {
  //   return _.map(this.state.books, (item, i) => {
  //     console.log(item);
      
  //     return (
  //       <div key={i}>
  //         {item.name}
  //       </div>
  //     );
  //   });
  // }

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
