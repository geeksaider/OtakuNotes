<script setup lang="ts">
import { computed, defineEmits, defineProps } from "vue";
import ArrowChevron from "./SVG/ArrowChevron.vue";

const { currentPage, totalPages } = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits(["pageChange"]);

const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxVisible: number = 3;

  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);

  end - start < maxVisible - 1
    ? (start = Math.max(1, end - maxVisible + 1))
    : "";

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
</script>

<template>
  <div
    class="flex gap-4 items-center justify-center bg-white ring-inset ring-2 ring-primary-300 text-primary-500 focus:outline-none focus:ring-primary-500 w-fit mx-auto rounded-full transition-all text-lg font-logo overflow-hidden px-2 py-1"
    v-if="totalPages != 1"
  >
    <ArrowChevron
      :class="[
        'rotate-180 bg-primary-500/60 size-10 p-2 rounded-full transition-all',
        currentPage === 1
          ? 'opacity-30 pointer-events-none'
          : 'hover:bg-primary-500/80 cursor-pointer active:scale-90',
      ]"
      @click="emit('pageChange', currentPage - 1)"
    />

    <button
      v-if="visiblePages[0] > 1"
      @click="emit('pageChange', 1)"
      class="hover:bg-primary-300 w-10 h-10 rounded-full transition-all text-lg"
    >
      1
    </button>

    <span v-if="visiblePages[0] > 2" class="font-bold text-lg">...</span>

    <div class="flex gap-2 py-1">
      <button
        v-for="page in visiblePages"
        @click="emit('pageChange', page)"
        class="text-white shadow-md w-10 h-10 rounded-full transition-all duration-300 text-lg"
        :class="[
          page === currentPage
            ? 'font-bold bg-primary-500/60 shadow-lg scale-110'
            : 'bg-primary-500/40 hover:bg-primary-500/60 hover:scale-105',
        ]"
      >
        {{ page }}
      </button>
    </div>

    <span
      v-if="visiblePages[visiblePages.length - 1] < totalPages - 1"
      class="e font-bold text-lg"
      >...</span
    >

    <button
      v-if="visiblePages[visiblePages.length - 1] < totalPages"
      class="hover:bg-primary-300 w-10 h-10 rounded-full transition-all text-lg"
      @click="emit('pageChange', totalPages)"
    >
      {{ totalPages }}
    </button>

    <ArrowChevron
      :class="[
        ' bg-primary-500/60 size-10 p-2 rounded-full transition-all',
        currentPage === totalPages
          ? 'opacity-30 pointer-events-none'
          : 'hover:bg-primary-500/80 cursor-pointer active:scale-90',
      ]"
      @click="emit('pageChange', currentPage + 1)"
    />
  </div>
</template>
