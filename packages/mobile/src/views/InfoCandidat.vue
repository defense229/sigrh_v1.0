<template>
  <df-default-page>
    <df-info-candidat :type="type" :info="data" @confirm="confirm" />
  </df-default-page>
</template>

<script lang="ts">
import { onIonViewWillEnter, onIonViewWillLeave } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import DfDefaultPage from "../components/utils/DfDefaultPage.vue";
import DfInfoCandidat from "../components/utils/DfInfoCandidat.vue";
import http from "../http";

export default defineComponent({
  components: {
    DfDefaultPage,
    DfInfoCandidat,
  },
  setup() {
    const { type, id } = useRoute().params;
    const router = useRouter();
    const data = ref({
      number: "",
      identityNumber: "",
      fullName: "",
      birth: "",
    });

    onIonViewWillEnter(async () => {
      const response = await http.get("candidats/" + id);
      data.value = {
        number: response.numero,
        identityNumber: response.numeroPiece,
        fullName: response.nom + " " + response.prenom,
        birth:
          new Date(response.dateNaissance).toLocaleDateString() +
          " à " +
          response.lieuNaissance,
      };
    });

    onIonViewWillLeave(() => {
      data.value = {
        number: "",
        identityNumber: "",
        fullName: "",
        birth: "",
      };
    });

    const confirm = () => {
      router.push(type === "presence" ? "/presences" : "/validations");
    };

    return {
      confirm,
      data,
      type,
    };
  },
});
</script>
