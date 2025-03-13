<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useCollections } from "@/composables/useCollections";
import { usePagination } from "@/composables/usePagination";
import { useFilters } from "@/composables/useFilters";
import { useGrid } from "@/composables/useGrid";

import Header from "@/components/Header.vue";
import MainField from "@/components/MainField.vue";
import SearchInput from "@/components/SearchInput.vue";
import AnimeBanner from "@/components/AnimeBanner.vue";
import Pagination from "@/components/Pagination.vue";
import FilterList from "@/components/FilterList.vue";
import FilterButton from "@/components/FilterButton.vue";
import ContentTemplate from "@/components/ContentTemplate.vue";
import Loading from "@/components/Loading.vue";

const { showFilters, param, safetySearch, apply } = useFilters();
const { animeList, loading, lastPage, fetchCollections, query } = useCollections(
  safetySearch
);
const { currentPage, changePage } = usePagination(
  query,
  param,
  fetchCollections,
  lastPage
);
const { gridColsNum } = useGrid();

onMounted(() => {
  fetchCollections("search");
});


watch([query, param], ([value, param]) => {
  fetchCollections("search", {currentQuery: value, param: param});
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
            <div v-for="n in gridColsNum" class="flex flex-col gap-16">
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
          <Loading></Loading>
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
