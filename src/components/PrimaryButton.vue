<script setup lang="ts">
interface Props {
  classes?: string;
}

const { classes } = defineProps<Props>();
</script>

<template>
  <button
    :class="classes"
    class="py-2 px-4 w-fit rounded-lg disabled:pointer-events-none disabled:opacity-60 hover:bg-primary-300/30 transition-colors border-2 border-primary-500/10"
  >
    <slot></slot>
  </button>
</template>
