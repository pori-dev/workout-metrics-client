<template>
  <div class="loading-overlay">
    <slot></slot>
    <div
      v-if="loading"
      class="loading-progress-container d-flex justify-center align-center"
    >
      <v-progress-circular
        class="loading-progress"
        color="primary"
        indeterminate
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      default: false,
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-overlay {
  position: relative;
}

.loading-progress-container {
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}</style
>>
