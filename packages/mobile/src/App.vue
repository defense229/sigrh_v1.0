<template>
  <ion-app>
    <ion-router-outlet />
    <df-footer />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import DfFooter from "./components/utils/DfFooter.vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    DfFooter,
  },
});
</script>