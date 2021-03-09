<template>
  <app-card>
    <template #title>
      Weight Goal
    </template>

    <template #text>
      <v-row>
        <v-form @submit.prevent="submitGoal">
          <v-col cols="12">
            <weight-goal-input
              @blur="$v.goalWeight.$touch()"
              @setWeight="goalWeight = $event"
              :errors="weightErrors"
            />
          </v-col>

          <v-col cols="12">
            <weight-goal-date-picker
              :error="goalDateError"
              @setDate="goalDate = $event"
              @blur="$v.goalDate.$touch()"
            />
          </v-col>

          <v-col cols="12">
            <div class="d-flex justify-end">
              <v-btn type="submit" color="primary" :disabled="isDisabled"
                >Submit</v-btn
              >
            </div>
          </v-col>
        </v-form>
      </v-row>
    </template>
  </app-card>
</template>

<script>
import { required, decimal } from 'vuelidate/lib/validators';
import WeightGoalDatePicker from './WeightGoalDatePicker.vue';
import { validationMixin } from 'vuelidate';
import WeightGoalInput from './WeightGoalInput.vue';
import AppCard from '@/components/common/AppCard.vue';

import { RepositoryFactory } from '@/repositories/repository-factory';
import { mapMutations } from 'vuex';
const weightsRepository = RepositoryFactory.get('weights');

export default {
  components: { WeightGoalDatePicker, WeightGoalInput, AppCard },

  data: () => ({
    loading: false,
    goalWeight: null,
    goalDate: null,
  }),

  mixins: [validationMixin],

  validations: {
    goalWeight: {
      required,
      decimal,
    },
    goalDate: {
      required,
    },
  },

  computed: {
    weightErrors() {
      if (!this.$v.goalWeight.$dirty) return '';
      if (!this.$v.goalWeight.required) return 'A value is required';
      if (!this.$v.goalWeight.decimal)
        return 'Weight must be number. Like: 80 or 80.3';
      return '';
    },

    goalDateError() {
      if (!this.$v.goalDate.$dirty) return '';
      if (!this.$v.goalDate.required) return 'You must select a date';
      return '';
    },

    isDisabled() {
      return (this.$v.$anyDirty && this.$v.$anyError) || this.loading;
    },
  },

  methods: {
    ...mapMutations('snackbar', ['showSnackbar']),
    submitGoal() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

      this.loading = true;

      weightsRepository
        .createGoal(this.goalWeight, this.goalDate)
        .then(() => {
          this.showSnackbar({ text: 'Successfully added' });
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
