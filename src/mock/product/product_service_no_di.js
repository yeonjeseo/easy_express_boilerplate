/**
 * No dependency version - 나쁜 버전
 */
class ProductService {
  constructor(productClient) {
    this.productClient = productClient;
  }

  /**
   * 받아온 데이터를 비즈니스 로직에 맞게 필터링하는 역할
   * 우리가 테스트하고 싶은 것은 비즈니스 로직!
   */
  fetchAvailableItems() {
    return this.productClient.fetchItems().then((items) => items.filter((item) => item.available));
  }
}

module.exports = ProductService;

/**
 * 클래스 내부에서 클래스 생성, 정의 등 하는 것은 의존성 주입 원칙에 위배
 * 외부에서 받아와야 함
 */
