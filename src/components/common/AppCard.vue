<template>
  <v-card v-bind="$attrs">
    <v-card-title class="font-weight-medium grey--text" v-if="$slots.title">
      <slot name="title" />
    </v-card-title>

    <v-card-subtitle
      class="grey--text text--lighten-1 text-caption"
      v-if="$slots.subtitle"
    >
      <slot name="subtitle" />
    </v-card-subtitle>

    <v-card-text v-if="$slots.text">
      <slot name="text" />
    </v-card-text>

    <slot />

    <v-card-actions v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>
