<template>
  <df-default-page>
    <div class="page">
      <div>
        <div class="pt-12 bold fs-18 text-dark-gray">
          Entrez le N° de table du candidat pour valider son admission
        </div>
        <div class="mt-30 flex flex-col gap-12">
          <df-input
            label="N° de table / Pièce d'identité"
            uppercase
            :value="candidatInfo.id"
            @change="setId"
          />
          <df-button-expand :disabled="!isValidForm" @click="handleSubmit">
            Suivant
          </df-button-expand>
        </div>
      </div>

      <div class="flex justify-between items-center mb-12">
        <df-button type="outline" @click="logout">
          <template v-slot:icon>
            <logout-icon />
          </template>
          Se déconnecter
        </df-button>

        <df-button @click="closeRegistrations">
          <template v-slot:icon>
            <lock-outline />
          </template>
          Clôturer
        </df-button>
      </div>
      <df-loading :isOpen="isLoading" />
      <df-modal :isOpen="isModalOpen">
        <div class="fs-14">
          <div class="my-8 text-center">
            La phase d'acceptation des candidats sera clôturer pour cette
            édition. <br />
            <br />
            Etes-vous sûr de vouloir poursuivre votre opération ?
          </div>
          <div class="flex justify-between items-center my-4">
            <df-button type="outline" @click="cancelCloseRegistrations">
              Annuler
            </df-button>

            <df-button @click="confirmCloseRegistrations">
              Confirmer
            </df-button>
          </div>
        </div>
      </df-modal>
    </div>
  </df-default-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DfInput from "../components/forms/DfInput.vue";
import DfButtonExpand from "../components/forms/DFButtonExpand.vue";
import DfButton from "../components/forms/DfButton.vue";
import LogoutIcon from "../components/svgs/LogoutIcon.vue";
import LockOutline from "../components/svgs/LockOutline.vue";
import DfDefaultPage from "../components/utils/DfDefaultPage.vue";
import { useRouter } from "vue-router";
import { useValidationPageForm } from "../hooks/useValidationPageForm";
import DfLoading from "../components/utils/DfLoading.vue";
import DfModal from "../components/utils/DfModal.vue";
import { DF_STEPS, setCurrentStep } from "../libs/middleware";

export default defineComponent({
  components: {
    DfInput,
    DfButtonExpand,
    DfButton,
    LogoutIcon,
    LockOutline,
    DfDefaultPage,
    DfLoading,
    DfModal,
  },
  setup() {
    const router = useRouter();
    const { handleSubmit, candidatInfo, setId, isValidForm, isLoading } =
      useValidationPageForm(router);

    const isModalOpen = ref(false);

    const closeRegistrations = () => {
      console.log("ok");
      isModalOpen.value = true;
    };

    const cancelCloseRegistrations = () => (isModalOpen.value = false);

    const confirmCloseRegistrations = () => {
      isModalOpen.value = false;
      setCurrentStep(DF_STEPS.CLOSED);
      router.push("/process-end");
    };

    return {
      logout: () => router.push("/"),
      closeRegistrations,
      handleSubmit,
      candidatInfo,
      setId,
      isValidForm,
      isLoading,
      cancelCloseRegistrations,
      confirmCloseRegistrations,
      isModalOpen
    };
  },
});
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>