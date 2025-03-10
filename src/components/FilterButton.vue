<script setup lang="ts">
import Filter from "./SVG/Filter.vue";

interface Props {
  active: boolean;
}

const { active } = defineProps<Props>();
</script>

<template>
  <button
    id="filter-button"
    class="flex h-11 w-11 items-center justify-center rounded-full ring-2 shadow-md hover:bg-first/50 transition-all"
    :class="active ? ' ring-second' : ' bg-white  ring-first'"
  >
    <Filter class="fill-second"></Filter>
  </button>
</template>
