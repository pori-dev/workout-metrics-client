<template>
  <v-row justify="space-between">
    <v-col cols="12" md="6">
      <v-date-picker
        v-model="date"
        :events="eventsIndicator"
        :prev-icon="prevIcon"
        :next-icon="nextIcon"
        full-width
        color="accent"
        elevation="1"
        @click:date="selectDate"
      ></v-date-picker>

      <template>
        <div class="text-center">
          <!-- Todo: add close button to dialog component -->
          <v-dialog v-model="dialog" width="600">
            <v-card>
              <v-toolbar
                dark
                color="primary"
                class="font-weight-medium text-h6"
              >
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
                        color="primary"
                        @click="dialog = false"
                        class="ml-2"
                        >Todo</v-btn
                      >
                      <v-btn
                        class="ml-2"
                        color="green"
                        dark
                        @click="dialog = false"
                        >Done</v-btn
                      >
                      <v-btn
                        class="ml-2"
                        color="red"
                        dark
                        @click="dialog = false"
                        >Missed</v-btn
                      >
                    </div>
                  </v-col>
                  <v-col v-if="showRemoveButton" class="mt-14 d-flex">
                    <span class="text-h6">
                      Or remove it from schedule:
                    </span>
                    <v-spacer></v-spacer>
                    <v-btn fcolor="red" dark @click="dialog = false"
                      >Remove</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { format, parseISO, isBefore, isToday } from 'date-fns';

export default {
  data: () => ({
    prevIcon: mdiChevronLeft,
    nextIcon: mdiChevronRight,
    date: new Date().toISOString().substr(0, 10),
    // Todo: replace it with API response
    schedules: [
      {
        id: 'ntehnetohu',
        date: '2021-01-23',
        status: 'todo',
      },
      {
        id: 'ntehnetohu',
        date: '2021-01-08',
        status: 'done',
      },
      {
        id: 'ntehnetohu',
        date: '2021-01-12',
        status: 'done',
      },
      {
        id: 'ntehnetohu',
        date: '2021-01-23',
        status: 'todo',
      },
      {
        id: 'ntehnetohu',
        date: '2021-01-15',
        status: 'indeterminate',
      },
      {
        id: 'ntehnetohu',
        date: '2021-01-11',
        status: 'missed',
      },
    ],
    selectedScheduleItem: null,
    selectedDate: null,
    dialog: false,
  }),

  computed: {
    showTodoButton() {
      return (
        !isBefore(this.parsedSelectedDate, new Date()) ||
        isToday(this.parsedSelectedDate)
      );
    },

    showRemoveButton() {
      return this.selectedScheduleItem && this.selectedScheduleItem.status;
    },

    parsedSelectedDate() {
      return this.selectedDate ? parseISO(this.selectedDate) : null;
    },

    formattedSelectedDate() {
      return this.selectedDate
        ? format(this.parsedSelectedDate, 'EE MMM d')
        : null;
    },
  },

  methods: {
    eventsIndicator(date) {
      let eventColor = null;
      this.schedules.forEach(schedule => {
        if (schedule.date === date) {
          switch (schedule.status) {
            case 'done':
              eventColor = 'green';
              break;
            case 'todo':
              eventColor = 'blue';
              break;
            case 'missed':
              eventColor = 'red';
              break;
            case 'indeterminate':
              eventColor = 'yellow';
              break;
            default:
              eventColor = false;
          }
        }
      });
      return eventColor;
    },

    setSelectedScheduleItem() {
      const selectedScheduleIndex = this.schedules.findIndex(
        item => item.date === this.selectedDate
      );
      const selectedScheduleItem =
        this.schedules[selectedScheduleIndex] || null;
      this.selectedScheduleItem = selectedScheduleItem;
    },

    showModal() {
      this.dialog = true;
    },

    selectDate(date) {
      this.selectedDate = date;
      this.setSelectedScheduleItem();
      this.showModal();
    },
  },
};
</script>
