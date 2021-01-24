<template>
  <div class="text-center">
    <!-- Todo: add close button to dialog component -->
    <v-dialog v-model="isDialogVisible" width="600">
      <v-card>
        <v-toolbar dark color="primary" class="font-weight-medium text-h6">
          {{ formattedSelectedDate }}
        </v-toolbar>

        <v-card-text class="px-4 pt-8 d-flex">
          <v-row>
            <v-col cols="12" sm="5">
              <div class="text-h6">
                Set the date as:
              </div>
            </v-col>
            <v-col cols="12" sm="7">
              <div class="d-flex justify-end">
                <v-btn
                  v-if="showTodoButton"
                  @click="dialogActionHandler('todo')"
                  color="primary"
                  class="ml-2"
                  >Todo</v-btn
                >
                <v-btn
                  v-if="showDoneButton"
                  @click="dialogActionHandler('done')"
                  class="ml-2"
                  color="green"
                  dark
                  >Done</v-btn
                >
                <v-btn
                  v-if="showMissedButton"
                  @click="dialogActionHandler('missed')"
                  class="ml-2"
                  color="red"
                  dark
                  >Missed</v-btn
                >
                <v-btn
                  v-if="showRemoveButton"
                  @click="dialogActionHandler('remove')"
                  class="ml-2"
                  dark
                  >Remove</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { format, parseISO, isBefore, isAfter, isToday } from 'date-fns';

export default {
  props: {
    dialog: {
      default: false,
      type: Boolean,
    },
    selectedScheduleItem: {
      default: () => ({}),
      type: Object,
    },
  },
  computed: {
    isDialogVisible: {
      get() {
        return this.dialog;
      },
      set(newValue) {
        this.$emit('update:dialog', newValue);
      },
    },

    showMissedButton() {
      return (
        this.selectedScheduleItem.status !== 'missed' &&
        isBefore(this.parsedSelectedDate, new Date())
      );
    },

    showDoneButton() {
      return (
        this.selectedScheduleItem.status !== 'done' &&
        !isAfter(this.parsedSelectedDate, new Date())
      );
    },

    showTodoButton() {
      return this.selectedScheduleItem.status !== 'todo' && this.isTodayOrAfter;
    },

    showRemoveButton() {
      return this.selectedScheduleItem.status;
    },

    isTodayOrAfter() {
      return (
        isAfter(this.parsedSelectedDate, new Date()) ||
        isToday(this.parsedSelectedDate)
      );
    },

    parsedSelectedDate() {
      return parseISO(this.selectedScheduleItem.date);
    },

    formattedSelectedDate() {
      return format(this.parsedSelectedDate, 'EE MMM d');
    },

    scheduleItemAlreadyExists() {
      return this.selectedScheduleItem.id;
    },
  },

  methods: {
    dialogActionHandler(statusType) {
      let emitAction = null;
      // if a schedule already exists, emit update or remove, otherwise
      // emit create
      if (this.scheduleItemAlreadyExists) {
        statusType === 'remove'
          ? (emitAction = 'remove')
          : (emitAction = 'update');
      } else {
        emitAction = 'create';
      }
      this.$emit(emitAction, statusType);
      this.isDialogVisible = false;
    },
  },
};
</script>

<style></style>
