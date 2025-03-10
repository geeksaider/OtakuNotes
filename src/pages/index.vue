<script setup lang="ts">
import { useAnime } from "@/composables/useAnime";
import Header from "@/components/Header.vue";
import MainField from "@/components/MainField.vue";
import SearchInput from "@/components/SearchInput.vue";
import AnimeBanner from "@/components/AnimeBanner.vue";
import Pagination from "@/components/Pagination.vue";
import FilterList from "@/components/FilterList.vue";
import FilterButton from "@/components/FilterButton.vue";
import ContentTemplate from "@/components/ContentTemplate.vue";

const {
    animeList,
    loading,
    query,
    currentPage,
    lastPage,
    showFilters,
    gridColsNum,
    changePage,
    apply,
} = useAnime();
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
                    <div class="relative">
                        <FilterButton
                            @mousedown.stop
                            @click="showFilters = !showFilters"
                            :active="showFilters"
                        />
                        <FilterList
                            :showFilters="showFilters"
                            @mousedown.stop
                            @apply="apply"
                        />
                    </div>
                </section>

                <Pagination
                    v-if="animeList.length > 0 && query != ''"
                    :currentPage="currentPage"
                    :lastPage="lastPage"
                    @pageChange="changePage"
                />

                <MainField v-if="query == ''" />

                <Transition name="fade">
                    <div
                        v-if="!loading && query != ''"
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
                    v-if="loading && query != ''"
                    class="flex justify-center min-h-screen"
                >
                    <svg
                        class="mr-3 -ml-1 size-9 animate-spin fill-third"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="12"
                        ></circle>
                        <path
                            class="opacity-45"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </section>

                <Pagination
                    v-if="animeList.length > 0 && query != '' && !loading"
                    :currentPage="currentPage"
                    :lastPage="lastPage"
                    @pageChange="changePage"
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
