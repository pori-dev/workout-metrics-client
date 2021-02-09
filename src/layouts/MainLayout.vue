<template>
  <div class="fill-height">
    <app-drawer></app-drawer>
    <app-bar app></app-bar>
    <v-main class="grey lighten-3 fill-height">
      <v-container fluid class="pa-8">
        <slot />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import AppDrawer from '@/components/AppDrawer.vue';
import AppBar from '@/components/AppBar.vue';

export default {
  components: {
    AppDrawer,
    AppBar,
  },
};
</script>
