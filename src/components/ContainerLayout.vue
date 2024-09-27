<script setup lang="ts">
defineOptions({
    name: 'ContainerLayout'
});

interface Props {
    mainClassName?: string;
    className?: null;
};

withDefaults(defineProps<Props>(), {
    mainClassName: '',
    className: null
});

</script>

<template lang="">
    <div :class="mainClassName">
        <div :class="['container', className]">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
    .container {
        width: 90%;
        max-width: 1440px;
        margin: auto;
    }
</style>