<template>
  <v-container class="fill-height blue-grey darken-3" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <auth-form></auth-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthForm from '@/components/forms/AuthForm.vue';
export default {
  components: {
    AuthForm,
  },
};
</script>

<style></style>
