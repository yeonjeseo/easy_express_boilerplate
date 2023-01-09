# 엘라스틱 서치?

---

## 1. 개념과 특징?

ElasticSearch 는 모든 유형(정형, 비정형)의 데이터를 처리할 수 있는 분산형 오픈 소스 검색 및 분석 엔진이다.

또한 ElasticSearch 는 REST API 를 제공하여 데이터를 처리하며, 분산형 특징으로 인해 트래픽에 따라 성을을 쉽게 스케일 업 할 수 있다. 

ElasticSearch 는 보통 ELK 스택이라고 불리는 ElasticSearch, Logstash, Kibana 이렇게 세 개의 스택과 함께 쓰인다.

## 2. ElasticSearch 에서 데이터를 저장하는 방법

ElasticSearch 에서 데이터를 저장할 때 index 단위로 저장한다.

예를 들어, 서버 API 관련된 로그들을 server_api_logs라는 이름에 index를 만들어 관련된 데이터를 저장한다.

추가적으로 index 에 저장되는 데이터들은 포맷을 정의할 수 있다.

## 3. ElasticSearch 는 어떻게 사용할 수 있을까? 

ElasticSearch 는 뛰어난 확장성과 빠른 속도로 아래와 같은 곳에서 사용할 수 있다.

- 검색 시스템
- 로깅, 로그 분석 시스템
- 인프라 매트릭, 턴케이너 모니터링
- 애플리케이션 성능 모니터링
- 위치 기반 정보 분석 및 시각화
- 기타 등등....

## 4. ElasticSearch 설치 방법

[ES 설치 참고 자료](https://medium.com/@teeppiphat/install-elasticsearch-docker-on-macos-m1-7dfbb8876b99)

GVdbmFHnLXn5ZNT_TeY5

## 5. ElasticSearch 의 장단점

ES는 NoSQL의 일종으로 분류할 수 있고, 분산 처리를 통해 실시간 성으로 빠른 검색이 가능하다. 기존 데이터로 처리하기 힘든 대량의 비정형 데이터 검색이 가능하며, 전문 검색(full text)과 구조 검색 모두를 지원한다. 또한, 기본적으로는 검색 엔진이지만, MongoDB나 Hbase와 같은 대용량 스토리지로도 활용 가능하다. 

### ES의 장점

- **오픈소스 검색 엔진이다.** 오픈소스 커뮤니티가 활발하고, ES를 끊임없이 개선, 발전 시키고 있다.
- **전문 검색.** 내용 전체를 색인해서 특정 단어가 포함된 문서를 검색할 수 있다. 기능별, 언어별 플러그인을 적용할 수 있다.
- **통계 분석** 함께 쓰이는 Kibana 를 연결하여 실시간으로 로그를 분석하고 시각화할 수 있다,
- **Schemaless** 정형화되지 않은 문서도 자동으로 색인하고 검색할 수 있다.
- **RESTful API** HTTP 기반 RESTful API를 활용하여 통신이 가능하다.
- **Multi-tenancy** 서로 상이한 인덱스도 검색 필드명이 같으면 여러 인덱스를 한번에 조회할 수 있다.
- **Document-Oriented** 여러 계층 구조의 문서로 저장이 가능하며, 계층 구조로 된 문서도 한번의 쿼리로 쉽게 조회할 수 있다.
- **역색인** 이 가능하다.
- **분산 환경 구성**이 가능하다. 분산 환경에서 데이터는 shard 라는 단위로 나뉜다.

## 참고자료

[Elasticsearch를 사용하여 Node.js로 로깅 서버 구축하기](https://velog.io/@jeff0720/Elasticsearch-%EC%9D%B4%ED%95%B4%EC%99%80-%EB%A1%9C%EA%B7%B8-%EC%84%9C%EB%B2%84-%EA%B5%AC%EC%B6%95-%EC%8B%A4%EC%8A%B5%EC%9C%BC%EB%A1%9C-%ED%95%B5%EC%8B%AC-%EA%B0%9C%EB%85%90-%EC%9D%B5%ED%9E%88%EA%B8%B0)