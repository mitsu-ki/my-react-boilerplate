class BookStore {
  public db() {
    return [
      {
        id   : 1,
        name : "渋谷店",
        books: [
          1,
          2,
          3
        ]
      },
      {
        id  : 2,
        name: "新宿店",
        books: [
          1,
          3
        ]
      },
      {
        id  : 3,
        name: "池袋店",
        books: [
          1,
          2
        ]
      }
    ];
  }
}

export default BookStore;