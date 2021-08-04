<template>
  <v-app class="pa-10">
    <Home />
  </v-app>
</template>

<script>
import Home from './views/home/Home.vue';

export default {
  name: 'App',

  components: {
    Home,
  },
};
</script>

<style lang="scss">
@import 'src/scss/index.scss';
</style>
