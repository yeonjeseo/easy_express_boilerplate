const ProductService = require('../product_service_no_di');
const StubProductClient = require('./stub_product_client.js');

describe('ProductService - Stub', () => {
  let productService;

  /**
   * Dependency Injection
   */
  beforeEach(() => {
    productService = new ProductService(new StubProductClient());
  });

  it('should filter out only available items', async () => {
    const items = await productService.fetchAvailableItems();
    expect(items).toEqual([{ item: 'Milk', available: true }]);
    expect(items.length).toBe(1);
  });
});
