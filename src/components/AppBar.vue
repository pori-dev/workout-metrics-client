<template>
  <v-app-bar dark color="primary" flat app>
    <v-app-bar-nav-icon @click="toggleDrawer">
      <v-icon v-text="menuIcon"></v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mdiMenu } from '@mdi/js';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      menuIcon: mdiMenu,
    };
  },
  methods: {
    ...mapMutations(['toggleDrawer']),
  },
};
</script>

<style></style>
