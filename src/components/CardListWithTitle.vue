<template>
  <div>
    <v-row class="pa-5">
      <p>{{ title }}</p>
      <v-spacer />
      <v-btn text>
        더보기
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-row>
    <v-card
      class="d-flex flex-nowrap"
      width="inherit"
      flat
    >
      <flicking
        class="flicking"
        :options="{ circular: true, gap: 10, duration: 500 }"
      >
        <!--        :plugins="plugins"-->
        <div
          v-for="(item, index) in list"
          :key="index"
          class="card-panel"
        >
          <v-card
            flat
            width="250"
            height="280"
            class="justify-center"
            @click="$emit('click:item', item)"
          >
            <v-card-text class="pa-1">
              <v-img
                class="justify-center mx-auto rounded"
                :src="item.img_url"
                height="200"
                width="200"
              />
            </v-card-text>
            <v-card-actions class="flex-column">
              <p>{{ item.title }}</p>
              <p>{{ item.author.nickname }}</p>
            </v-card-actions>
          </v-card>
        </div>
      </flicking>
    </v-card>
  </div>
</template>
<script>
import { Flicking } from '@egjs/vue-flicking';
import { AutoPlay, Fade } from '@egjs/flicking-plugins';

// const plugins = [new AutoPlay({ duration: 2000, direction: 'NEXT', stopOnHover: false })];
const plugins = [new Fade(), new AutoPlay(2000, 'NEXT')];

export default {
  name: 'CardListWithTitle',

  components: {
    Flicking,
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    list: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    plugins,
  }),
};
</script>

<style scoped>
@import url('../../node_modules/@egjs/vue-flicking/dist/flicking.css');

p {
  margin: 0;
}
</style>
