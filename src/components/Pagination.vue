<script setup lang="ts">
import { computed, defineEmits, defineProps, defineModel } from "vue";
import ArrowChevron from "./SVG/ArrowChevron.vue";
import Loading from "./Loading.vue";

const { totalPages, isLoading } = defineProps<{
  totalPages: number;
  isLoading: boolean;
}>();

const currentPage = defineModel<number>({ default: 1 });

const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxVisible: number = 3;

  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);

  end - start < maxVisible - 1
    ? (start = Math.max(1, end - maxVisible + 1))
    : "";

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const scroll = (page: number) => {
  window.scrollTo({ top: 100, behavior: "smooth" });
  currentPage.value = page;
};
</script>

<template>
  <section
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
      @click="currentPage--"
    />

    <button
      v-if="visiblePages[0] > 1"
      class="w-10 h-10 rounded-full transition-all text-lg hover:bg-primary-300"
      @click="currentPage = 1"
    >
      1
    </button>

    <span
      v-if="visiblePages[0] > 2"
      class="font-bold text-lg pointer-events-auto"
      >...</span
    >

    <div class="flex gap-2 py-1">
      <button
        v-for="page in visiblePages"
        class="text-white shadow-md w-10 h-10 rounded-full transition-all duration-300 text-lg"
        :class="[
          page === currentPage
            ? 'font-bold bg-primary-500/60 shadow-lg scale-110'
            : 'bg-primary-500/40 hover:bg-primary-500/60 hover:scale-105',
        ]"
        @click="currentPage = page"
      >
        {{ page }}
      </button>
    </div>

    <span
      v-if="visiblePages[visiblePages.length - 1] < totalPages - 1"
      class="font-bold text-lg pointer-events-none"
      >...</span
    >

    <button
      v-if="visiblePages[visiblePages.length - 1] < totalPages"
      class="w-10 h-10 rounded-full transition-all text-lg hover:bg-primary-300"
      @click="currentPage = totalPages"
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
      @click="currentPage++"
    />
  </section>

  <slot> </slot>

  <section v-if="isLoading" class="flex justify-center min-h-screen">
    <Loading></Loading>
  </section>

  <section
    class="flex gap-4 items-center justify-center bg-white ring-inset ring-2 ring-primary-300 text-primary-500 focus:outline-none focus:ring-primary-500 w-fit mx-auto rounded-full transition-all text-lg font-logo overflow-hidden px-2 py-1"
    v-if="totalPages != 1 && !isLoading"
  >
    <ArrowChevron
      :class="[
        'rotate-180 bg-primary-500/60 size-10 p-2 rounded-full transition-all',
        currentPage === 1
          ? 'opacity-30 pointer-events-none'
          : 'hover:bg-primary-500/80 cursor-pointer active:scale-90',
      ]"
      @click="scroll(currentPage--)"
    />

    <button
      v-if="visiblePages[0] > 1"
      class="hover:bg-primary-300 w-10 h-10 rounded-full transition-all text-lg"
      @click="scroll(1)"
    >
      1
    </button>

    <span
      v-if="visiblePages[0] > 2"
      class="font-bold text-lg pointer-events-none"
      >...</span
    >

    <div class="flex gap-2 py-1">
      <button
        v-for="page in visiblePages"
        class="text-white shadow-md w-10 h-10 rounded-full transition-all duration-300 text-lg"
        :class="[
          page === currentPage
            ? 'font-bold bg-primary-500/60 shadow-lg scale-110'
            : 'bg-primary-500/40 hover:bg-primary-500/60 hover:scale-105',
        ]"
        @click="scroll(page)"
      >
        {{ page }}
      </button>
    </div>

    <span
      v-if="visiblePages[visiblePages.length - 1] < totalPages - 1"
      class="font-bold text-lg pointer-events-none"
      >...</span
    >

    <button
      v-if="visiblePages[visiblePages.length - 1] < totalPages"
      class="w-10 h-10 rounded-full transition-all text-lg hover:bg-primary-300"
      @click="scroll(totalPages)"
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
      @click="scroll(currentPage++)"
    />
  </section>
</template>
