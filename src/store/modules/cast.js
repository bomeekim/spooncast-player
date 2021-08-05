import { CAST_API } from '../../api/cast';

const state = {
  spoonPickCastList: [],
  last7DaysTopCastList: [],
  recommendCastList: [],
  categoryList: [],
  trendCastList: [],
  castList: [],
};

const getters = {
  spoonPickCastList: (state) => state.spoonPickCastList,
  last7DaysTopCastList: (state) => state.last7DaysTopCastList,
  recommendCastList: (state) => state.recommendCastList,
  categoryList: (state) => state.categoryList,
  trendCastList: (state) => state.trendCastList,
  castList: (state) => state.castList,
};

const actions = {
  getSpoonPickCastList: async ({ commit }) => {
    try {
      const { results } = await CAST_API.SPOON_PICK();

      if (results) {
        commit('setSpoonPickCastList', results);
      }
    } catch (err) {
      console.error(err);
    }
  },
  getLast7DaysTopCastList: async ({ commit }, payload) => {
    try {
      const { size } = payload;
      const { results } = await CAST_API.TOP(size);

      if (results) {
        commit('setLast7DaysTopCastList', results);
      }
    } catch (err) {
      console.error(err);
    }
  },
  getRecommendCastList: async ({ commit }, payload) => {
    try {
      const { size, id } = payload;
      const { results } = await CAST_API.RECOMMEND(size, id);

      if (results) {
        commit('setRecommendCastList', results);
      }
    } catch (err) {
      console.error(err);
    }
  },
  getCategoryList: async ({ commit }) => {
    try {
      const { results } = await CAST_API.CATEGORIES();

      if (results) {
        commit('setCategoryList', results);
      }
    } catch (err) {
      console.error(err);
    }
  },
  getTrendCastList: async ({ commit }, payload) => {
    try {
      const { size, category } = payload;
      const { results } = await CAST_API.TREND(size, category);

      if (results) {
        commit('setTrendCastList', results);
      }
    } catch (err) {
      console.error(err);
    }
  },
  // getCastList: async ({}) => {
  //   // try {
  //   //   const { size } = payload;
  //   //   const { data: { results } = await CAST_API.TOP(size);
  //   //
  //   //   if (results) {
  //   //     commit('setLast7DaysTopCastList', results);
  //   //   }
  //   // } catch (err) {
  //   //   console.error(err);
  //   // }
  // },
};

const mutations = {
  setSpoonPickCastList: (state, list) => {
    state.spoonPickCastList = list;
  },
  setLast7DaysTopCastList: (state, list) => {
    state.last7DaysTopCastList = list;
  },
  setCategoryList: (state, list) => {
    state.categoryList = list;
  },
  setRecommendCastList: (state, list) => {
    state.recommendCastList = list;
  },
  setTrendCastList: (state, list) => {
    state.trendCastList = list;
  },
  setCastList: (state, list) => {
    state.castList = list;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
