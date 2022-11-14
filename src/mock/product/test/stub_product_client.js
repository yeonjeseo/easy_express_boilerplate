class StubProductClient {
  async fetchItems() {
    return [
      {
        item: 'Milk',
        available: true,
      },
      {
        item: '🐬',
        available: false,
      },
    ];
  }
}

module.exports = StubProductClient;
