<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useCollections } from "@/composables/useAPI";
import { usePagination } from "@/composables/usePagination";
import { useFilters } from "@/composables/useFilters";

import AnimeBanner from "@/components/AnimeBanner.vue";
import Pagination from "@/components/Pagination.vue";
import FilterList from "@/components/FilterList.vue";
import FilterButton from "@/components/FilterButton.vue";
import Loading from "@/components/Loading.vue";

const { showFilters, param, safetySearch, apply } = useFilters();
const { animeList, loading, lastPage, fetchCollections } =
    useCollections(safetySearch);
const { currentPage, changePage } = usePagination(lastPage);

onMounted(() => {
    fetchCollections("top");
});

watch(currentPage, (currentPage) => {
    fetchCollections("top", {
        param: param.value,
        page: currentPage,
    });
});

watch(param, (param) => {
    fetchCollections("top", {
        param: param,
        page: currentPage.value,
    });
});
</script>

<template>
    <section class="flex gap-2 w-fit mx-auto justify-center items-center">
        <Pagination
            v-if="animeList.length > 0 && !loading"
            :currentPage="currentPage"
            :lastPage="lastPage"
            @pageChange="changePage"
        />
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
    <Transition name="fade">
        <div
            v-if="!loading"
            class="grid gap-12 grid-cols-4 justify-center mx-auto min-h-screen"
        >
            <AnimeBanner v-for="anime in animeList" :selected-anime="anime" />
        </div>
    </Transition>
    <section v-if="loading" class="flex justify-center min-h-screen">
        <Loading></Loading>
    </section>
    <Pagination
        v-if="animeList.length > 0 && !loading"
        :currentPage="currentPage"
        :lastPage="lastPage"
        @pageChange="changePage"
    />
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
