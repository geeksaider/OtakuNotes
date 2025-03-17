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
    <div class="min-h-[101vh] text-third flex flex-col">
        <Header />
        <ContentTemplate class="bg-background flex-grow py-12">
            <div
                v-if="selectedAnime"
                class="bg-white shadow-lg rounded-xl px-12 py-8 max-w-5xl mx-auto"
            >
                <div class="flex flex-col md:flex-row items-center gap-8">
                    <img
                        :src="selectedAnime.images.webp.large_image_url"
                        :alt="selectedAnime.titles[0].title"
                        class="w-64 rounded-lg shadow-md"
                    />

                    <article class="flex-1">
                        <h1 class="text-4xl font-bold text-primary">
                            {{ selectedAnime.titles[0].title }}
                        </h1>
                        <h2 class="text-xl text-gray-500">
                            {{ selectedAnime.titles[1].title || "—" }}
                        </h2>
                        <h3 class="text-md text-gray-400">
                            {{ selectedAnime.titles[2].title || "—" }}
                        </h3>

                        <div class="mt-6">
                            <h2
                                class="text-2xl font-semibold text-primary mb-2"
                            >
                                Статистика
                            </h2>
                            <p>
                                <strong>Оценка:</strong>
                                {{ selectedAnime.score || "Нет оценок" }}
                                (Оценило:
                                {{
                                    selectedAnime.scored_by
                                        ? new Intl.NumberFormat("en").format(
                                              selectedAnime.scored_by
                                          )
                                        : "—"
                                }}
                                пользователей)
                            </p>
                            <p>
                                <strong>Рейтинг:</strong>
                                #{{ selectedAnime.rank || "—" }}
                            </p>
                            <p>
                                <strong>Популярность:</strong>
                                #{{ selectedAnime.popularity || "—" }}
                            </p>
                        </div>

                        <div class="mt-6">
                            <h2
                                class="text-2xl font-semibold text-primary mb-2"
                            >
                                Информация
                            </h2>
                            <p>
                                <strong>Тип:</strong>
                                {{ selectedAnime.type }}
                            </p>
                            <p>
                                <strong>Эпизоды:</strong>
                                {{ selectedAnime.episodes || "Неизвестно" }}
                            </p>
                            <p>
                                <strong>Статус:</strong>
                                {{ selectedAnime.status }}
                            </p>
                            <p>
                                <strong>Дата выхода:</strong>
                                {{
                                    selectedAnime.aired.string.replace(
                                        "to",
                                        "до"
                                    ) || "—"
                                }}
                            </p>
                            <p>
                                <strong>Продюсеры:</strong>
                                {{
                                    selectedAnime.producers
                                        .map((p) => p.name)
                                        .join(", ") || "—"
                                }}
                            </p>
                            <p>
                                <strong>Студии:</strong>
                                {{
                                    selectedAnime.studios
                                        .map((s) => s.name)
                                        .join(", ") || "—"
                                }}
                            </p>
                            <p>
                                <strong>Источник:</strong>
                                {{ selectedAnime.source }}
                            </p>
                            <p>
                                <strong>Жанры:</strong>
                                <span
                                    v-for="genre in selectedAnime.genres"
                                    class="inline-block bg-gray-300 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold ml-2"
                                >
                                    {{ genre.name }}
                                </span>
                            </p>
                            <p>
                                <strong>Темы:</strong>
                                <span
                                    v-for="theme in selectedAnime.themes"
                                    class="inline-block bg-gray-300 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2"
                                >
                                    {{ theme.name }}
                                </span>
                            </p>
                            <p>
                                <strong>Продолжительность серии:</strong>
                                {{ selectedAnime.duration }}
                            </p>
                            <p>
                                <strong>Рейтинг:</strong>
                                {{ selectedAnime.rating }}
                            </p>
                        </div>
                    </article>
                </div>

                <div v-if="selectedAnime.trailer.embed_url" class="mt-8">
                    <h2 class="text-2xl font-semibold text-primary mb-2">
                        Трейлер
                    </h2>
                    <iframe
                        :src="selectedAnime.trailer.embed_url"
                        class="w-full aspect-video rounded-lg shadow-md"
                        frameborder="0"
                        allowfullscreen
                    ></iframe>
                </div>

                <article v-if="selectedAnime.synopsis" class="mt-6">
                    <h2 class="text-2xl font-semibold text-primary mb-2">
                        Описание
                    </h2>
                    <p class="text-gray-700 leading-relaxed">
                        {{ selectedAnime.synopsis }}
                    </p>
                </article>

                <div v-if="relatedAnime.length" class="mt-6">
                    <h2 class="text-2xl font-semibold">Связанные тайтлы</h2>
                    <div class="flex flex-wrap gap-4">
                        <RouterLink
                            v-for="entry in relatedAnime"
                            :to="`/anime/${entry.mal_id}`"
                            class="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md transition w-48 text-center"
                        >
                            <span class="text-blue-500 font-semibold">
                                {{ entry.name }}
                            </span>
                        </RouterLink>
                    </div>
                </div>
            </div>

            <section v-else class="flex justify-center min-h-screen">
                <Loading></Loading>
            </section>
        </ContentTemplate>
    </div>
</template>
