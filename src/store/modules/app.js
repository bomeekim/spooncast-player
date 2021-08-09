const state = {
  currentTab: null,
  tabMenu: [
    { index: 0, name: '홈', component: 'Home' },
    { index: 1, name: '스푼PICK', component: 'SpoonPick' },
    { index: 2, name: '스푼차트', component: 'SpoonChart' },
    { index: 3, name: 'For YOU', component: 'ForYou' },
    { index: 4, name: '테마별', component: 'Hashtag' },
    { index: 5, name: '검색', component: 'Search' },
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
