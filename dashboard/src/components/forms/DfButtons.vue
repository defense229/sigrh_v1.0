<template>
    <div style="border-radius: 50px" class="flex flex-row items-center justify-center py-2 px-4" :class="{'bg-accepted': success, 'bg-rejected': !success}"> 
        <div class="mr-4">
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2.64" cy="2.99999" r="2.64" fill="white"/>
            </svg>
        </div>
        <div>
         <button class="fs-12 semi-bold lh-15 text-white" v-if="success">Accepte</button>
         <button class="fs-12 semi-bold lh-15 text-white" v-else>Rejeté</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        success: {
            type: Boolean,
            default: true
        }
    },
    setup() {
        
    },
})
</script>

<style lang="scss" scoped>
    button{
        background: none;
        border: none;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        color: #FFFFFF;
    }
</style>
