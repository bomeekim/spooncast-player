<template>
  <v-main class="rounded-b-lg glassmorphism">
    <v-container class="fill-height">
      <v-row>
        <v-col cols="8">
          <v-tabs-items v-model="currentTab.index">
            <v-tab-item
              v-for="item in tabMenu"
              :key="item.name"
            >
              <component
                :is="currentComponent"
                class="tab default-v-card"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
        <v-col
          class="main pl-0"
          cols="4"
        >
          <audio-player v-if="showMusicPlayer" />
          <player-guide v-else />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PlayerGuide from '../components/PlayerGuide.vue';
import AudioPlayer from '../components/AudioPlayer.vue';
import Home from '../views/Home.vue';
import SpoonPick from '../views/SpoonPick.vue';
import ForYou from '../views/ForYou.vue';

// eslint-disable-next-line no-unused-vars
const { mapGetters: mapGettersApp } = createNamespacedHelpers('app');
const { mapActions: mapActionsCast } = createNamespacedHelpers('cast');

export default {
  name: 'Main',

  components: {
    PlayerGuide,
    AudioPlayer,
    // eslint-disable-next-line vue/no-unused-components
    Home,
    SpoonPick,
    // eslint-disable-next-line vue/no-unused-components
    ForYou,
  },

  data: () => ({
    currentComponent: null,
  }),

  computed: {
    ...mapGettersApp([
      'currentTab',
      'tabMenu',
      'musicPlaylist',
    ]),

    showMusicPlayer() {
      return this.musicPlaylist && this.musicPlaylist.length > 0;
    },
  },

  watch: {
    currentTab(newVal) {
      if (!newVal) return;

      this.currentComponent = newVal.component;
    },
  },

  created() {
    // 최신 캐스트 조회
    this.getRecentlyCastList();

    // 스푼PICK 캐스트 조회
    this.getSpoonPickCastList();

    // 최근 7일 기준 인기 캐스트 조회
    this.getLast7DaysTopCastList({ size: 5 });

    // 캐스트 카테고리 조회
    this.getCategoryList();

    // TODO ForYou 컴포넌트로 이동
    this.getRecommendCastList({ size: 5, id: 101 });
  },

  methods: {
    ...mapActionsCast([
      'getRecentlyCastList',
      'getSpoonPickCastList',
      'getLast7DaysTopCastList',
      'getCategoryList',
      'getRecommendCastList',
      'getTrendCastList',
    ]),
  },
};
</script>

<style scoped>
.container {
  max-width: 100% !important;
  height: calc(100vh - 145px);
}

.row {
  height: inherit;
  width: inherit;
}

.col {
  padding-top: 16px !important;
  padding-bottom: 0 !important;
  height: inherit;
}

::v-deep .v-window.v-tabs-items {
  overflow-y: auto;
  height: inherit;
}
</style>
