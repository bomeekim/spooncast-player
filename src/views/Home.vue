<template>
  <div>
    <card-list-with-title
      class="pb-16"
      title="스푼PICK"
      :list="spoonPickCastList"
    />
    <card-list-with-title
      class="mt-16"
      title="최근 7일 Top"
      :list="convertedLast7DaysTopCastList"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import CardListWithTitle from '../components/CardListWithTitle.vue';

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
};
</script>

<style scoped>

</style>
