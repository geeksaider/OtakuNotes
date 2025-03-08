<script setup lang="ts">
import Header from "@/components/Header.vue";
import MainField from "@/components/MainField.vue";
import SearchInput from "@/components/SearchInput.vue";
import AnimeBanner from "@/components/AnimeBanner.vue";
import Pagination from "@/components/Pagination.vue";
import { ref, watch, Transition } from "vue";

const animeList = ref([]);
const loading = ref<boolean>(false);
const query = ref<string>("");
const currentPage = ref<number>(1);
const lastPage = ref<number>(1);

const fetchData = async (currentQuery: string, page: number = 1) => {
    if (!currentQuery) return;

    try {
        const response = await fetch(
            `https://api.jikan.moe/v4/anime?q=${currentQuery}&page=${page}`
        );
        if (!response.ok) {
            throw new Error("Ошибка сети");
        }
        const json = await response.json();
        animeList.value = json.data;
        lastPage.value = json.pagination.last_visible_page;
    } catch (error) {
        console.warn("Ошибка при поиске:", error);
    } finally {
        loading.value = false;
    }
};

watch(query, (value: string) => {
    loading.value = true;
    currentPage.value = 1;
    fetchData(value, 1);
});

const changePage = (page: number) => {
    window.scrollTo({
        top: 100,
        left: 100,
        behavior: "smooth",
    });
    currentPage.value = page;
    fetchData(query.value, page);
};
</script>

<template>
    <div class="min-h-[101vh] text-third flex flex-col">
        <Header />
        <div class="bg-background flex-grow pb-20">
            <div class="pt-12 max-w-[1200px] mx-auto flex flex-col gap-16">
                <SearchInput class="justify-center" v-model="query" />

                <Pagination
                    v-if="animeList.length > 0"
                    :currentPage="currentPage"
                    :lastPage="lastPage"
                    @pageChange="changePage"
                />

                <MainField v-if="query == ''" />
                <Transition name="fade" v-if="!loading">
                    <div class="grid grid-cols-4 gap-12">
                        <AnimeBanner
                            v-for="anime in animeList"
                            :selected-anime="anime"
                            class="transition-all"
                        />
                    </div>
                </Transition>

                <section v-else class="flex justify-center items-center">
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
                    v-if="animeList.length > 0"
                    :currentPage="currentPage"
                    :lastPage="lastPage"
                    @pageChange="changePage"
                />
            </div>
        </div>
        <Header />
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition:
        transform 0.5s ease,
        opacity 0.5s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: scale(0.95);
}
</style>
