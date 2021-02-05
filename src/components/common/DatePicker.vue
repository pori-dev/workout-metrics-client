<template>
  <v-date-picker v-bind="$attrs" v-on="$listeners" />
</template>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

::v-deep
  .theme--light.v-date-picker-header
  .v-date-picker-header__value:not(.v-date-picker-header__value--disabled)
  button:not(:hover):not(:focus) {
  color: map-get($grey, 'base') !important;
}
::v-deep .v-date-picker-table__events div {
  width: 16px;
  height: 2px;
  border-radius: 2px;
}
</style>
