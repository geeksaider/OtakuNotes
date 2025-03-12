<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { computed } from "vue";

interface Props {
    link: string;
}

const { link } = defineProps<Props>();

const route = useRoute();
const isActive = computed(() => route.path === link);
</script>

<template>
    <RouterLink
        class="text-2xl relative group"
        :class="{
            'font-bold': isActive,
        }"
        :to="link"
    >
        <slot></slot>
        <div
            class="w-0 h-0.5 transition-all mx-auto bg-third rounded-3xl group-hover:w-[90%]"
        />
    </RouterLink>
</template>
