<template>
  <v-card
    class="default-v-card"
    flat
    outlined
    width="100%"
  >
    <v-list three-line>
      <v-list-item
        :key="title"
        class="px-7"
      >
        <v-list-item-avatar
          height="80px"
          width="80px"
        >
          <v-img :src="imageUrl"/>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ title }}</v-list-item-title>
          <v-list-item-subtitle>{{ subTitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'ListItem',

  props: {
    imageUrl: {
      type: String,
      required: false,
      default: '',
    },

    title: {
      type: String,
      required: true,
    },

    subTitle: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style scoped>

</style>
