<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { computed } from "vue";

interface Props {
  link: string;
  exact?: boolean;
}

const { link, exact = true } = defineProps<Props>();

const route = useRoute();
const isActive = computed(() => 
  exact ? route.path === link : route.path.startsWith(link)
);
console.log(isActive.value);
</script>

<template>
  <RouterLink class="py-1 px-4 bg-white relative group" :to="link">
    <div
      class="w-2 h-2 border-l border-t border-third transition-all duration-500 absolute left-0 top-0 group-hover:w-[50%] group-hover:h-[50%]"
      :class="{
        'w-[50%] h-[50%] group-hover:w-2 group-hover:h-2': isActive,
      }"
    />
    <div
      class="w-2 h-2 border-r border-t border-third transition-all duration-500 absolute right-0 top-0 group-hover:w-[50%] group-hover:h-[50%]"
      :class="{
        'w-[50%] h-[50%] group-hover:w-2 group-hover:h-2': isActive,
      }"
    />
    <slot></slot>
    <div
      class="w-2 h-2 border-l border-b border-third transition-all duration-500 absolute left-0 bottom-0 group-hover:w-[50%] group-hover:h-[50%]"
      :class="{
        'w-[50%] h-[50%] group-hover:w-2 group-hover:h-2': isActive,
      }"
    />
    <div
      class="w-2 h-2 border-r border-b border-third transition-all duration-500 absolute right-0 bottom-0 group-hover:w-[50%] group-hover:h-[50%]"
      :class="{
        'w-[50%] h-[50%] group-hover:w-2 group-hover:h-2': isActive,
      }"
    />
  </RouterLink>
</template>
