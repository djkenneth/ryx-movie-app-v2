<script setup>
defineOptions({
    name: 'ContainerLayout'
});
</script>

<template lang="">
    <div class="container">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .container {
        width: 90%;
        max-width: 1440px;
        margin: auto;
    }
</style>