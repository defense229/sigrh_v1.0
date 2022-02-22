<template>
  <div class="flex justify-center bg-primary py-4">
    <div class="px-12 left">
      <div v-if="type === 'small'">
        <img src="../../assets/mdn-small.png" alt="MDN SMALL" />
      </div>
      <div v-else>
        <img src="../../assets/mdn-big.png" alt="MDN BIG" />
      </div>
    </div>
    <div class="px-12">
      <div v-if="type === 'small'">
        <img src="../../assets/dopa-small.png" alt="DOPA SMALL" />
      </div>
      <div v-else>
        <img src="../../assets/dopa-big.png" alt="DOPA BIG" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  props: {
    type: {
      type: String,
      default: "small",
    },
  },
});
</script>

<style lang="scss" scoped>
.left {
  border-right: solid 1px #ffffff;
}
</style>