<template>
  <v-app class="pa-10">
    <Header />
    <Main />
  </v-app>
</template>

<script>
import Header from './layout/Header.vue';
import Main from './layout/Main.vue';

export default {
  name: 'App',

  components: {
    Header,
    Main,
  },
};
</script>

<style lang="scss">
@import 'src/scss/index.scss';
</style>
