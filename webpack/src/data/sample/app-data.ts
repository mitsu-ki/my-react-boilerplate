import JsonBuilder from '../json-builder';

// const Book = {
//   id       : 1,
//   name     : "",
//   author_id: 1
// };

const Books = [
  {
    id       : 1,
    name     : "上巻",
    author_id: 1
  },
  {
    id       : 2,
    name     : "下巻",
    author_id: 1
  }
];

const Author = {
  id      : 1,
  name    : "",
  books_id: [

  ]
};

const BookStore = {
  id      : 1,
  name    : "",
  books_id: [

  ]
};

interface AppData {
  _data: object;
  data : object;
}

class AppData extends JsonBuilder {
  public data: object;
  constructor() {
    super();
    this.data = {};
  }

  public static render() {
    this.data = {};

    this.hasMany('books', Books);
    this.hasMany('book_stores', BookStore);
    this.hasMany('authors', Author);

    this.hasOne('author', Author);

    return this.data;
  }
};

export default AppData;