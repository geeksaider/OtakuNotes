<script setup lang="ts">
import { ref, watch, Transition, onMounted } from "vue";
import Header from "@/components/Header.vue";
import MainField from "@/components/MainField.vue";
import SearchInput from "@/components/SearchInput.vue";
import AnimeBanner from "@/components/AnimeBanner.vue";
import Pagination from "@/components/Pagination.vue";
import FilterList from "@/components/FilterList.vue";
import FilterButton from "@/components/FilterButton.vue";

interface Anime {
    score: number;
    type: string;
    year: number;
    titles: { type: string; title: string }[];
    images: {
        webp?: { image_url: string };
    };
}
const animeList = ref<Anime[]>([]);
const loading = ref<boolean>(false);
const query = ref<string>("");
const currentPage = ref<number>(1);
const lastPage = ref<number>(1);
const showFilters = ref<boolean>(false);
const param = ref<string | undefined>(undefined);
const gridColsNum = ref<number>(0);
const safetySearch = ref<boolean>(true);

function calcGridCols() {
    if (window.innerWidth > 1024) gridColsNum.value = 4;
    else if (window.innerWidth > 768) gridColsNum.value = 3;
    else gridColsNum.value = 2;
}

onMounted(() => {
    window.addEventListener("resize", calcGridCols);
    calcGridCols();
});

const fetchData = async (
    currentQuery: string,
    page: number = 1,
    param?: string
) => {
    if (!currentQuery) return;

    try {
        const response = await fetch(
            `https://api.jikan.moe/v4/anime?order_by=popularity&sort=desc&q=${currentQuery}&page=${page}${
                !param ? "" : param
            }&sfw=${safetySearch.value} `
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

let waitResponse: number | undefined = undefined;

watch([query, param], ([value, param]: (string | undefined)[]) => {
    loading.value = true;
    currentPage.value = 1;

    clearTimeout(waitResponse);

    if (waitResponse) {
        clearTimeout(waitResponse);
        waitResponse = setTimeout(async () => {
            await fetchData(value!, 1, param);
            waitResponse = undefined;
        }, 500);
    } else {
        fetchData(value!, 1, param);
    }
});

const changePage = (page: number) => {
    loading.value = true;
    window.scrollTo({
        top: 100,
        behavior: "smooth",
    });
    currentPage.value = page;
    if (waitResponse) {
        clearTimeout(waitResponse);
        waitResponse = undefined;
        waitResponse = setTimeout(async () => {
            await fetchData(query.value, page, param.value);
            waitResponse = undefined;
        }, 500);
    } else {
        fetchData(query.value, page, param.value);
    }
};

function apply(type?: string, age?: string, year?: number, minRating?: number) {
    age == "rx" ? (safetySearch.value = false) : (safetySearch.value = true);
    const filter = [
        type ? `&type=${type}` : "",
        age ? `&rating=${age}` : "",
        year ? `&start_date=${year}-01-01&end_date=${year}-12-31` : "",
        minRating ? `&min_score=${minRating}` : "",
    ];
    showFilters.value = false;

    param.value = filter.join("");
}
</script>

<template>
    <div
        class="min-h-[101vh] text-third flex flex-col"
        @mousedown="showFilters = false"
    >
        <Header />
        <div class="bg-background flex-grow pb-20">
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
        </div>
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
