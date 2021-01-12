<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Register</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          name="email"
          prepend-icon="mdi-email"
          type="text"
        >
        </v-text-field>

        <v-text-field
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="text"
        >
        </v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions class="pb-5">
      <v-spacer> </v-spacer>
      <v-btn color="primary">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
