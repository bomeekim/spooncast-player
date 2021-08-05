const state = {
  currentTab: null,
  // tabMenu: ['홈', 'For YOU', '내 캐스트', '랜덤 재생'],
  tabMenu: [
    { index: 0, name: '홈', component: 'Home' },
    { index: 1, name: 'For YOU', component: 'ForYou' },
    { index: 2, name: '내 캐스트', component: 'MyCast' },
    { index: 3, name: '검색', component: 'Search' },
  ],
  musicPlaylist: [],
};

const getters = {
  currentTab: (state) => state.currentTab,
  tabMenu: (state) => state.tabMenu,
  musicPlaylist: (state) => state.musicPlaylist,
};

const actions = {
};

const mutations = {
  setCurrentTab: (state, currentTab) => {
    console.log('currentTab', currentTab);
    state.currentTab = currentTab;
  },
  setMusicPlaylist: (state, list) => {
    state.musicPlaylist.push(list);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
