class ProductClient {
  fetchItem() {
    return fetch('https://dev-api.schoolup.co.kr/api/v1/healthCheck').then((response) => response.json());
  }
}

module.exports = ProductClient;
