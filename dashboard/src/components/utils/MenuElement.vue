<template>
    <div class="flex flex-row items-center  p-6 radius-8 semi-bold fs-14 mt-8 mb-8 lh-22 gap-5" :class="{'bg-primary text-white': isActive, 'text-dark' : !isActive}" >
        <div class = "flex flex-row items-center" :class="{'ml-8 ': isActive, '' : !isActive}" v-if="isActive">
          <white-round></white-round>
        </div>
        <div class = "flex flex-row items-center" :class="{'ml-8': isActive, '' : !isActive}" v-else>
          <black-round></black-round>
        </div>
        <div>{{ label }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BlackRound from "../svgs/BlackRound.vue"
import WhiteRound from "../svgs/WhiteRound.vue"
export default defineComponent({
  props: {
    label: {
      type: String,
      default: "",
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isOpen: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    BlackRound,
    WhiteRound
  }
  
  // setup(props) {
  //   const opened = ref(props.isOpen);
  //   var activeS = "bg-primary text-white"

    

  //   watch(
  //     props,
  //     (newPropsValue) => {
  //       opened.value = newPropsValue.isOpen;
  //     },
  //     { deep: true }
  //   );

  //   return {
  //     opened,
  //     activeS
  //   };
  // },
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
