<template>
    <div class="flex flex-row justify-between items-center p-5">
       <div>
            <mdn-logo></mdn-logo>
       </div>
        <span class="bar"></span>
        <div>

        <dopa-logo></dopa-logo>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MdnLogo from "../svgs/MdnLogo.vue"
import DopaLogo from "../svgs/DopaLogo.vue"
export default defineComponent({
    components: {
        MdnLogo,
        DopaLogo
    },
    setup() {
        
    },
})
</script>


 <style lang="scss" scoped>
 .bar
 {
    // position: static;
    width: 0px;
    height: 29px;
    left: 54px;
    top: 10.48px;

    border: 1px solid rgba(19, 16, 16, 0.5);


    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0px 16px; 
 }
</style>