const fetchProduct = require('../async');

/**
 * 비동기 코드 수행
 * 1. done을 콜백 인자로 받아와서 호출
 * 2. return을 호출
 * 3. await
 */

describe('Async', () => {
  it('async-done', (done) => {
    fetchProduct().then((item) => {
      expect(item).toEqual({ item: 'Milk', price: 2000 });
      done();
    });
  });

  it('async-return', () => {
    return fetchProduct().then((item) => {
      expect(item).toEqual({ item: 'Milk', price: 2000 });
    });
  });

  it('async-await', async () => {
    const product = await fetchProduct();
    expect(product).toEqual({ item: 'Milk', price: 2000 });
  });

  // 비동기이기 때문에 return 바로 붙이기
  it('async-resolves', () => {
    return expect(fetchProduct()).resolves.toEqual({ item: 'Milk', price: 2000 });
  });

  it('async-rejects', () => {
    expect(fetchProduct('error')).rejects.toBe('network error');
  });
});
