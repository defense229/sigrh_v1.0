<template>
  <div>
      <df-loading isOpen />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { applyInterceptorMiddleware } from "../libs/middleware";
import DfLoading from "../components/utils/DfLoading.vue";

export default defineComponent({
  components: { DfLoading },
  setup() {
    const router = useRouter();
    onMounted(async () => {
      await applyInterceptorMiddleware(router);
    });
  },
});
</script>
