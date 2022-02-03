<template>
  <ion-page>
    <df-layout-header />
    <df-layout-content>
      <df-container>
        <div class="relative" style="height: 100%">
          <div class="pt-12 bold fs-18 text-dark-gray">
            Entrez le N° de table ou le N° de la pièce d'identité du candidat
            pour valider sa présence
          </div>
          <div class="mt-30 flex flex-col gap-12">
            <df-input label="N° de table / Pièce d'identité" />
            <df-select
              label="Catégorie du candidat"
              :data="[
                { label: 'Normal', value: 'NORMAL' },
                { label: 'Enseignant (e)', value: 'ENSEIGNANT' },
                { label: 'Aide soignant (e)', value: 'AIDE_SOIGNANT' },
              ]"
            />
            <df-button-expand> Suivant </df-button-expand>
          </div>

          <div
            class="flex justify-between items-center absolute mb-12"
            style="bottom: 0; width: 100%"
          >
            <df-button type="outline">
              <template v-slot:icon>
                <logout-icon />
              </template>
              Se déconnecter
            </df-button>

            <df-button>
              <template v-slot:icon>
                <lock-outline />
              </template>
              Clôturer
            </df-button>
          </div>
        </div>
      </df-container>
    </df-layout-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage } from "@ionic/vue";
import DfLayoutHeader from "../components/utils/DfLayoutHeader.vue";
import DfLayoutContent from "../components/utils/DfLayoutContent.vue";
import DfInput from "../components/forms/DfInput.vue";
import DfSelect from "../components/forms/DfSelect.vue";
import DfButtonExpand from "../components/forms/DFButtonExpand.vue";
import DfButton from "../components/forms/DfButton.vue";
import DfContainer from "../components/utils/DfContainer.vue";
import LogoutIcon from "../components/svgs/LogoutIcon.vue";
import LockOutline from "../components/svgs/LockOutline.vue";

export default defineComponent({
  components: {
    IonPage,
    DfLayoutHeader,
    DfLayoutContent,
    DfInput,
    DfSelect,
    DfButtonExpand,
    DfButton,
    DfContainer,
    LogoutIcon,
    LockOutline,
  },
});
</script>
