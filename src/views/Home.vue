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
      <p class="pl-2 text-xl-h6 text-lg-h6 text-subtitle-1 font-weight-medium mr-1">
        테마로 즐기는 캐스트
      </p>
      <v-chip-group
        active-class="category-chip__active"
        class="px-4"
        column
        mandatory
      >
        <v-chip
          v-for="(category, index) in categoryList"
          :key="category.name"
          class="font-weight-medium mr-2"
          @click="handleClickCategoryChip({ ...category, index })"
        >
          {{ category.emoji }} {{ category.name }}
        </v-chip>
      </v-chip-group>
      <card-list-with-title
        :list="trendCastList"
        class="py-6 px-10"
        @click:item="handleClickItem"
      />
    </div>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import CardListWithTitle from '../components/CardListWithTitle.vue';

const { mapMutations: mapMutationsApp } = createNamespacedHelpers('app');
const {
  mapGetters: mapGettersCast,
  mapMutations: mapMutationsCast,
  mapActions: mapActionsCast,
} = createNamespacedHelpers('cast');

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
      'trendCastList',
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

  watch: {
    categoryList: {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.getTrendCastList({
            size: 30,
            category: this.categoryList[this.selectedCategoryIndex].category,
          });
        }
      },
    },
  },

  data: () => ({
    selectedCategoryIndex: 0,
  }),

  methods: {
    ...mapMutationsApp([
      'setMusicPlaylist',
    ]),

    ...mapMutationsCast([
      'setTrendCastList',
    ]),

    ...mapActionsCast([
      'getTrendCastList',
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

    handleClickCategoryChip(chip) {
      const { index, category } = chip;

      if (this.selectedCategoryIndex !== index) {
        this.selectedCategoryIndex = index;

        this.setTrendCastList([]);

        this.getTrendCastList({
          size: 30,
          category,
        });
      }
    },
  },
};
</script>

<style scoped>
.category-chip__active {
  background-color: #ff4100 !important;
  color: white !important;
}
</style>
