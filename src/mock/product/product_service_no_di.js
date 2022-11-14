/**
 * No dependency version - 나쁜 버전
 */

const ProductClient = require('./product_client');

class ProductService {
  constructor() {
    this.productClient = new ProductClient();
  }

  /**
   * 받아온 데이터를 비즈니스 로직에 맞게 필터링하는 역할
   * 우리가 테스트하고 싶은 것은 비즈니스 로직!
   */
  fetchAvailableItems() {
    return this.productClient.fetchItem().then((items) => items.filter((item) => item.available));
  }
}

module.exports = ProductService;
