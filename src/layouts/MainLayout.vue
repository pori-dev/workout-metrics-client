<template>
  <div>
    <app-drawer></app-drawer>
    <app-bar></app-bar>
    <v-main>
      <div class="pa-5">
        <v-container fluid>
          <slot />
        </v-container>
      </div>
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
