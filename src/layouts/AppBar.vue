<template>
  <v-app-bar dark color="primary" flat app>
    <v-app-bar-nav-icon @click="toggleDrawer">
      <v-icon v-text="menuIcon"></v-icon>
    </v-app-bar-nav-icon>

    <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

    <v-spacer />

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn @click="logout" text v-bind="attrs" v-on="on">
          <v-icon class="ml-1" v-html="logoutIcon" />
        </v-btn>
      </template>

      <span>Logout</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import { mdiMenu, mdiLogout } from '@mdi/js';
import { mapMutations } from 'vuex';
import { RepositoryFactory } from '@/repositories/repository-factory';
const authRepository = RepositoryFactory.get('auth');

export default {
  data() {
    return {
      menuIcon: mdiMenu,
      logoutIcon: mdiLogout,
    };
  },
  methods: {
    ...mapMutations(['toggleDrawer']),
    logout() {
      return authRepository
        .logout()
        .catch(() => {})
        .finally(() => {
          localStorage.setItem('isAuthenticated', false);
          this.$router.push({ name: 'Login' });
        });
    },
  },
};
</script>

<style></style>
