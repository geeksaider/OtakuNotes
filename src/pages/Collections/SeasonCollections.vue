<script setup lang="ts">
import { watch, ref } from "vue";
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
const filters = ref<Filters>({});

const getPath = () => {
  if (filters.value.seasonYear || filters.value.season) {
    return `/seasons/${filters.value.seasonYear}/${filters.value.season}`;
  } else {
    return `/seasons/now`;
  }
};

const getApiResponse = () => {
  useApi<Anime[]>(
    getPath(),
    {
      queryParams: {
        sfw: filters.value.safety ? filters.value.safety : true,
        page: currentPage.value,
        filter: filters.value.type ? filters.value.type : "",
        limit: 24,
      },
    },
    isLoading
  ).then(({ data, body }) => {
    animeList.value = data;
    totalPages.value =
      body.pagination.last_visible_page > 25
        ? 25
        : body.pagination.last_visible_page;
  });
};

const resetPage = () => {
  if (currentPage.value == 1) getApiResponse();
  currentPage.value = 1;
};

watch(currentPage, getApiResponse, { immediate: true });
</script>

<template>
  <div class="min-h-[101vh] text-black flex flex-col">
    <ContentTemplate class="bg-background flex-grow pb-20">
      <div class="pt-12 max-w-[1200px] mx-auto flex flex-col gap-16">
        <section class="flex flex-col gap-16">
          <Pagination
            :totalPages="totalPages"
            :is-loading="isLoading"
            v-model="currentPage"
          >
            <template v-slot:filter>
              <FiltersField
                v-model="filters"
                variant="season"
                :class-name="
                  totalPages == 1
                    ? 'left-1/2 transform -translate-x-1/2'
                    : 'right-0'
                "
                @apply="resetPage"
              />
            </template>
            <Transition name="fade">
              <div
                v-if="!isLoading"
                class="grid gap-12 justify-center mx-auto min-h-screen"
              >
                <div class="grid grid-cols-4 gap-16">
                  <AnimeBanner
                    v-for="anime in animeList"
                    :selected-anime="anime"
                  />
                </div>
              </div>
            </Transition>
          </Pagination>
        </section>

        <section v-if="isLoading" class="flex justify-center min-h-screen">
          <Loading></Loading>
        </section>
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
