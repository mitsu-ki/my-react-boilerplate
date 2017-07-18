interface IBookStore {
  readonly id      : number;
  name    : string;
  books_id: number[];
}

export interface IBookStores {
  book_stores: IBookStore[]
}

const BookStoresData: IBookStores = {
  book_stores: [
    {
      id      : 1,
      name    : "initial store name",
      books_id: []
    }
  ]
};

export default BookStoresData;