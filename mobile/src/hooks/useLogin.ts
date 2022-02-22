import http from "@/http";
import { applyInterceptorMiddleware } from "@/libs/middleware";
import { toastController } from "@ionic/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

export function useLogin() {
  const router = useRouter();
  const userInfo = ref({
    username: "",
    password: "",
  });
  const isLoading = ref(false);

  const openToast = async () => {
    const toast = await toastController.create({
      message: 'Identifiants incorrects',
      duration: 5000,
    });
    return toast.present();
  }

  const handleSubmit = async () => {
    isLoading.value = true;
    const response = await http.post('auth/login', userInfo.value);
    userInfo.value = {
      username: "",
      password: "",
    };
    isLoading.value = false;
    if (response.statusCode === 401) {
      await openToast();
      return;
    }
    
    await applyInterceptorMiddleware(router);
  };

  return {
    isLoading,
    handleSubmit,
    userInfo
  };
}