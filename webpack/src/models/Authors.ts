interface IAuthor {
  id      : number;
  name    : string;
  books_id: number[];
}

export interface IAuthors {
  authors: IAuthor[];
}

const AuthorsData: IAuthors = {
  authors: [
    {
      id      : 1,
      name    : "initial author name",
      books_id: []
    }
  ]
};


export default AuthorsData;