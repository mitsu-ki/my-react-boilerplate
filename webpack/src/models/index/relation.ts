import * as _ from 'lodash';
import * as assign from 'object-assign';
// import AuthorsData from '../Authors';
// import {IAuthors} from '../Authors';
// import BookStoresData from '../BookStores';
// import {IBookStores} from '../BookStores';
import BooksData from '../Books';
import { IBook } from '../Books';

const TableData = assign(
  {},
  // AuthorsData,
  // BookStoresData,
  BooksData
);

const books = TableData.books;
// const book_store = TableData.book_stores;
// const authors = TableData.authors;

export class Relation<T> {
  private records: T[];

  constructor(...args: T[]) {
    this.records = args;
  }

  each(block: (i: T) => any) {
    return _.each<T>(this.records, block);
  }

  map<TResult>(block: (i: T) => TResult) {
    return _.map<T, TResult>(this.records, block);
  }

  find(block: (i: T) => boolean): T | undefined {
    return _.find<T>(this.records, block);
  }

  where(block: (i: T) => boolean): T[] {
    return _.filter<T>(this.records, block);
  }
}

export class Books implements IBook {
  static collection(): Relation<Books> {
    return new Relation<Books>(
      ..._.map<IBook, Books>(books, (props: IBook) => {
        return new Books(props);
      })
    );
  }

  constructor(private props: IBook) {
    
  }

  get id(): number {
    return this.props.id;
  }

  get author_id(): number {
    return this.props.author_id;
  }

  get name(): string {
    return this.props.name;
  }
}


// export class BookStore implements IBookStores {
//   static collection(): Relation<BookStore> {
//     return new Relation<BookStore>(
//       ..._.map<IBookStores, BookStore>(book_store, (props: IBookStores) => {
//         return new BookStore(props);
//       })
//     );
//   }

//   constructor(private props: IBookStores) {
    
//   }
  
//   get id(): number {
//     return this.props.id;
//   }

//   // get name(): string {
//   //   return this.props.name;
//   // }

//   // set name(value: string) {
//   //   this.props.name = value;
//   // }
// }


// export class Authors implements IAuthors {
//   static collection(): Relation<Authors> {
//     return new Relation<Authors>(
//       ..._.map<IAuthors, Authors>(authors, (props: IAuthors) => {
//         return new Authors(props);
//       })
//     );
//   }

//   constructor(private props: IAuthors) {
    
//   }

//   // get id(): number {
//   //   return this.props.id;
//   // }

//   // get name(): string {
//   //   return this.props.name;
//   // }
// }
