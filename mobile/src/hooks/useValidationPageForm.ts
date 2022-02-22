import { computed, ref } from "vue";
import http from '../http';
import { toastController } from "@ionic/vue";
import { Router } from "vue-router";

export function useValidationPageForm(router: Router) {
  const candidatInfo = ref({
    id: "",
  });
  const isLoading = ref(false);

  const handleSubmit = async () => {
    isLoading.value = true;
    const response = await http.get(
      `mb/confirm-accept/${candidatInfo.value.id}/`
    );
    isLoading.value = false;
    candidatInfo.value.id = "";
    if (response.statusCode !== 200) {
      await openToast();
      return;
    }
    router.push("/details/validation/" + response.id);
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

  const isValidForm = computed(() => {
    return (
      candidatInfo.value.id.length > 0 
    );
  });

  return {
    handleSubmit,
    candidatInfo,
    setId,
    isValidForm,
    isLoading
  }
}
