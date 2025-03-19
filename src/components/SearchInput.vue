<script setup>
import { defineModel } from "vue";
import Search from "./SVG/Search.vue";
const query = defineModel();
</script>

<template>
  <div class="relative">
    <div
      class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
    >
      <Search class="fill-primary-500/60" />
    </div>
    <input
      type="text "
      class="w-[800px] h-12 px-5 ps-10 bg-white border-black border-1 rounded-full ring-inset ring-2 ring-primary-300 text-black/80 focus:outline-none focus:ring-primary-500 transition-all duration-200"
      placeholder="Начните писать.."
      v-model="query"
    />
  </div>
</template>
