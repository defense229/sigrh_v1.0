<template>
    <div class="flex flex-row justify-between items-center bg-primary my-2 mx-4">
        <div class="flex flex-row justify-between items-center p-5">
            <logo></logo>
        </div>
        <!-- <div>
            <div class="container flex flex-row items-center p-12 bg-white radius-8 mx-12">
                <div class="ml-6 mr-6 ">
                   <user-profile-picture></user-profile-picture>
                </div>
            <div class = "flex flex-col">
                <p class="fs-14 medium lh-14 label-color">{{user.nom}}</p>
                <p class="fs-20 semi-bold lh-14">{{user.role}}</p>
            </div>
        </div>
        </div> -->
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Logo from "../utils/Logo.vue"
import UserProfilePicture from "../utils/UserProfilePicture.vue"
export default defineComponent({
    components: {
        Logo,
        UserProfilePicture
    },
    props: {
        user: {
            nom: {
                type: String,
                default: ""
            },
            role: {
                type: String,
                default: ""
            },
            default:{}
        }
    },
    setup() {
        
    },
})
</script>


<style lang="scss" scoped>
 .bar {
    position: static;
    width: 0px;
    height: 29px;
    left: 54px;
    top: 10.48px;

    border: 1px solid rgba(255, 255, 255, 0.5);

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0px 16px;
 }
</style>