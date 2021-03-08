<template>
  <v-app>
    <router-view></router-view>
    <app-snackbar />
  </v-app>
</template>

<script>
import AppSnackbar from '@/components/common/AppSnackbar.vue';

export default {
  name: 'App',
  components: { AppSnackbar },
};
</script>
