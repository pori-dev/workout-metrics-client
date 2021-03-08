<template>
  <div class="fill-height">
    <app-drawer />
    <app-bar app />
    <v-main class="grey lighten-3 fill-height">
      <v-container fluid class="pa-8">
        <slot />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import AppBar from './AppBar.vue';
import AppDrawer from './AppDrawer.vue';

export default {
  components: {
    AppDrawer,
    AppBar,
  },
};
</script>
