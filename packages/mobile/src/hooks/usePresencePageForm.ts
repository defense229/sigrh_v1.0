import { computed, ref } from "vue";
import { seed } from '@sigrh/libs';
import http from '../http';
import { toastController } from "@ionic/vue";
import { Router } from "vue-router";

export function usePresencePageForm(router: Router) {
  const candidatInfo = ref({
    id: "",
    status: "",
  });
  const isLoading = ref(false);

  const selectData = ref([
    { label: "Normal", value: seed.DF_TYPE_CANDIDAT.normal },
    { label: "Enseignant (e)", value: seed.DF_TYPE_CANDIDAT.enseignant },
    { label: "Aide soignant (e)", value: seed.DF_TYPE_CANDIDAT.aideSoignant },
  ]);

  const handleSubmit = async () => {
    isLoading.value = true;
    const response = await http.get(
      `mb/confirm-presence/${candidatInfo.value.id}/${candidatInfo.value.status}/`
    );
    isLoading.value = false;
    candidatInfo.value.id = "";
    if (response.statusCode !== 200) {
      await openToast();
      return;
    }
    router.push("/details/presence/" + response.id);
  };

  const openToast = async () => {
    const toast = await toastController.create({
      message:
        "Le N° de table ou le N° de la pièce d'identité du candidat est incorrect",
      duration: 5000,
    });
    return toast.present();
  };

  const setId = (event: any) => {
    candidatInfo.value.id = event.target ? event.target.value : event;
  };

  const setStatus = (data: any) => {
    candidatInfo.value.status = data.value;
  };

  const isValidForm = computed(() => {
    return (
      candidatInfo.value.id.length > 0 && candidatInfo.value.status.length > 0
    );
  });

  return {
    handleSubmit,
    candidatInfo,
    setId,
    setStatus,
    data: selectData,
    isValidForm,
    isLoading
  }
}
