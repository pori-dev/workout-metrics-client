<template>
  <v-card height="100%" class="pb-2">
    <v-card-title class="font-weight-medium grey--text">
      Submitted Weights
    </v-card-title>
    <v-card-subtitle class="grey--text text--lighten-1 text-caption">
      (select a date to add, edit, or delete a weight recrod)
    </v-card-subtitle>

    <loading-overlay :loading="loading">
      <weights-date-picker
        :weights="weights"
        @select-date="selectDateHandler"
        @picker-date="fetchAllWeightsByMonth"
      />
    </loading-overlay>

    <weights-dialog
      v-if="dialog"
      :dialog.sync="dialog"
      :selectedWeightItem="selectedWeightItem"
      @create="createWeightRecord"
      @update="updateWeightRecord"
      @delete="deleteWeightRecord"
    />
  </v-card>
</template>

<script>
import WeightsDatePicker from './WeightsDatePicker.vue';
import WeightsDialog from './WeightsDialog.vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';

import { mapMutations } from 'vuex';

// requests repository
import { RepositoryFactory } from '@/repositories/repository-factory';
const weightsRepository = RepositoryFactory.get('weights');

export default {
  components: {
    WeightsDatePicker,
    WeightsDialog,
    LoadingOverlay,
  },

  data: () => ({
    weights: [],
    selectedWeightItem: {},
    selectedDate: null,
    dialog: false,
    loading: false,
  }),

  computed: {
    findWeightItemIndexByDate() {
      return this.weights.findIndex(
        weightItem => weightItem.measurementDate === this.selectedDate
      );
    },

    findWeightItemIndexById() {
      return this.weights.findIndex(
        weight => weight.id === this.selectedWeightItem.id
      );
    },
  },

  methods: {
    ...mapMutations('snackbar', ['showSnackbar']),

    setSelectedWeightItem() {
      if (this.findWeightItemIndexByDate > -1) {
        this.selectedWeightItem = this.weights[this.findWeightItemIndexByDate];
      } else {
        this.selectedWeightItem = {
          measurementDate: this.selectedDate,
          id: null,
          weight: null,
        };
      }
    },

    selectDateHandler(date) {
      this.selectedDate = date;
      this.setSelectedWeightItem();
      this.showModal();
    },

    showModal() {
      this.dialog = true;
    },

    fetchAllWeightsByMonth(month) {
      this.loading = true;
      // because of date-picker `@picker-date` update emit,
      // it gets called when component instance gets created.
      // So there is no need to call it on `created` hook.
      weightsRepository
        .fetchAllByMonth(month)
        .then(res => {
          this.weights = res.data;
        })
        .catch(err => err)
        .finally(() => (this.loading = false));
    },

    createWeightRecord(weight) {
      this.loading = true;
      weightsRepository
        .create(weight, this.selectedDate)
        .then(res => {
          this.showSnackbar({ text: 'Successfully submitted' });
          this.weights.push(res.data);
        })
        .catch(err => err)
        .finally(() => (this.loading = false));
    },

    updateWeightRecord(weight) {
      this.loading = true;
      const { id } = this.selectedWeightItem;
      weightsRepository
        .update(weight, id)
        .then(res => {
          const weightIndex = this.findWeightItemIndexById;
          this.weights.splice(weightIndex, 1, res.data);
          this.showSnackbar({ text: 'Successfully updated' });
        })
        .catch(err => err)
        .finally(() => (this.loading = false));
    },

    deleteWeightRecord() {
      this.loading = true;
      const { id } = this.selectedWeightItem;
      weightsRepository
        .delete(id)
        .then(() => {
          const weightIndex = this.findWeightItemIndexById;
          this.weights.splice(weightIndex, 1);
          this.showSnackbar({ text: 'Successfully deleted' });
        })
        .catch(err => err)
        .finally(() => (this.loading = false));
    },
  },
};
</script>
