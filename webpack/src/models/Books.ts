export interface IBook {
  id       : number;
  name     : string;
  author_id: number;
}

export interface IBooks {
  books: IBook[];
}

const BooksData: IBooks = {
  books: [
    {
      id       : 1,
      name     : "initial book name",
      author_id: 1
    }
  ]
};

export default BooksData;
