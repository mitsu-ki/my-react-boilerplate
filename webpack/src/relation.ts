import * as _ from 'lodash';
import Table from './models/Table';

const TableData = Table;
const BookStoreData = TableData.book_stores;
const BooksData = TableData.books;
const AuthorsData = TableData.authors;

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

export interface BookStoreProps {
  readonly id: number;
  name       : string;
}

export class BookStore implements BookStoreProps {
  static collection(): Relation<BookStore> {
    return new Relation<BookStore>(
      ..._.map<BookStoreProps, BookStore>(BookStoreData, (props: BookStoreProps) => {
        return new BookStore(props);
      })
    );
  }

  constructor(private props: BookStoreProps) {
    
  }
  
  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  // get answerItems() {
  //   return AnswerItem.collection().where(answerItem => {
  //     return answerItem.question_id === this.id;
  //   });
  // }
}

export interface BooksProps {
  readonly id: number;
  readonly author_id: number;
  name: string;
}

export class Books implements BooksProps {
  static collection(): Relation<Books> {
    return new Relation<Books>(
      ..._.map<BooksProps, Books>(BooksData, (props: BooksProps) => {
        return new Books(props);
      })
    );
  }

  constructor(private props: BooksProps) {
    
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

export interface AuthorsProps {
  readonly id: number;
  name: string;
}

export class Authors implements AuthorsProps {
  static collection(): Relation<Authors> {
    return new Relation<Authors>(
      ..._.map<AuthorsProps, Authors>(AuthorsData, (props: AuthorsProps) => {
        return new Authors(props);
      })
    );
  }

  constructor(private props: AuthorsProps) {
    
  }

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }
}
