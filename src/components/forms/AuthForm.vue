<template>
  <v-form>
    <v-text-field
      label="Email"
      name="email"
      v-model="email"
      :prepend-icon="emailIcon"
      type="text"
      @blur="$v.email.$touch()"
      :error-messages="emailErrors"
    >
    </v-text-field>

    <v-text-field
      label="Password"
      name="password"
      type="password"
      v-model="password"
      :prepend-icon="passwordIcon"
      @blur="$v.password.$touch()"
      :error-messages="passwordErrors"
      :messages="passwordMessage"
    >
    </v-text-field>
    <div class="d-flex">
      <v-btn class="mt-10 ml-auto" color="primary">Register</v-btn>
    </div>
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';
import { mdiEmail } from '@mdi/js';
import { mdiLock } from '@mdi/js';

export default {
  name: 'AuthForm',
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, email, minLength: minLength(10) },
  },
  props: {
    authType: {
      default: 'login',
      type: String,
      validator(value) {
        return ['login', 'register'].indexOf(value) !== -1;
      },
    },
  },
  data: () => ({
    email: '',
    password: '',
    emailIcon: mdiEmail,
    passwordIcon: mdiLock,
  }),
  computed: {
    passwordMessage() {
      return this.password.length >= 10
        ? ''
        : 'Password must be at least 10 character';
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('Email is required');
      !this.$v.email.email && errors.push('Must be valid e-mail');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Password is required');
      !this.$v.password.minLength &&
        errors.push('Must be at least 10 character');
      return errors;
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.email = '';
      this.password = '';
    },
  },
};
</script>

<style></style>
