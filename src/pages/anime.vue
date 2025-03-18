<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useApi } from "@/composables/useAPI";
import type { Anime } from "@/composables/anime";

import Header from "@/components/Header.vue";
import ContentTemplate from "@/components/ContentTemplate.vue";
import Loading from "@/components/Loading.vue";

interface Props {
    id: string;
}

const { id } = defineProps<Props>();
const selectedAnime = ref<Anime>();
const relatedAnime = ref();

watchEffect(() => {
    window.scrollTo(0, 0);
    useApi<Anime>(`/anime/${id}/full`).then(({ data }) => {
        selectedAnime.value = data;
        relatedAnime.value = selectedAnime.value.relations
            ?.flatMap((relation) => relation.entry)
            .filter((entry) => entry.type === "anime");
    });
});
</script>

<template>
    <div class="min-h-screen flex flex-col bg-background font-primary">
        <Header />
        <ContentTemplate class="py-12">
            <div
                v-if="selectedAnime"
                class="bg-white rounded-xl px-8 py-10 max-w-5xl mx-auto shadow-lg ring ring-first/30 flex flex-col gap-12"
            >
                <div class="flex gap-8 items-start">
                    <div class="relative">
                        <div
                            class="absolute -inset-4 bg-second/5 rounded-xl"
                        ></div>
                        <img
                            :src="selectedAnime.images.webp.large_image_url"
                            class="w-64 rounded-lg shadow-md"
                            :alt="selectedAnime.titles[0].title"
                        />
                    </div>

                    <div class="flex flex-col gap-4">
                        <h1
                            class="text-4xl font-logo text-second leading-tight"
                        >
                            {{ selectedAnime.titles[0].title }}
                        </h1>

                        <div class="flex gap-4 items-center">
                            <div
                                v-for="title in selectedAnime.titles.slice(
                                    1,
                                    4
                                )"
                                class="text-sm text-third/80 italic"
                            >
                                «{{ title.title }}»
                            </div>
                        </div>

                        <div class="flex gap-2">
                            <div
                                class="px-3 py-1 bg-first text-second rounded-md text-sm font-medium border border-second/10"
                            >
                                {{ selectedAnime.type }}
                            </div>
                            <div
                                class="px-3 py-1 bg-first text-second rounded-md text-sm font-medium border border-second/10"
                            >
                                {{ selectedAnime.status }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-4 gap-4">
                    <div
                        v-for="(value, key) in {
                            '★ Score': selectedAnime.score || '—',
                            '📊 Rank': selectedAnime.rank || '—',
                            '🎬 Episodes': selectedAnime.episodes || '—',
                            '📅 Year': selectedAnime.year || '—',
                        }"
                        :key="key"
                        class="p-4 text-center bg-background rounded-lg border border-second/10"
                    >
                        <div class="text-sm text-third/60 mb-1">{{ key }}</div>
                        <div class="font-logo text-second text-xl">
                            {{ value }}
                        </div>
                    </div>
                </div>

                <article>
                    <h2
                        class="text-xl text-second mb-4 border-l-4 border-second pl-3"
                    >
                        Описание
                    </h2>
                    <p class="text-third leading-relaxed">
                        {{ selectedAnime.synopsis }}
                    </p>
                </article>

                <div v-if="selectedAnime.trailer.embed_url">
                    <div class="rounded-lg overflow-hidden shadow-sm">
                        <iframe
                            :src="selectedAnime.trailer.embed_url"
                            class="w-full aspect-video"
                            frameborder="0"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-16">
                    <div>
                        <h3 class="text-lg text-second mb-3">Детали</h3>
                        <dl class="space-y-3 text-sm">
                            <div
                                v-for="(value, key) in {
                                    Aired: selectedAnime.aired.string.replace(
                                        'to',
                                        '—'
                                    ),
                                    Duration: selectedAnime.duration,
                                    Rating: selectedAnime.rating,
                                    Source: selectedAnime.source,
                                }"
                                :key="key"
                                class="flex justify-between items-center py-2 border-b border-first/20"
                            >
                                <dt class="text-third/70">{{ key }}</dt>
                                <dd class="text-second font-medium">
                                    {{ value }}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div>
                        <h3 class="text-lg text-second mb-3">Жанры</h3>
                        <div class="flex flex-wrap gap-2">
                            <router-link
                                v-for="genre in selectedAnime.genres"
                                :key="genre.mal_id"
                                :to="`/genre/${genre.mal_id}`"
                                class="px-3 py-1.5 text-sm bg-first text-second rounded-full hover:bg-second/10 transition-colors"
                            >
                                {{ genre.name }}
                            </router-link>
                        </div>
                    </div>
                </div>

                <div v-if="relatedAnime.length">
                    <h3 class="text-lg font-logo text-second mb-4">
                        Related Titles
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <router-link
                            v-for="entry in relatedAnime"
                            :key="entry.mal_id"
                            :to="`/anime/${entry.mal_id}`"
                            class="p-4 bg-background rounded-lg hover:bg-first/30 transition-colors border border-second/10"
                        >
                            <div class="flex items-center justify-between">
                                <span class="text-second">{{
                                    entry.name
                                }}</span>
                                <span class="text-xs text-third/60">{{
                                    entry.type
                                }}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

            <section v-else class="flex justify-center min-h-screen">
                <Loading />
            </section>
        </ContentTemplate>
    </div>
</template>
