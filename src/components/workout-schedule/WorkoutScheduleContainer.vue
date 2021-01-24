<template>
  <v-row justify="space-between">
    <v-col cols="12" md="6">
      <loading-overlay :loading="loading">
        <workout-schedule-date-picker
          :schedules="schedules"
          @select-date="selectDateHandler"
          @picker-date="fetchAllSchedulesByMonth"
        />
      </loading-overlay>
    </v-col>
    <workout-schedule-dialog
      v-if="dialog"
      :dialog.sync="dialog"
      :selectedScheduleItem="selectedScheduleItem"
      @create="createScheduleItem"
      @update="updateScheduleItem"
      @remove="removeScheduleItem"
    />
  </v-row>
</template>

<script>
import WorkoutScheduleDatePicker from './WorkoutScheduleDatePicker.vue';
import WorkoutScheduleDialog from './WorkoutScheduleDialog.vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import { RepositoryFactory } from '@/repositories/repository-factory';

const schedulesRepository = RepositoryFactory.get('schedules');

export default {
  components: {
    WorkoutScheduleDatePicker,
    WorkoutScheduleDialog,
    LoadingOverlay,
  },

  data: () => ({
    schedules: [],
    selectedScheduleItem: {},
    selectedDate: null,
    dialog: false,
    loading: false,
  }),

  computed: {
    findScheduleItemIndex() {
      return this.schedules.findIndex(item => item.date === this.selectedDate);
    },
  },

  methods: {
    setSelectedScheduleItem() {
      if (this.findScheduleItemIndex > -1) {
        this.selectedScheduleItem = this.schedules[this.findScheduleItemIndex];
      } else {
        this.selectedScheduleItem = {
          id: null,
          status: null,
          date: this.selectedDate,
        };
      }
    },

    selectDateHandler(date) {
      this.selectedDate = date;
      this.setSelectedScheduleItem();
      this.showModal();
    },

    showModal() {
      this.dialog = true;
    },

    // because of date-picker picker-date update emit, it gets called when component instance gets mounted.
    // So there is no need to call on `created` hook.
    fetchAllSchedulesByMonth(month) {
      this.loading = true;
      schedulesRepository
        .fetchAllByMonth(month)
        .then(res => {
          this.schedules = res.data;
        })
        .catch(err => err)
        .finally(() => (this.loading = false));
    },

    removeScheduleItem() {
      this.loading = true;
      const { id } = this.selectedScheduleItem;
      schedulesRepository
        .remove(id)
        .then(() => {
          const scheduleIndex = this.schedules.findIndex(
            item => item.id === id
          );
          this.schedules.splice(scheduleIndex, 1);
        })
        .catch(err => err)
        .finally(() => (this.loading = false));
    },

    updateScheduleItem(status) {
      this.loading = true;
      const { id } = this.selectedScheduleItem;
      schedulesRepository
        .update(id, status)
        .then(res => {
          const scheduleIndex = this.schedules.findIndex(
            item => item.id === id
          );
          this.schedules.splice(scheduleIndex, 1, res.data);
        })
        .catch(err => err)
        .finally(() => (this.loading = false));
    },

    createScheduleItem(status) {
      this.loading = true;
      schedulesRepository
        .create(this.selectedScheduleItem.date, status)
        .then(res => {
          this.schedules.push(res.data);
        })
        .catch(err => err)
        .finally(() => (this.loading = false));
    },
  },
};
</script>
