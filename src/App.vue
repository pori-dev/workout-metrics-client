<template>
  <v-app>
    <app-drawer></app-drawer>
    <app-bar></app-bar>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row>
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-main>
    <app-snackbar />
  </v-app>
</template>

<script>
import AppSnackbar from '@/components/AppSnackbar.vue';
import AppDrawer from '@/components/AppDrawer.vue';
import AppBar from '@/components/AppBar.vue';

export default {
  name: 'App',
  components: { AppSnackbar, AppDrawer, AppBar },
};
</script>
