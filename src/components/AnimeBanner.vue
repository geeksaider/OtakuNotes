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
  <section v-if="selectedAnime" class="flex flex-col gap-4 max-w-60">
    <div class="relative">
      <img
        :src="titleImage"
        :alt="
          selectedAnime.data.titles.find((title) => title.type == 'English')
            .title
        "
        class="rounded-lg shadow-sm shadow-third"
      />
      <div class="absolute flex bottom-1 right-4 group">
        <span
          class="bg-black opacity-80 px-3 py-px rounded-2xl items-center text-white font-bold text-xl"
        >
          {{ selectedAnime.data.score }}
        </span>
      </div>
    </div>

    <div class="bg-white flex flex-col rounded-lg shadow-md py-2 px-4">
      <h1 class="text-xl font-bold">
        {{
          selectedAnime.data.titles.find((title) => title.type == "English")
            .title
        }}
      </h1>
      <p>
        {{ selectedAnime.data.type == "TV" ? "TV сериал" : "Фильм" }}
      </p>
      <p class="text-third/80 font-semibold">{{ selectedAnime.data.year }}</p>
    </div>
  </section>
</template>
