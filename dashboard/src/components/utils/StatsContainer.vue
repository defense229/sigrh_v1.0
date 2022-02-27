<template>
    <div class="flex flex-col p-12   radius-8 my-12 drop-shadow bg-white">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.drop-shadow {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
