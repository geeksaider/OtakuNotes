<script setup lang="ts">
import Filter from "./SVG/Filter.vue";
</script>

<template>
    <button
        id="filter-button"
        class="flex h-11 w-11 items-center justify-center bg-white rounded-full ring-2 ring-first shadow-md hover:bg-first/50 transition-all"
    >
        <Filter class="fill-second"></Filter>
    </button>
</template>
