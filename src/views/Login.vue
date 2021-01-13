<template>
  <v-container class="fill-height blue-grey darken-3" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <auth-form auth-type="login"></auth-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthForm from '@/components/forms/AuthForm.vue';
export default {
  name: 'Login',
  components: {
    AuthForm,
  },
};
</script>

<style></style>
