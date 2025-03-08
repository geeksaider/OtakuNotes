<script setup lang="ts">
import Header from "@/components/Header.vue";
import MainField from "@/components/MainField.vue";
import SearchInput from "@/components/SearchInput.vue";
import AnimeBanner from "@/components/AnimeBanner.vue";
import { ref, watch } from "vue";

const animeList = ref();
const loading = ref<boolean>(false);
const query = ref<string>("");

const fetchData = async (currentQuery: string) => {
    if (!currentQuery) return;

    try {
        const response = await fetch(
            `https://api.jikan.moe/v4/anime?q=${currentQuery}`
        );
        if (!response.ok) {
            throw new Error("Ошибка сети");
        }
        const json = await response.json();
        animeList.value = json.data;
    } catch (error) {
        console.warn("Ошибка при поиске:", error);
    } finally {
        loading.value = false;
    }
};

let updateTimer: number = 0;

watch(query, (value) => {
    loading.value = true;
    if (updateTimer) {
        clearTimeout(updateTimer);
    }
    updateTimer = setTimeout(() => {
        fetchData(value);
    }, 600);
});
</script>

<template>
    <div class="min-h-[101vh] text-third flex flex-col">
        <Header />
        <div class="bg-background flex-grow pb-20">
            <div class="pt-12 max-w-[1200px] mx-auto flex flex-col gap-16">
                <SearchInput class="justify-center" v-model="query" />
                <MainField v-if="query == ''" />

                <section class="grid grid-cols-4 gap-12" v-if="!loading">
                    <AnimeBanner
                        v-for="anime in animeList"
                        :selected-anime="anime"
                    />
                </section>
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
                            class="opacity-65"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </section>
            </div>
        </div>
        <Header />
    </div>
</template>
