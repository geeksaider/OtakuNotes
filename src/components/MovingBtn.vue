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
</script>

<template>
  <RouterLink
    :to="link"
    class="px-5 py-2.5 relative group transition-all duration-300"
    :class="
      isActive ? 'text-primary-500' : 'text-black/80 hover:text-primary-500'
    "
  >
    <span class="text-xl" :class="isActive ? 'font-medium' : 'font-normal'">
      <slot />
    </span>

    <div
      class="absolute bottom-0 left-0 w-full h-0.5 origin-left transition-all duration-300"
      :class="
        isActive
          ? 'bg-primary-500 scale-x-100 '
          : 'bg-primary-500/10 group-hover:scale-x-100 scale-x-0  '
      "
    />
  </RouterLink>
</template>
