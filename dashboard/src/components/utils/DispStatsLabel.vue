<template>
    <div class="container flex flex-row items-center pb-8 justify-between bg-white my-12">
        <div>
            <span class="bold fs-18 lh-22 text-dark my-4">{{label}}</span>
        </div>
        <div>
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    components: {
    },
    setup() {
        
    },
})
</script>

<style lang="scss" scoped>
    .container {
        box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.14);
    }
</style>
