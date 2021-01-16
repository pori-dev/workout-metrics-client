<template>
  <v-row justify="space-between">
    <v-col cols="12" md="6">
      <v-date-picker
        v-model="date"
        :events="functionEvent"
        :prev-icon="prevIcon"
        :next-icon="nextIcon"
        full-width
        color="accent"
        elevation="1"
        @click:date="selectDate"
      ></v-date-picker>
      <template>
        <div class="text-center">
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
                    <div class="d-flex justify-space-around">
                      <v-btn
                        v-if="showTodo"
                        color="primary"
                        @click="dialog = false"
                        >Todo</v-btn
                      >
                      <v-btn color="green" dark @click="dialog = false"
                        >Done</v-btn
                      >
                      <v-btn color="red" dark @click="dialog = false"
                        >Missed</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-btn text @click="dialog = false">
                  Close
                </v-btn>
              </v-card-actions>
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
    schedule: [
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
    doneSessions: [],
    todoSessions: [],
    missedSessions: [],
    indeterminateSessions: [],
    formattedSelectedDate: null,
    showTodo: null,
    dialog: false,
  }),

  methods: {
    functionEvent(date) {
      if (this.todoSessions.includes(date)) {
        return 'blue';
      } else if (this.missedSessions.includes(date)) {
        return 'red';
      } else if (this.doneSessions.includes(date)) {
        return 'green';
      } else if (this.indeterminateSessions.includes(date)) {
        return 'yellow';
      }
      return false;
    },

    formatScheduleToSessions() {
      this.schedule.forEach(scheduleItem => {
        switch (scheduleItem.status) {
          case 'done':
            this.doneSessions.push(scheduleItem.date);
            break;
          case 'todo':
            this.todoSessions.push(scheduleItem.date);
            break;
          case 'missed':
            this.missedSessions.push(scheduleItem.date);
            break;
          case 'indeterminate':
            this.indeterminateSessions.push(scheduleItem.date);
            break;
        }
      });
    },

    selectDate(date) {
      const parsed = parseISO(date);
      this.formattedSelectedDate = format(parsed, 'EE MMM d');
      this.showTodo =
        !isBefore(parsed, new Date()) || isToday(parsed, new Date());
      this.dialog = true;
    },
  },
  created() {
    this.formatScheduleToSessions();
  },
};
</script>
