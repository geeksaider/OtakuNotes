<script setup lang="ts">
import { watch, ref, onMounted } from "vue";
import { useApi } from "@/composables/useAPI";
import type { Anime } from "@/composables/anime";
import type { Filters } from "@/composables/filters";


import AnimeBanner from "@/components/AnimeBanner.vue";
import Pagination from "@/components/Pagination.vue";
import FiltersField from "@/components/FiltersField.vue";
import ContentTemplate from "@/components/ContentTemplate.vue";
import Loading from "@/components/Loading.vue";

const isLoading = ref<boolean>(false);
const animeList = ref<Anime[]>([]);
const totalPages = ref<number>(25);
const currentPage = ref<number>(1);
const showFilters = ref<boolean>(false);
const filterPosition = ref<string>('default')

const param = ref<Filters>({
    type: undefined,
    age: undefined,
    filter: undefined
});

const applyFilters = (selectedFilters: Filters) => {
    Object.assign(param.value, selectedFilters);
    showFilters.value = false;
};

const lastPagination = (page: number) => {
    window.scrollTo({ top: 100, behavior: "smooth" });
    currentPage.value = page;
};

watch(
    [param],
    () => {
        currentPage.value = 1;
    },
    { deep: true }
);

watch(
    [param, currentPage],
    () => {
        useApi<Anime[]>(
            "/top/anime",
            {
                queryParams: {
                    sfw: param.value.age == "rx" ? false : true,
                    page: currentPage.value,
                    rating: param.value.age ? param.value.age : "",
                    type: param.value.type ? param.value.type : "",
                    filter: param.value.filter ? param.value.filter : "",
                    limit: 24,
                },
            },
            isLoading
        ).then(({ data, body }) => {
            animeList.value = data;
            animeList.value.length <= 0 ? filterPosition.value = 'center' : 'default';
            totalPages.value = body.pagination.last_visible_page > 25 ? 25 : body.pagination.last_visible_page
            totalPages.value == 1 ? filterPosition.value = 'center' : 'default';
        });
    },
    { deep: true, immediate: true }
);


</script>

<template>
    <div class="min-h-[101vh] text-third flex flex-col" @mousedown="showFilters = false; showSort = false">
        <ContentTemplate class="bg-background flex-grow pb-20">
            <div class="pt-12 max-w-[1200px] mx-auto flex flex-col gap-16">
                <section class="flex gap-2 w-fit mx-auto justify-center items-center">

                    <Pagination :currentPage="currentPage" :totalPages="totalPages"
                        @pageChange="(page) => (currentPage = page)" />
                    <FiltersField :is-active="showFilters" :filters-list="param" :position="filterPosition"
                        @mousedown.stop @update-active="showFilters = !showFilters" @apply="applyFilters">
                    </FiltersField>
                </section>

                <Transition name="fade">
                    <div v-if="!isLoading" class="grid gap-12 justify-center mx-auto min-h-screen">
                        <div class="grid grid-cols-4 gap-16">
                            <AnimeBanner v-for="anime in animeList" :selected-anime="anime" />
                        </div>
                    </div>
                </Transition>

                <section v-if="isLoading" class="flex justify-center min-h-screen">
                    <Loading></Loading>
                </section>

                <Pagination v-if="animeList.length > 0" :currentPage="currentPage" :totalPages="totalPages" :class="isLoading
                    ? 'opacity-0 transition-all duration-300'
                    : 'opacity-100'
                    " @pageChange="lastPagination" />
            </div>
        </ContentTemplate>
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
