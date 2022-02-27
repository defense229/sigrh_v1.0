<template>
    <div > 
        <div class="container flex flex-row items-center p-12 bg-white radius-8 mx-12">
           <div class="ml-6 mr-6 ">
               <div v-if="color =='green'">
                    <stats-green-icon></stats-green-icon>
                </div>
                <div v-else-if="color == 'red'">
                    <stats-red-icon></stats-red-icon>
                </div>
                <div v-else-if="color == 'violet'">
                    <stats-violet-icon></stats-violet-icon>
                </div> 
           </div>
            <div class = "flex flex-col">
                <p class="fs-14 medium lh-14 label-color">{{label}}</p>
                <p class="fs-20 semi-bold lh-14">{{total}}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StatsRedIcon from "../svgs/StatsRedIcon.vue"
import StatsGreenIcon from "../svgs/StatsGreenIcon.vue"
import StatsVioletIcon from "../svgs/StatsVioletIcon.vue"

export default defineComponent({
    props: {
        data: {
            type: [],
            default: [],
            required: false
        },
         color: {
            type: String,
            default: "red"
        },
         label: {
            type: String,
            default: ""
        },
         total: {
            type: Number,
            default: ""
        },
    },
    components: {
        StatsRedIcon,
        StatsGreenIcon,
        StatsVioletIcon
    },
    setup() {
        
    },
})
</script>

<style lang="scss" scoped>
    .container {
        border: 1.5px solid #858C94;
    }
    .label-color {
        color: #394452
    }
</style>
