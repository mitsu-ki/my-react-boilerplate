import * as React from 'react';
import SubLoader from './sub-loader';
import ChildComponent from './child-component';
import AppStore from '../stores/AppStore';

const global = Function('return this')();

export interface AppProps {
  
}

export interface AppState {
  Sub?: React.Component<any, any>;
  data: object | null;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);

    this.state = {
      Sub : undefined,
      data: null
    };
  }

  static getStores() {
    return [AppStore];
  }

  static calculateState() {
    return {
      "data": AppStore.getState()
    };
  }

  load() {
    const script: HTMLScriptElement = document.createElement('script');
    script.onload = () => {
      this.setState({
        Sub: global.Sub
      });
    };
    script.src = '/debug/sub.js';
    document.body.appendChild(script);
  }

  render(): JSX.Element {
    console.log(this.state.data);
    return (
      <div>
        <h1>Hello, World!!</h1>
         {this._resolveSub()} 
        <ChildComponent data={this.state.data} />
      </div>
    );
  }

  _resolveSub() {
    if(global.Sub) {
      return (<global.Sub message="Sub World"/>);
    } else {
      return (<SubLoader load={this.load.bind(this)}/>);
    }
  }
}

export default App;
