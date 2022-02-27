<template>
    <div class="flex flex-col">
        <div class="flex flex-row justify-between items-center semi-bold fs-18 lh-26">
            <div class = "text-dark mx-8">Liste des candidats</div>
            <div class = "flex flex-row items-center justify-between brand text-primary-blue mx-8">
                <a href="http://" class = "mx-4">Voir tous les candidats</a>
                <arrow-right></arrow-right>
            </div>
        </div>
        <table style="border-collapse: collapse">
            <thead class = "bg-light-gray h-24 fs-14 bold text-dark-gray">
                <tr>
                    <td>N° de table</td>
                    <td>Nom et prénom (s)</td>
                    <td>Catégorie</td>
                    <td>Département</td>
                    <td>Date d’envoie</td>
                    <td>Statut</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>56336779</td>
                    <td>Ahounou Jean</td>
                    <td>Enseignant </td>
                    <td>Atlantique</td>
                    <td>22/09/2021 à 10:32</td>
                    <td>
                        <df-button :success = true></df-button>
                    </td>
                    <td class = "flex flex-row items-center text-center justify-center">
                        <div class = "flex flex-row items-center justify-center">
                            <eye-icon class=" mr-2"></eye-icon>
                            <span>Voir détails</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArrowRight from "../svgs/ArrowRight.vue"
import EyeIcon from "../svgs/EyeIcon.vue"
import DfButton from "../forms/DfButtons.vue"
export default defineComponent({
    components: {
        ArrowRight,
        EyeIcon,
        DfButton,
    },
    setup() {
        
    },
})
</script>

<style lang="scss" scoped>
    tbody tr:first-child {
        // class="tb-text-primary"
        color: #272833;
    }
    tbody tr:first-child{
        background-color:#fdf7e8;
    }
    tbody tr{
        background-color:#fff;
        height: 48px;
    }
    tbody tr td:first-child {
        // class="tb-text-primary"
        color: #272833;
        font-weight: bold;
    }
    tbody tr td:last-child {
        // class="tb-text-primary"
        color: #000;
        font-weight: bold;
    }
    .center {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
}
</style>