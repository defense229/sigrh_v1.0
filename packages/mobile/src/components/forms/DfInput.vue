<template>
  <div>
    <label>{{ label }}</label>
    <div
      class="flex gap-4 items-center border-border-dark radius-8 py-7 px-8 mt-4"
    >
      <slot />
      <input
        type="text"
        :placeholder="placeholder"
        v-model="currentValue"
        @input="handleInput"
        class="noborder nooutline fs-14"
      />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
  },

  setup(props, { emit }) {
    const currentValue = ref(props.value);

    const handleInput = ($event: any) => {
      emit("change", $event.target.value);
    };

    watch(
      props,
      () => {
        currentValue.value = props.value;
      },
      { deep: true }
    );

    return {
      currentValue,
      handleInput,
    };
  },
});
</script>
