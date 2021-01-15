<template>
  <v-app>
    <template v-if="!isAuthPath">
      <app-drawer></app-drawer>
      <app-bar></app-bar>
      <v-main>
        <v-container class="fill-height" fluid>
          <v-row>
            <router-view></router-view>
          </v-row>
        </v-container>
      </v-main>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
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
  computed: {
    isAuthPath() {
      const { name } = this.$route;
      return name === 'Login' || name === 'Register' ? true : false;
    },
  },
};
</script>
