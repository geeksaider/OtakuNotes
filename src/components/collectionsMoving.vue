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
        class="relative group text-lg font-primary transition-colors"
        :class="{
            'text-second font-medium': isActive,
            'text-third/80 hover:text-second': !isActive,
        }"
        :to="link"
    >
        <span class="relative inline-block pb-1">
            <slot />
            <div
                v-if="isActive"
                class="absolute bottom-0 left-0 w-full h-0.5 bg-second/80"
            />
        </span>
    </RouterLink>
</template>
