import * as React from 'react';
import * as _ from 'lodash';
import AppAction from '../actions/app-action';

class Form extends React.Component<{}, {}> {
  static defaultProps = {
    type: 'input',
  };

  render() {
    return (
      <div>
        <div>
          書籍名：
          <input ref="name" type="text" />
        </div>
        <div>
          著者ID：
          <input ref="author_id" type="text" />
        </div>
        <button onClick={this.addHdl.bind(this)}>
          add favorite book
        </button>
      </div>
    );
  }

  private addHdl() {
    this.getData()
    // AppAction.create(this.getData());
    return null;
  }

  private getData(): Object {
    let data: Object = {books: [{}]};
    _.map(this.refs, (item, key) => {
      data.books[key] = item.value;
    });

    console.log(data);
    

    return data;
  }
}

export default Form;