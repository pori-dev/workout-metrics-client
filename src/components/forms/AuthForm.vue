<template>
  <v-form @submit.prevent>
    <v-text-field
      label="Email"
      name="email"
      required
      type="text"
      :prepend-icon="emailIcon"
      v-model="email"
      @blur="$v.email.$touch()"
      :error-messages="emailErrors"
    >
    </v-text-field>

    <v-text-field
      label="Password"
      name="password"
      type="password"
      required
      v-model="password"
      :prepend-icon="passwordIcon"
      @blur="$v.password.$touch()"
      :error-messages="passwordErrors"
      :messages="passwordMessage"
    >
    </v-text-field>
    <div v-if="authType === 'register'">
      <v-text-field
        label="Confirm password"
        name="confirm-password"
        type="password"
        required
        class="mt-4"
        v-model="confirmPassword"
        :prepend-icon="passwordIcon"
        @blur="$v.confirmPassword.$touch()"
        :error-messages="passwordConfirmError"
      >
      </v-text-field>
    </div>
    <div class="d-flex">
      <v-btn
        class="mt-10 ml-auto"
        color="primary"
        @click="submitForm"
        :disabled="isSubmitDisabled"
        >{{ authType }}</v-btn
      >
    </div>
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';
import { mdiEmail } from '@mdi/js';
import { mdiLock } from '@mdi/js';
import { mapMutations } from 'vuex';

export default {
  name: 'AuthForm',
  mixins: [validationMixin],
  validations() {
    if (this.authType === 'login') {
      return {
        email: { required, email },
        password: { required },
      };
    } else {
      return {
        email: { required, email },
        password: {
          required,
          minLength: minLength(10),
        },
        confirmPassword: {
          required,
        },
      };
    }
  },
  props: {
    authType: {
      default: 'login',
      type: String,
      validator(value) {
        return ['login', 'register'].includes(value);
      },
    },
  },
  data: () => ({
    email: '',
    password: '',
    confirmPassword: '',
    emailIcon: mdiEmail,
    passwordIcon: mdiLock,
    submitStatus: null,
  }),
  computed: {
    passwordMessage() {
      return this.authType === 'login' || this.password.length >= 10
        ? ''
        : 'Password must be at least 10 character';
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.required) errors.push('Email is required');
      if (!this.$v.email.email) errors.push('Must be valid e-mail');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.required) errors.push('Password is required');
      if (!this.$v.password.minLength && this.authType === 'register') {
        errors.push('Must be at least 10 character');
      }
      return errors;
    },
    passwordConfirmError() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      if (!this.$v.confirmPassword.required) {
        errors.push('Password confirmation is required');
      }
      if (this.confirmPassword !== this.password) {
        errors.push("Passwords don't match");
      }
      return errors;
    },
    isSubmitDisabled() {
      return this.submitStatus === 'PENDING';
    },
  },
  methods: {
    ...mapMutations('snackbar', ['showSnackbar']),
    submitForm() {
      this.$v.$touch();
      if (this.submitStatus === ('ERROR' || 'PENDING')) return;
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
        return;
      } else {
        this.submitStatus = 'PENDING';
      }
      this.axios
        .post(`auth/${this.authType}`, {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ path: '/dashboard' });
        })
        .catch(() => {
          this.submitStatus = null;
        });
    },
  },
};
</script>
