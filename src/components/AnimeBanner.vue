<script setup lang="ts">
import { defineProps } from "vue";
import { RouterLink } from "vue-router";
import type { Anime } from "@/composables/anime";

interface Props {
    selectedAnime: Anime;
}

const { selectedAnime } = defineProps<Props>();
</script>

<template>
    <RouterLink
        v-if="selectedAnime"
        :to="`/anime/${selectedAnime.mal_id}`"
        class="bg-white rounded-xl shadow-lg hover:shadow-xl max-h-[450px] transition-shadow duration-300"
    >
        <div class="relative aspect-[4/5] bg-second/5">
            <img
                :src="selectedAnime.images?.webp.large_image_url"
                :alt="selectedAnime.titles[0]?.title"
                class="h-full w-full object-cover rounded-t-xl"
            />

            <div
                class="absolute top-3 right-2 bg-second/90 backdrop-blur-sm px-3 py-1.5 rounded-md"
            >
                <span class="text-white font-bold">
                    ★ {{ selectedAnime.score || "—" }}
                </span>
            </div>
        </div>

        <div class="flex flex-col gap-4 p-4">
            <h3
                class="text-lg font-semibold text-third line-clamp-2 min-h-[2em]"
            >
                {{
                    selectedAnime.titles.find((t) => t.type === "English")
                        ?.title || selectedAnime.titles[0]?.title
                }}
            </h3>

            <div class="flex items-center gap-3 text-sm">
                <span class="px-2.5 py-1 bg-second/10 text-second rounded-md">
                    {{ selectedAnime.type }}
                </span>
                <span class="text-third/80 font-semibold">{{
                    selectedAnime.year
                }}</span>
            </div>
        </div>
    </RouterLink>
</template>
