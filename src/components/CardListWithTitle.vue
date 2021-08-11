<template>
  <div>
    <v-row class="pa-5">
      <p class="text-xl-h6 text-lg-h6 text-subtitle-1 font-weight-medium">
        {{ title }}
      </p>
      <v-spacer />
      <v-btn
        class="pa-0"
        icon
      >
        <v-icon>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </v-row>

    <v-card
      class="d-flex flex-nowrap"
      width="inherit"
      flat
      rounded
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
          <v-hover v-slot="{ hover }">
            <v-card
              flat
              width="250"
              height="310"
              class="justify-center inner-card"
              :class="{ 'on-hover': hover }"
              @click="$emit('click:item', item)"
            >
              <v-card-text>
                <v-img
                  class="justify-center mx-auto rounded mb-2"
                  :src="item.img_url"
                  height="220"
                >
                  <div
                    v-if="hover"
                    class="hover-card
                           d-flex
                           text-h5
                           justify-center
                           align-center
                           align-content-center"
                  >
                    <p>
                      <span>
                        <v-icon>mdi-heart</v-icon>
                        {{ item.like_count }}
                      </span>
                      <span>
                        <v-icon>mdi-play</v-icon>
                        {{ item.play_count }}
                      </span>
                    </p>
                  </div>
                </v-img>
                <span
                  class="d-inline-block text-truncate subtitle-1 font-weight-medium"
                  style="max-width: 222px;"
                >
                  {{ item.title }}
                </span>
                <p>{{ item.author.nickname }}</p>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>
      </flicking>
    </v-card>
  </div>
</template>
<script>
// import { AutoPlay, Fade } from '@egjs/flicking-plugins';

// const plugins = [new AutoPlay({ duration: 2000, direction: 'NEXT', stopOnHover: false })];
// const plugins = [new Fade(), new AutoPlay(2000, 'NEXT')];

export default {
  name: 'CardListWithTitle',

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
    // plugins,
  }),
};
</script>

<style scoped>
p {
  margin: 0;
}

.card-text-title {
  letter-spacing: -0.05rem !important;
}

.hover-card {
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
}

.hover-card p,
.hover-card .v-icon {
  color: #eee;
}
</style>
