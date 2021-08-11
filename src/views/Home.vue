<template>
  <v-card>
    <card-list-with-title
      class="py-6 px-10"
      title="최신 캐스트"
      :list="recentlyCastList"
      @click:item="handleClickItem"
      @click:all="handleClickListenToAll"
    />
    <card-list-with-title
      class="py-6 px-10"
      title="스푼PICK"
      :list="spoonPickCastList"
      @click:item="handleClickItem"
      @click:all="handleClickListenToAll"
    />
    <card-list-with-title
      class="py-6 px-10"
      title="최근 7일 Top"
      :list="convertedLast7DaysTopCastList"
      @click:item="handleClickItem"
      @click:all="handleClickListenToAll"
    />
    <div class="py-6 px-10">
      <Flicking :options="{ moveType: 'freeScroll', bound: true }">
        <span
          v-for="category in categoryList"
          :key="category.name"
          class="mr-2"
        >
          <v-chip
            class="font-weight-medium"
            color="white"
          >
            {{ category.emoji }} {{ category.name }}
          </v-chip>
        </span>
      </Flicking>
    </div>
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
      'recentlyCastList',
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

    handleClickListenToAll(list) {
      this.setMusicPlaylist(list);
    },
  },
};
</script>

<style scoped>

</style>
