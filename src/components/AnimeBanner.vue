<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";

interface Props {
  titleIamge: string;
}

const titleImage = ref();

const selectedAnime = ref<ProfileInfo>();

onMounted(async () => {
  const response = await fetch("https://api.jikan.moe/v4/anime/1");
  selectedAnime.value = await response.json();
  selectedAnime.value
    ? (titleImage.value = selectedAnime.value.data.images.webp.image_url)
    : "";
});
</script>

<template>
  <section v-if="selectedAnime" class="">
    <img
      :src="titleImage"
      :alt="
        selectedAnime.data.titles.find((title) => title.type == 'English').title
      "
    />
    <h1 class="text-xl">
      {{
        selectedAnime.data.titles.find((title) => title.type == "English").title
      }}
    </h1>
  </section>
</template>
