interface BookData {
  id       : number;
  name     : string;
  author_id: number;
}
interface Authors{
  id      : number;
  name    : string;
  books_id: [number];
}
interface BookStores {
  id      : number;
  name    : string;
  books_id: [number];
}

interface Data {
  books      : [BookData];
  authors    : [Authors];
  book_stores: [BookStores];
}

const Table = function(): Data {
  return {
    books: [
      {
        id       : 1,
        name     : "海辺のカフカ",
        author_id: 1
      },
      {
        id       : 2,
        name     : "限りなく透明に近いブルー",
        author_id: 2
      },
      {
        id       : 3,
        name     : "ノルウェイの森",
        author_id: 1
      },
      {
        id       : 4,
        name     : "流星ワゴン",
        author_id: 3
      },
      {
        id       : 5,
        name     : "半島を出よ",
        author_id: 2
      }
    ],
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
        id  : 2,
        name: "村上龍",
        books_id: [
          2,
          5
        ]

      },
      {
        id  : 3,
        name: "東野圭吾",
        books_id: [
          4
        ]
      }
    ],
    book_stores: [
      {
        id      : 1,
        name    : "新宿店",
        books_id: [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        id      : 2,
        name    : "渋谷店",
        books_id: [
          1,
          4,
          5
        ]
      },
      {
        id      : 3,
        name    : "池袋店",
        books_id: [
          3,
          4,
          5
        ]
      }
    ]
  };
};

export default Table();
