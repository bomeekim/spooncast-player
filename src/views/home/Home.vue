<template>
  <v-main class="rounded-b-lg glassmorphism">
    <v-container class="fill-height">
      <v-row>
        <v-col>
          <card-list-with-title
            title="스푼 Pick"
            :list="spoonPickCastList"
          />
        </v-col>
        <v-col class="main pl-0">
          <player-guide />
          <audio-player />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PlayerGuide from '../../components/PlayerGuide.vue';
import AudioPlayer from './components/AudioPlayer.vue';
import CardListWithTitle from '../../components/CardListWithTitle.vue';

// eslint-disable-next-line no-unused-vars
const { mapGetters: mapGettersCast, mapActions: mapActionsCast } = createNamespacedHelpers('cast');

export default {
  name: 'Home',

  components: {
    PlayerGuide,
    AudioPlayer,
    CardListWithTitle,
  },

  data: () => ({
    test: {},
  }),

  computed: {
    ...mapGettersCast([
      'spoonPickCastList',
      'last7DaysTopCastList',
      'recommendCastList',
      'categoryList',
    ]),
  },

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
