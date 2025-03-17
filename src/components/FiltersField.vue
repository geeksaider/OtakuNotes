<script setup lang="ts">
import { defineEmits, reactive, defineProps } from "vue";
import Filter from "./SVG/Filter.vue";
import Reset from "./SVG/Reset.vue"
import type { Filters } from "@/composables/filters";

interface Props {
    isActive: boolean;
    filtersList: Filters;
    position: string;
}

interface Position {
    center: string,
    left: string,
    right: string
    default: string
}

const { isActive, filtersList, position = 'default' } = defineProps<Props>();
const emit = defineEmits(["apply", "updateActive"]);
const selectedFilters = reactive<Filters>({
    ...filtersList
});

const validateSelectedYear = () => {
    if (selectedFilters.year)
        selectedFilters.year = Math.max(
            Math.min(selectedFilters.year, new Date().getFullYear() + 100),
            1963
        );
};

const submit = () => emit("apply", selectedFilters);

const positionStyle = <Position>{
    center: 'left-1/2 transform -translate-x-1/2',
    left: 'left-0',
    right: 'right-0',
    default: 'right-0',
}
</script>

<template>
    <section class="relative">
        <button id="filter-button"
            class="flex h-11 w-11 items-center justify-center rounded-full ring-2 shadow-md hover:bg-first/50 transition-all"
            :class="isActive ? ' ring-second' : ' bg-white  ring-first'" @click="$emit('updateActive')">
            <Filter class="fill-second"></Filter>
        </button>

        <Transition name="change">
            <form v-if="isActive" class="absolute top-16  bg-white p-6 rounded-lg shadow-lg w-[300px] z-50"
                :class="positionStyle[position]" @submit.prevent="submit">
                <h2 class="text-lg font-bold mb-3">Фильтры</h2>

                <div v-if="'type' in filtersList">
                    <label class="font-bold text-sm">Тип:</label>
                    <select class="border rounded-lg p-2 w-full mb-3" v-model="selectedFilters.type">
                        <option :value="undefined">Все</option>
                        <option value="tv">TV</option>
                        <option value="movie">Фильм</option>
                        <option value="ova">OVA</option>
                        <option value="special">Спецвыпуск</option>
                    </select>
                </div>

                <div v-if="'age' in filtersList">
                    <label class="font-bold text-sm">Возраст:</label>
                    <select class="border rounded-lg p-2 w-full mb-3" v-model="selectedFilters.age">
                        <option :value="undefined">Все</option>
                        <option value="g">G - All Ages</option>
                        <option value="pg">PG - Дети</option>
                        <option value="pg13">PG-13 - Подростки > 13</option>
                        <option value="r17">R - 17+</option>
                        <option value="r">R+ - Mild Nudity</option>
                        <option value="rx">Rx - Hentai</option>
                    </select>
                </div>

                <div v-if="'filter' in filtersList">
                    <label class="font-bold text-sm">Фильтрация:</label>
                    <select class="border rounded-lg p-2 w-full mb-3" v-model="selectedFilters.filter">
                        <option :value="undefined" selected>Все</option>
                        <option value="airing">Выходят</option>
                        <option value="upcoming">Ждем всей деревней</option>
                        <option value="bypopularity">По популярности</option>
                        <option value="favorite">Любимки</option>
                    </select>
                </div>

                <div v-if="'year' in filtersList">
                    <label class="font-bold text-sm">Год:</label>
                    <input type="number" class="border rounded-lg p-2 w-full mb-3" placeholder="Введите год" min="1963"
                        :max="new Date().getFullYear() + 100" @change="validateSelectedYear"
                        v-model="selectedFilters.year" />
                </div>

                <div v-if="'minRating' in filtersList">
                    <label class="font-bold text-sm">Мин. рейтинг:</label>
                    <input type="number" class="border rounded-lg p-2 w-full " min="0" max="10" step="0.1"
                        placeholder="От 0 до 10" v-model="selectedFilters.minRating" />
                </div>

                <div class="flex justify-center items-center gap-3 mt-4">
                    <button type="submit"
                        class=" basis-[85%] bg-second/90 text-white p-2 rounded-lg  hover:bg-second transition">
                        Применить
                    </button>

                    <Reset @click="reset" class="fill-second my-auto " />

                </div>
            </form>
        </Transition>
    </section>
</template>

<style>
.change-enter-active,
.change-leave-active {
    transition: opacity 0.5s ease;
}

.change-enter-from,
.change-leave-to {
    opacity: 0;
}
</style>
