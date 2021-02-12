<template>
  <main-layout>
    <v-sheet class="pa-2">
      <v-form @submit.prevent>
        <v-container>
          <v-row justify="space-between">
            <v-col cols="12" sm="6" md="5">
              <v-text-field v-model="name" label="Name" />
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

            <v-col cols="12" class="mt-8">
              <v-btn
                color="primary"
                @click="submit"
                :disabled="isSubmitDisabled"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-sheet>
  </main-layout>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { integer } from 'vuelidate/lib/validators';
import MainLayout from '@/layouts/MainLayout.vue';
import { mapMutations } from 'vuex';

import { RepositoryFactory } from '@/repositories/repository-factory';
const userRepository = RepositoryFactory.get('user');

export default {
  mixins: [validationMixin],

  components: {
    MainLayout,
  },

  data: () => ({
    name: '',
    height: '',
    submitStatus: null,
  }),

  validations: {
    height: { integer },
  },

  computed: {
    isSubmitDisabled() {
      return this.submitStatus === 'PENDING';
    },

    heightError() {
      if (this.$v.height.$dirty && !this.$v.height.integer) {
        return 'Height must be an integer';
      }
      return null;
    },
  },

  methods: {
    ...mapMutations('snackbar', ['showSnackbar']),

    submit() {
      this.$v.$touch();
      if (this.$v.$invalid || this.submitStatus === 'PENDING') return;

      this.submitStatus = 'PENDING';

      userRepository
        .update({
          name: this.name,
          height: +this.height,
        })
        .then(() => {
          this.showSnackbar({ text: 'updated Successfully' });
        })
        .catch(() => {})
        .finally(() => {
          this.submitStatus = null;
        });
    },
  },

  created() {
    userRepository
      .fetch()
      .then(({ data }) => {
        this.name = data.profile.name;
        this.height = data.profile.height;
      })
      .catch(() => {});
  },
};
</script>
