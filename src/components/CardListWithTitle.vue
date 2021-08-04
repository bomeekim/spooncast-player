<template>
  <v-card>
    <v-card-title>
      <p>{{ title }}</p>
      <v-spacer />
      <v-btn text>
        더보기
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
<!--      TODO 가로로 배치-->
      <template
        v-for="(item, index) in list"
      >
        <v-card
          :key="index"
          max-width="250"
          class="justify-center"
          flat
        >
          <v-card-text class="justify-center mx-auto">
            <v-img
              :src="item.img_url"
              height="200"
            />
          </v-card-text>
          <v-card-actions class="flex-column">
            <p>{{ item.title }}</p>
            <p>{{ item.author.nickname }}</p>
          </v-card-actions>
        </v-card>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
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
};
</script>

<style scoped>

</style>
