<template>
  <div>
    <h1 class="text-dark fs-18 bold">Informations du candidat</h1>

    <div class="photo my-12"></div>

    <div class="border-light text-center py-8" v-if="type === 'presence'">
      Numéro de table : <b>{{ info.number }}</b>
    </div>

    <df-title-and-label
      title="Numéro de la pièce d'identité"
      :label="info.identityNumber"
    />
    <df-title-and-label title="Nom & Prénom (s)" :label="info.fullName" />
    <df-title-and-label title="Date et lieu de naissance" :label="info.birth" />

    <df-button-expand @click="confirm"> Valider la présence </df-button-expand>
  </div>
</template>

<script lang="ts">
export interface ICandidatInfo {
  number: string;
  identityNumber: string;
  fullName: string;
  birth: string;
}

import { defineComponent, PropType } from "vue";
import DfTitleAndLabel from "../utils/DfTitleAndLabel.vue";
import DfButtonExpand from "../forms/DFButtonExpand.vue";

export default defineComponent({
  components: {
    DfTitleAndLabel,
    DfButtonExpand,
  },
  props: {
    info: Object as PropType<ICandidatInfo>,
    type: {
      type: String,
      default: "presence",
    },
  },
  setup(_, { emit }) {
    return {
      confirm: () => emit("confirm"),
    };
  },
});
</script>
