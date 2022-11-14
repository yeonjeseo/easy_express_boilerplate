const ProductService = require('../product_service_no_di');
const ProductClient = require('../product_client');

/**
 * 모듈간 독립성 유지 필요
 * 네트워크 상태에 의존하는 테스트는 좋지 않다.
 * 이 때, ProductClient 자체를 mock 시킨다.
 */

/**
 * ProductService 내부의 Client는 Mock 시킬거야!
 */
jest.mock('../product_client');

describe('ProductService', () => {
  const fetchItems = jest.fn(async () => [
    {
      item: 'Milk',
      available: true,
    },
    {
      item: '🐬',
      available: false,
    },
  ]);

  /** 그 다음 mock과 product_client를 연결 */
  ProductClient.mockImplementation(() => {
    return {
      fetchItems: fetchItems,
    };
  });
  /** 이렇게 작성함으로써, ProductClient 자체의 테스트에 집중할 수 있음 */

  let productService;

  beforeEach(() => {
    productService = new ProductService();
    // test.config.mjs - clearMock 설정에 따라 다름.
    fetchItems.mockClear();
    ProductClient.mockClear();
  });

  it('should filter out only available items', async () => {
    const items = await productService.fetchAvailableItems();
    expect(items).toEqual([{ item: 'Milk', available: true }]);
    expect(items.length).toBe(1);
  });

  it('test', async () => {
    const items = await productService.fetchAvailableItems();
    /**
     * 하나의 describe내에서 mock을 테스트할 때, jest.config에 있는 clearMock 이 false로 되어 있다면, 테스트 실패할 가능성이 있음.
     */
    expect(fetchItems).toHaveBeenCalledTimes(1);
  });
});

/**
 * 진짜와 대체 가능한 하위 테스트 도구
 */
