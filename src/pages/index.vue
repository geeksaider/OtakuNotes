<script setup lang="ts">
import { watch, ref } from "vue";
import { useApi } from "@/composables/useAPI";
import type { Anime } from "@/composables/anime";
import type { Filters } from "@/composables/filters";

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
const currentPage = ref<number>(1);
const filters = ref<Filters>({});

const getApiResponse = () => {
  useApi<Anime[]>(
    "/anime",
    {
      queryParams: {
        q: query.value,
        sfw: filters.value.age == "rx" ? false : true,
        page: currentPage.value,
        rating: filters.value.age ? filters.value.age : "",
        type: filters.value.type ? filters.value.type : "",
        start_date: filters.value.year ? `${filters.value.year}-01-01` : "",
        end_date: filters.value.year ? `${filters.value.year}-12-31` : "",
        min_score: filters.value.minRating ? filters.value.minRating : "",
        limit: 24,
      },
    },
    isLoading
  ).then(({ data, body }) => {
    animeList.value = data;
    totalPages.value = body.pagination.last_visible_page;
  });
};

const resetPage = () => {
  if (currentPage.value == 1) getApiResponse();
  currentPage.value = 1;
};

watch(query, resetPage);

watch([query, currentPage], getApiResponse);
</script>

<template>
  <div class="min-h-[101vh] text-black flex flex-col font-primary">
    <Header />
    <ContentTemplate class="bg-background flex-grow pb-20">
      <div class="pt-12 max-w-[1200px] mx-auto flex flex-col gap-16">
        <section class="flex gap-2 justify-center items-center">
          <SearchInput class="justify-center" v-model="query" @mousedown.stop />
          <FiltersField v-model="filters" variant="search" @apply="resetPage" />
        </section>

        <MainField v-if="query == ''" />

        <section
          v-if="isLoading && query != '' && animeList.length == 0"
          class="flex justify-center min-h-screen"
        >
          <Loading />
        </section>

        <Pagination
          v-if="animeList.length > 0 && query != ''"
          :totalPages="totalPages"
          :is-loading="isLoading"
          v-model="currentPage"
        >
          <Transition name="fade">
            <div
              v-if="!isLoading && query != ''"
              class="grid grid-cols-4 gap-12 justify-center mx-auto min-h-screen"
            >
              <AnimeBanner v-for="anime in animeList" :selected-anime="anime" />
            </div>
          </Transition>
        </Pagination>
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
