import * as React from 'react';
import * as _ from 'lodash';
import Actions from '../actions/action';

interface Book {
  id       : number;
  name     : string;
  author_id: number;
}
interface AppProps {
  data: any;
}

class ChildComponent extends React.Component<AppProps, {}> {
  render(): JSX.Element {
    return (
      <div>
        <p>This is ChildComponent</p>
        <ul>
          {this._resolveBooks(this.props.data.get("books"))}
        </ul>
        <button onClick={this._deleteHdl.bind(this)}>削除</button>
      </div>
    );
  }

  _resolveBooks(data: any) {
    return _.map(data, (val: Book, i) => {
      return this._resolvedBooks(val, i);
    })
  }

  _resolvedBooks(val: Book, i: number) {
    return (
      <li key={i}>
        Book name: {val.name}
      </li>
    );
  }

  _deleteHdl() {
    return Actions.delete.call(Actions, "books");
  }
 }

export default ChildComponent;
