<script setup lang="ts">
import Header from "@/components/Header.vue";
import MainField from "@/components/MainField.vue";
import SearchInput from "@/components/SearchInput.vue";
import AnimeBanner from "@/components/AnimeBanner.vue";
import { ref, watch } from "vue";

const animeList = ref();
const loading = ref<boolean>(false);
const query = ref<string>("");

watch(query, async () => {
  if (!query.value) {
    return;
  }
  loading.value = true;
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query.value}`
    );
    console.log(`https://api.jikan.moe/v4/anime?q=${query.value}`);
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
});
</script>

<template>
  <div class="min-h-[101vh] text-third flex flex-col">
    <Header></Header>
    <div class="bg-background flex-grow">
      <div class="pt-12 max-w-[1200px] mx-auto flex flex-col gap-16">
        <SearchInput class="justify-center" v-model="query"></SearchInput>
        <MainField v-if="query == ''"></MainField>
        <section class="grid grid-cols-4 gap-12" v-else>
          <AnimeBanner v-for="anime in animeList" :selected-anime="anime" />
        </section>
      </div>
    </div>
    <Header></Header>
  </div>
</template>
