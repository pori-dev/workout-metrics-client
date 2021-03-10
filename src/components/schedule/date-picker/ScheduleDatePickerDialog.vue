<template>
  <div class="text-center">
    <app-dialog>
      <template #dialogTitle>
        {{ formattedSelectedDate }}
      </template>

      <template #dialogBody>
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
      </template>
    </app-dialog>
  </div>
</template>

<script>
import { format, parseISO, isBefore, isAfter, isToday } from 'date-fns';
import AppDialog from '@/components/common/AppDialog.vue';

export default {
  components: { AppDialog },
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
      this.$store.commit('dialog/hideDialog');
    },
  },
};
</script>

<style></style>
