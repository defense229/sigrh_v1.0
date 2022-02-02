<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <df-container>
        <df-select
          :data="[
            { label: 'Normal' },
            { label: 'Enseignant' },
            { label: 'Aide soignant' },
          ]"
        />
        <div class="fs-14">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed
          excepturi ex voluptates iusto, quia optio voluptatibus, saepe
          cupiditate soluta neque nesciunt repellat libero consequatur unde
          animi eveniet quidem nisi expedita!
        </div>

        <button @click="changeValue('Hello')">Set Value</button>

        <div class="fs-20">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis aliquam
          corporis dolorem earum ab eaque officiis voluptatum id repudiandae.
          Sed id perspiciatis praesentium molestias possimus aliquid, sapiente
          perferendis quia at.
        </div>

        <df-input :value="testValue" label="Label 1" @change="handleChange" />

        <df-input label="Label 2">
          <person-icon />
        </df-input>
      </df-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
/* eslint-disable */
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import DfInput from "../components/forms/DfInput.vue";
import PersonIcon from "../components/svgs/PersonIcon.vue";
import DfContainer from "../components/utils/DfContainer.vue";
import DfSelect from "../components/forms/DfSelect.vue";

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    DfInput,
    PersonIcon,
    DfContainer,
    DfSelect,
  },
  setup() {
    const testValue = ref("Hi");

    const changeValue = (newValue: string) => {
      testValue.value = newValue;
    };

    const handleChange = (value: string) => {
      console.log(value);
    };
    return {
      testValue,
      changeValue,
      handleChange,
    };
  },
});
</script>

<style scoped>
</style>