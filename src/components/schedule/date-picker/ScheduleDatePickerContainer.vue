<template>
  <div class="fill-height">
    <schedule-date-picker
      :schedules="schedules"
      :loading="loading"
      @select-date="selectDateHandler"
      @picker-date="pickerDateHandler"
      ref="scheduleDatePicker"
    />

    <schedule-date-picker-dialog
      v-if="dialog"
      :dialog.sync="dialog"
      :selectedScheduleItem="selectedScheduleItem"
      @create="createScheduleItem"
      @update="updateScheduleItem"
      @remove="removeScheduleItem"
    />
  </div>
</template>

<script>
import ScheduleDatePicker from './ScheduleDatePicker.vue';
import ScheduleDatePickerDialog from './ScheduleDatePickerDialog.vue';
import { RepositoryFactory } from '@/repositories/repository-factory';
import { mapMutations } from 'vuex';

const schedulesRepository = RepositoryFactory.get('schedules');

export default {
  components: {
    ScheduleDatePicker,
    ScheduleDatePickerDialog,
  },

  data: () => ({
    schedules: [],
    selectedScheduleItem: {},
    selectedDate: null,
    activevatedMonth: null,
    dialog: false,
    loading: false,
  }),

  computed: {
    refetchSchedule() {
      return this.$store.state.scheduleGenerator.refetchSchedule;
    },

    findScheduleItemIndex() {
      return this.schedules.findIndex(item => item.date === this.selectedDate);
    },
  },

  watch: {
    refetchSchedule(shouldRefetchSchedule) {
      if (shouldRefetchSchedule) {
        this.fetchAllSchedulesByMonth(this.activevatedMonth);
        this.setRefetchSchedule(false);
      }
    },
  },

  methods: {
    ...mapMutations('scheduleGenerator', ['setRefetchSchedule']),

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
    pickerDateHandler(month) {
      this.activevatedMonth = month;
      this.fetchAllSchedulesByMonth(month);
    },

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
