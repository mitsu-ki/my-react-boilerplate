import * as React from 'react';
import * as _ from 'lodash';

export interface AppProps {
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
      </div>
    );
  }

  _resolveBooks(data: any) {
    return _.map(data, (val, i) => {
      return this._resolvedBooks(val, i);
    })
  }

  _resolvedBooks(val, i: number) {
    console.log(val);
    return (
      <li key={i}>
        Book name: {val.name}
      </li>
    );
  }
}

export default ChildComponent;
