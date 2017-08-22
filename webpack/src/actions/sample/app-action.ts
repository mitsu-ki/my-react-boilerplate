import AbstractAction from '../abstract-action';

class AppActions extends AbstractAction {
  static addBook() {
    this.update({
      books: [
        {
          id: 2
        }
      ]
    })
  }
}

export default AppActions;