<template>
  <v-app>
    <app-drawer></app-drawer>
    <v-main>
      <app-bar></app-bar>
      <v-container class="fill-height" fluid>
        <v-row>
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-main>
    <wt-snackbar />
  </v-app>
</template>

<script>
import WtSnackbar from '@/components/WtSnackbar.vue';
import AppDrawer from '@/components/AppDrawer.vue';
import AppBar from '@/components/AppBar.vue';

export default {
  name: 'App',
  components: { WtSnackbar, AppDrawer, AppBar },
};
</script>
