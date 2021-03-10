<template>
  <v-row justify="center">
    <v-dialog v-model="$store.state.dialog.dialog" width="600">
      <app-card>
        <template #title>
          <slot name="dialogTitle" />
        </template>

        <template #text>
          <slot name="dialogBody" />
        </template>

        <v-divider />

        <template #actions>
          <slot name="dialogActions" />
        </template>
      </app-card>
    </v-dialog>
  </v-row>
</template>

<script>
import AppCard from '@/components/common/AppCard.vue';

export default {
  components: {
    AppCard,
  },
};
</script>
