<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
    <wt-snackbar />
  </v-app>
</template>

<script>
import WtSnackbar from '@/components/WtSnackbar.vue';

export default {
  name: 'App',

  components: { WtSnackbar },

  data: () => ({
    //
  }),
};
</script>
