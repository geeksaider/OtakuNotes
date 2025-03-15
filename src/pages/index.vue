<script setup lang="ts">
import { watch, ref } from "vue";
import { useApi } from "@/composables/useAPI";
import type { Anime } from "@/composables/anime";
import { useGrid } from "@/composables/useGrid";

import Header from "@/components/Header.vue";
import MainField from "@/components/MainField.vue";
import SearchInput from "@/components/SearchInput.vue";
import AnimeBanner from "@/components/AnimeBanner.vue";
import Pagination from "@/components/Pagination.vue";
import FiltersField from "@/components/FiltersField.vue";
import ContentTemplate from "@/components/ContentTemplate.vue";
import Loading from "@/components/Loading.vue";

const query = ref<string>("");
const isLoading = ref<boolean>(false);
const animeList = ref<Anime[]>([]);
const totalPages = ref<number>(0);
const { gridColsNum } = useGrid();
const currentPage = ref<number>(1);
const showFilters = ref<boolean>(false);
const param = ref({});

watch([query, param, showFilters], () => {
    currentPage.value = 1;
});

watch([query, param, currentPage], () => {
    window.scrollTo({ top: 100, behavior: "smooth" });
    useApi<Anime[]>(
        "/anime",
        {
            queryParams: {
                q: query.value,
                sfw: param.value.age == "rx" ? false : true,
                page: currentPage.value,
                rating: param.value.age ? param.value.age : "",
                start_date: param.value.year ? `${param.value.year}-01-01` : "",
                end_date: param.value.year ? `${param.value.year}-12-31` : "",
                min_score: param.value.minRating ? param.value.minRating : "",
            },
        },
        isLoading
    ).then(({ data, body }) => {
        animeList.value = data;
        totalPages.value = body.pagination.last_visible_page;
    });
});
</script>

<template>
    <div
        class="min-h-[101vh] text-third flex flex-col"
        @mousedown="showFilters = false"
    >
        <Header />
        <ContentTemplate class="bg-background flex-grow pb-20">
            <div class="pt-12 max-w-[1200px] mx-auto flex flex-col gap-16">
                <section class="flex gap-2 justify-center items-center">
                    <SearchInput class="justify-center" v-model="query" />
                    <FiltersField
                        :is-active="showFilters"
                        @mousedown.stop
                        @update-active="showFilters = !showFilters"
                        @apply="
                            (selectedFilters) => {
                                param = selectedFilters;
                                showFilters = false;
                            }
                        "
                    ></FiltersField>
                </section>

                <Pagination
                    v-if="animeList.length > 0 && query != ''"
                    :currentPage="currentPage"
                    :totalPages="totalPages"
                    @pageChange="(page) => (currentPage = page)"
                />

                <MainField v-if="query == ''" />

                <Transition name="fade">
                    <div
                        v-if="!isLoading && query != ''"
                        class="grid gap-12 justify-center mx-auto min-h-screen"
                        :style="{
                            gridTemplateColumns: `repeat(${gridColsNum}, minmax(0, 1fr))`,
                        }"
                    >
                        <div
                            v-for="n in gridColsNum"
                            class="flex flex-col gap-16"
                        >
                            <AnimeBanner
                                v-for="anime in animeList.filter(
                                    (_, i) => (i % gridColsNum) + 1 == n
                                )"
                                :selected-anime="anime"
                            />
                        </div>
                    </div>
                </Transition>

                <section
                    v-if="isLoading && query != ''"
                    class="flex justify-center min-h-screen"
                >
                    <Loading></Loading>
                </section>

                <Pagination
                    v-if="animeList.length > 0 && query != '' && !isLoading"
                    :currentPage="currentPage"
                    :totalPages="totalPages"
                    @pageChange="(page) => (currentPage = page)"
                />
            </div>
        </ContentTemplate>
        <Header />
    </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
