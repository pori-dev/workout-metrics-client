<template>
  <main-layout>
    <v-row>
      <v-col cols="12" md="4">
        <schedule-date-picker-container />
      </v-col>
    </v-row>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import ScheduleDatePickerContainer from '@/components/schedule/date-picker/ScheduleDatePickerContainer.vue';

export default {
  components: {
    MainLayout,
    ScheduleDatePickerContainer,
  },
};
</script>
