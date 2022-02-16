<template>
  <div>
    <label class="semi-bold">{{ label }}</label>
    <div
      class="flex gap-4 items-center border-border-dark radius-8 py-7 px-8 mt-4"
    >
      <slot />
      <input
        type="text"
        :placeholder="placeholder"
        :value="currentValue"
        @input="handleInput"
        style="width: 90%"
        class="noborder nooutline fs-14"
      />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, ref, watch, PropType } from "vue";

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
      type: String as PropType<string | number | any>,
      default: "",
    },
    uppercase: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const currentValue = ref(props.value);

    const handleInput = ($event: any) => {
      emit("change", $event);
    };

    watch(
      props,
      (newPropsValue) => {
        currentValue.value = newPropsValue.uppercase ? newPropsValue.value.toUpperCase(): newPropsValue.value;
        emit("change", newPropsValue.value);
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
