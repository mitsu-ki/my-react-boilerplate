import * as React from 'react';
import * as _ from 'lodash';

import Form from './Form';

import AppConstant from '../constants/index/app-constants';
import AppStore from '../stores/index/app-store';
import BooksData, {IBook} from '../models/Books';

export interface AppProps {
  preState: {};
}

export interface AppState {
  books  : IBook[];
  addnew?: boolean;
}

class App extends React.Component<AppProps, AppState> {
  state: AppState;

  constructor(props: AppProps, state: AppState) {
    super(props, state);

    this.state = {
      books: BooksData.books
    };
    AppStore.appAddListener(AppConstant.EVENTS.CHANGED, () => {
      this.setState({
        books: BooksData.books
      });
    })
  }

  shouldComponentUpdate({}, newState: AppState): boolean {
    return newState.addnew !== this.state.addnew || newState.books !== this.state.books;

  }

  render(): JSX.Element {
    console.log(this.state.books);
    return (
      <div>
        <h1>Hello, World!!</h1>
        <p>my favorite books</p>
        <ul>
          {this.resolveContents()}
        </ul>
        <hr/>
        <Form />
      </div>
    );
  }

  private resolveContents(): JSX.Element[] {
    return _.map(this.state.books, (item, i) => {
      return this.resolvedContents(item, i);
    });
  }

  private resolvedContents(item: IBook, i: number) {
    return (
      <li key={i}>
        {item.name}
      </li>
    )
  }
}

export default App;
