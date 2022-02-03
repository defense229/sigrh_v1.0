<template>
  <ion-content :fullscreen="true">
    <div :class="css" style="height: calc(100% - 41px)">
      <slot />
    </div>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    color: String,
  },
  setup(props) {
    return {
      css: props.color === "primary" ? "bg-primary" : "bg-white",
    };
  },
});
</script>
