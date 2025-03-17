<script setup lang="ts">
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

const { selectedAnime } = defineProps(["selectedAnime"]);
</script>

<template>
    <RouterLink
        v-if="selectedAnime"
        :to="`/anime/${selectedAnime.mal_id}`"
        class="flex flex-col h-fit gap-4 max-w-60"
    >
        <div class="relative flex justify-center">
            <img
                v-if="selectedAnime.images && selectedAnime.images.webp"
                :src="
                    'webp' in selectedAnime.images
                        ? selectedAnime.images.webp.image_url
                        : ''
                "
                :alt="
                    selectedAnime.titles.find(
                        (title) => title.type == 'English'
                    )
                        ? selectedAnime.titles.find(
                              (title) => title.type == 'English'
                          ).title
                        : selectedAnime.titles[0].title
                "
                class="rounded-lg shadow-sm shadow-third select-none"
            />
            <div class="absolute flex bottom-1 right-4 group">
                <span
                    class="bg-black opacity-80 px-3 select-none py-px rounded-2xl items-center text-white font-bold text-xl"
                >
                    {{ selectedAnime.score ? selectedAnime.score : "-" }}
                </span>
            </div>
        </div>

        <div class="bg-white flex flex-col rounded-lg shadow-md py-2 px-4">
            <h1 class="text-xl font-bold max-h-[1.2em] truncate">
                {{
                    selectedAnime.titles.find(
                        (title) => title.type == "English"
                    )
                        ? selectedAnime.titles.find(
                              (title) => title.type == "English"
                          ).title
                        : selectedAnime.titles[0].title
                }}
            </h1>

            <p>
                {{ selectedAnime.type == "TV" ? "TV сериал" : "Фильм" }}
            </p>
            <p class="text-third/80 font-semibold">{{ selectedAnime.year }}</p>
        </div>
    </RouterLink>
</template>
