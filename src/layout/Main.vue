<template>
  <v-main class="rounded-b-lg glassmorphism">
    <v-container class="fill-height">
      <v-row>
        <v-col>
          <v-tabs-items v-model="currentTab.index">
            <v-tab-item
              v-for="item in tabMenu"
              :key="item.name"
            >
<!--              <v-card>-->
<!--                {{ item.component }}-->
<!--              </v-card>-->
              <component
                :is="currentComponent"
                class="tab"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
        <v-col class="main pl-0">
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
import ForYou from '../views/ForYou.vue';

// eslint-disable-next-line no-unused-vars
const { mapGetters: mapGettersApp, mapMutations: mapMutationsApp } = createNamespacedHelpers('app');
const { mapGetters: mapGettersCast, mapActions: mapActionsCast } = createNamespacedHelpers('cast');

export default {
  name: 'Main',

  components: {
    PlayerGuide,
    AudioPlayer,
    // eslint-disable-next-line vue/no-unused-components
    Home,
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

    ...mapGettersCast([
      'spoonPickCastList',
      'last7DaysTopCastList',
      'recommendCastList',
      'categoryList',
    ]),

    showMusicPlayer() {
      return this.musicPlaylist && this.musicPlaylist.length > 0;
    },
  },

  watch: {
    currentTab(newVal) {
      console.log(newVal);
      if (!newVal) return;

      this.currentComponent = newVal.component;
    },
  },

  // watch: {
  //   currentTab: {
  //     handler(index) {
  //       this.title = this.tabMenu[index];
  //
  //       // TODO 수정해야함!
  //       switch (index) {
  //         case 0:
  //           this.list = this.spoonPickCastList;
  //           break;
  //         case 1:
  //           this.list = this.recommendCastList;
  //           break;
  //         case 2:
  //           this.list = this.last7DaysTopCastList;
  //           break;
  //         default:
  //           break;
  //       }
  //     },
  //   },
  // },

  created() {
    this.getSpoonPickCastList();
    this.getLast7DaysTopCastList({ size: 5 });
    this.getCategoryList();
    this.getRecommendCastList({ size: 5, id: 101 });
  },

  methods: {
    ...mapActionsCast([
      'getSpoonPickCastList',
      'getLast7DaysTopCastList',
      'getCategoryList',
      'getRecommendCastList',
      'getTrendCastList',
    ]),

    ...mapMutationsApp([
      'setMusicPlaylist',
    ]),

    handleClickItem(item) {
      console.log('handleClickItem', item);

      if (!item) return;

      this.setMusicPlaylist({
        id: item.id,
        title: item.title,
        author: {
          nickname: item.author.nickname,
          id: item.author.id,
        },
        url: item.voice_url,
        image: item.img_url,
        duration: item.duration,
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100% !important;
}

.row {
  height: inherit;
  width: inherit;
}

.col {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>
