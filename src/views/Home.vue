<template>
  <v-card
    height="calc(100vh - 145px)"
  >
    <card-list-with-title
      class="py-6 px-10"
      title="스푼PICK"
      :list="spoonPickCastList"
      @click:item="handleClickItem"
    />
    <card-list-with-title
      class="py-6 px-10"
      title="최근 7일 Top"
      :list="convertedLast7DaysTopCastList"
      @click:item="handleClickItem"
    />
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import CardListWithTitle from '../components/CardListWithTitle.vue';

const { mapMutations: mapMutationsApp } = createNamespacedHelpers('app');
const { mapGetters: mapGettersCast } = createNamespacedHelpers('cast');

export default {
  name: 'Home',

  components: {
    CardListWithTitle,
  },

  computed: {
    ...mapGettersCast([
      'spoonPickCastList',
      'last7DaysTopCastList',
      'categoryList',
    ]),

    convertedLast7DaysTopCastList() {
      return this.last7DaysTopCastList.map((obj) => ({
        cast_count: obj.cast_count,
        end_date: obj.end_date,
        score: obj.score,
        start_date: obj.start_date,
        updown: obj.updown,
        ...obj.cast,
      }));
    },
  },

  methods: {
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

</style>
