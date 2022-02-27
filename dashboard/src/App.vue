<template>
 <div>
   <df-header></df-header>

   <menu-element-container>
      <menu-element label="Dashboard" :isActive="false"></menu-element>
      <menu-element label="Candidature" :isActive="false"></menu-element>
      <menu-element label="Phase Sportive" :isActive="true"></menu-element>
   </menu-element-container>
   <br>
  <p>Test </p>
  
  <h1>Statistiques container </h1>
  <stats-container>
    <disp-stats-label label="Statistiques">
      <df-select :data="data"></df-select>
    </disp-stats-label>
    <div class="flex flex-row flex-wrap justify-between items-center">
      <disp-stats color="violet" label="Candidats admis" :total="500"></disp-stats>
      <disp-stats color="green" label="Total des canditats présents" :total="5000"></disp-stats>
      <disp-stats color="red" label="Candidats rejetées" :total="4500"></disp-stats>
    </div>
  </stats-container>
  <h1>Data Form</h1>
  <df-data-form></df-data-form>
   <!-- <DopaBig />
   <MdnSmall />
   <MdnBig />
   <LogoMdn /> -->
 </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import LogoMdn from "./components/svgs/LogoMdn.vue"
// import DopaBig from "./components/svgs/DopaBig.vue"
// import DopaSmall from "./components/svgs/DopaSmall.vue"
// import MdnBig from "./components/svgs/MdnBig.vue"
// import MdnSmall from "./components/svgs/MdnSmall.vue"
import PersonIcon from "./components/svgs/PersonIcon.vue"
import MenuElement from "./components/utils/MenuElement.vue"
import DispStats from "./components/utils/DispStats.vue"
import MenuElementContainer from "./components/utils/MenuElementContainer.vue";
import DispStatsLabel from "./components/utils/DispStatsLabel.vue"
import DfSelect from "./components/forms/DfSelect.vue"
import StatsContainer from "./components/utils/StatsContainer.vue"
import DfDataForm from "./components/forms/DfDataForm.vue"
import DfHeader from "./components/forms/DfHeader.vue"


export default defineComponent({
  name: "App",
  components: {
    PersonIcon,
    MenuElement,
    MenuElementContainer,
    DispStats,
    DispStatsLabel,
    DfSelect,
    StatsContainer,
    DfDataForm,
    DfHeader
    // LogoMdn,
    // DopaBig,
    // DopaSmall,
    // MdnBig,
    // MdnSmall
  },
  setup() {
    const data = [{label: "Phase sportive"}]
    const user = {
      nom: "LINGUE Christian",
      role: "Administrateur",
    }
    return {
      isActive: true,
      data
    }
  }
});
</script>

<style lang="scss" scoped>

</style>