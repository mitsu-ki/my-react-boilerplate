import { Record } from 'immutable';

const BookStoresRecord = Record({
  book_stores: [
    {
      id      : 1,
      name    : "渋谷店",
      books_id: [
        1,
        2,
        3,
        4,
        5
      ]
    },
    {
      id       : 2,
      name     : "新宿店",
      books_id: [
        1,
        2
      ]
    },
    {
      id       : 3,
      name     : "池袋店",
      books_id: [
        1,
        5
      ]
    }
  ]
});

class BookStores extends BookStoresRecord {
  getBookStores() {
    return this.get('book_stores') || [];
  }
}

export default BookStores();