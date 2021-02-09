<template>
  <main-layout>
    <v-sheet class="pa-2">
      <v-form @submit.prevent="submit">
        <v-container>
          <v-row justify="space-between">
            <v-col cols="12" sm="6" md="5">
              <v-text-field
                v-model="name"
                label="Name"
                @blur="$v.name.$touch()"
                :error-messages="nameError"
              />
            </v-col>

            <v-col cols="12" sm="6" md="5">
              <v-text-field
                v-model="email"
                label="Email"
                @blur="$v.email.$touch()"
                :error-messages="emailError"
              />
            </v-col>

            <v-col cols="12" sm="6" md="5">
              <v-text-field
                v-model="height"
                label="Height"
                suffix="cm"
                placeholder="170"
                @blur="$v.height.$touch()"
                :error-messages="heightError"
              />
            </v-col>

            <v-col cols="12" sm="6" md="5">
              <v-file-input
                v-if="!hasAvatar || showAvatarField"
                :rules="avatarFileRules"
                :show-size="1000"
                small-chips
                accept="image/png, image/jpeg, text"
                :prepend-icon="cameraIcon"
                label="Upload an profile image"
                v-model="avatarFile"
              />
              <div v-else>
                <v-avatar color="primary" size="62">
                  test
                </v-avatar>

                <v-btn @click="showAvatarField = true" color="grey" small text
                  >Change</v-btn
                >
              </div>
            </v-col>

            <v-col cols="12" class="mt-8">
              <v-btn color="primary">Submit</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-sheet>
  </main-layout>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, integer, email } from 'vuelidate/lib/validators';
import MainLayout from '@/layouts/MainLayout.vue';
import { mdiCamera } from '@mdi/js';

export default {
  mixins: [validationMixin],

  components: {
    MainLayout,
  },

  data: () => ({
    name: 'Test name',
    email: 'test@test.test',
    height: '134',
    cameraIcon: mdiCamera,
    avatarFileRules: [
      value =>
        !value ||
        value.size < 2000 ||
        'Avatar size should be less than 100 MB!',
    ],
    avatarFile: null,
    hasAvatar: true,
    showAvatarField: false,
  }),

  computed: {
    nameError() {
      if (this.$v.name.$dirty && !this.$v.name.required) {
        return 'Name is required';
      }
      return null;
    },

    emailError() {
      if (!this.$v.email.$dirty) return null;

      if (!this.$v.email.required) {
        return 'Email is required';
      } else if (!this.$v.email.email) {
        return 'Email must be valid';
      }
      return null;
    },

    heightError() {
      if (this.$v.height.$dirty && !this.$v.height.integer) {
        return 'Height must be an integer';
      }
      return null;
    },
  },

  validations: {
    name: { required },
    email: { required, email },
    height: { integer },
  },
};
</script>
