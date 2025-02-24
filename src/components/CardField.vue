<script setup>
import { defineProps } from "vue";

const { query } = defineProps("query");

const animeList = ref();
const loading = ref(false);

async function search() {
  if (!query.value) {
    return;
  }
  loading.value = true;
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query.value)}`
    );
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
}
</script>

<template>
  <section></section>
</template>
