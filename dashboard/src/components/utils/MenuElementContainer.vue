<template>
  <div class="pb-16 sh">
      <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    label: {
      type: String,
      default: "",
    },
    isActive: {
        type: Boolean,
        default: false,
    }
  },
});
</script>

<style lang="scss" scoped>
.container {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.5);
}
.content {
    max-width: 80%;
}
</style>
