import { Record, List } from 'immutable';

const AuthorsRecord = Record({
  authors: [
    {
      id      : 1,
      name    : "村上春樹",
      books_id: [
        1,
        3
      ]
    },
    {
      id      : 2,
      name    : "村上龍",
      books_id: [
        2,
        5
      ]
    },
    {
      id      : 3,
      name    : "東野圭吾",
      books_id: [
        3
      ]
    }
  ]
});

class Authors extends AuthorsRecord {
  getAuthors() {
    return this.get('authors') || [];
  }
}

export default Authors;