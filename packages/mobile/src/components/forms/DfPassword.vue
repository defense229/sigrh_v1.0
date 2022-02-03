<template>
  <div>
    <label class="semi-bold">{{ label }}</label>
    <div
      class="flex gap-4 items-center border-border-dark radius-8 py-7 px-8 mt-4"
    >
      <lock-solid />
      <input
        :type="currentType"
        :placeholder="placeholder"
        v-model="currentValue"
        @input="handleInput"
        style="width: 80%"
        class="noborder nooutline fs-14"
      />
      <div @click="toggleType" class="flex justify-center items-center">
        <eye-icon />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, ref, watch, PropType } from "vue";
import EyeIcon from "../svgs/EyeIcon.vue";
import LockSolid from "../svgs/LockSolid.vue";

export default defineComponent({
  components: {
    EyeIcon,
    LockSolid,
  },
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
  },

  setup(props, { emit }) {
    const currentValue = ref(props.value);
    const currentType = ref("password");

    const handleInput = ($event: any) => {
      emit("change", $event);
    };

    const toggleType = () => {
      currentType.value =
        currentType.value === "password" ? "text" : "password";

      console.log(currentValue);
    };

    watch(
      props,
      (newPropsValue) => {
        currentValue.value = newPropsValue.value;
        emit("change", newPropsValue.value);
      },
      { deep: true }
    );

    return {
      currentValue,
      currentType,
      handleInput,
      toggleType,
    };
  },
});
</script>
