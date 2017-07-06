class Authors {
  public db() {
    return [
      {
        id      : 1,
        name    : "村上春樹",
        books_id: [
          1,
          4
        ]
      },
      {
        id  : 2,
        name: "村上龍",
        books_id: [
          2
        ]
      },
      {
        id  : 3,
        name: "東野圭吾",
        books_id: [
          3
        ]
      }
    ];
  }
}

export default Authors;