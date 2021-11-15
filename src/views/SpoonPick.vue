<template>
  <v-card class="py-5 px-10">
    <v-row>
      <v-col
        v-for="(column, index) in getColumns(spoonPickCastDjList)"
        :key="index"
      >
        <list-item
          v-for="item in column"
          :key="item.tag"
          :image-url="item.profile_url"
          :sub-title="randomHashtag"
          :title="item.nickname"
        />
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import ListItem from '../components/ListItem.vue';

const {
  mapGetters: mapGettersCast,
} = createNamespacedHelpers('cast');

export default {
  name: 'SpoonPick',

  components: {
    ListItem,
  },

  data: () => ({
    cols: 2,
  }),

  computed: {
    ...mapGettersCast([
      'spoonPickCastList',
    ]),

    spoonPickCastDjList() {
      return this.spoonPickCastList.map((o) => o.author);
    },

    randomHashtag() {
      const hashtagList = ['#라이브', '#고민상담', '#드라마', '#노래', '#피아노'];

      return hashtagList[Math.floor(Math.random() * hashtagList.length)];
    },
  },

  methods: {
    /**
     * 단 설정을 하는 함수
     * @returns {[]}
     */
    getColumns(itemList) {
      const columns = [];
      const mid = Math.ceil(itemList.length / this.cols);

      for (let col = 0; col < this.cols; col += 1) {
        const items = itemList.slice(col * mid, col * mid + mid);
        columns.push(items);
      }

      return columns;
    },
  },
};
</script>

<style scoped>

</style>
