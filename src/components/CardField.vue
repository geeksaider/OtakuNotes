<script setup>
import { defineProps, ref, onMounted, watch } from "vue";

const { query } = defineProps("query");

const animeList = ref();
const loading = ref(false);
watch(query.value, () => {
  async () => {
    if (!query) {
      return;
    }
    loading.value = true;
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
      console.log(`https://api.jikan.moe/v4/anime?q=${query}`);
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      const json = await response.json();
      animeList.value = json.data;
    } catch (error) {
      console.error("Ошибка при поиске:", error);
    } finally {
      loading.value = false;
    }
  };
});

console.log(`https://api.jikan.moe/v4/anime?q=${query}`);
</script>

<template>
  <section></section>
</template>
