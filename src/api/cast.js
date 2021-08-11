import { connection } from './index';

export const CAST_API = {
  /**
   * 스푼캐스트 스푼 PICK 조회 API
   */
  SPOON_PICK: () => connection.get('/casts/featured/'),
  /**
   * 최신 캐스트 조회 API
   */
  RECENT: () => connection.get('casts/recent/'),
  /**
   * 스푼캐스트 최근 7일 TOP 100 조회 API
   */
  TOP: (size = 10) => connection.get(`/ranks/cast?v=2&page_size=${size}`),
  /**
   * 스푼캐스트 카테고리 조회 API
   */
  CATEGORIES: () => connection.get('/casts/categories/'),
  /**
   * 스푼캐스트 추천 캐스트 조회 API
   * @param size 페이지 사이즈
   * @param id 추천 모델 번호
   */
  RECOMMEND: (size = 10, id = 101) => connection.get(`/recommend/cast/props/?page_size=${size}&model_id=${id}`),
  /**
   * 카테고리 별 캐스트 조회 API
   * @param size 페이지 사이즈
   * @param category 카테고리 이름
   */
  TREND: (size = 10, category) => connection.get(`/casts/trend?page_size=${size}&category=${category}`),
};

export default {
  CAST_API,
};
