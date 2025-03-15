<script setup lang="ts">
import { defineEmits, reactive, defineProps } from "vue";
import Filter from "./SVG/Filter.vue";
import type { Filters } from "@/composables/filters";

interface Props {
    isActive: boolean;
}

const { isActive } = defineProps<Props>();
const emit = defineEmits(["apply", "updateActive"]);
const selectedFilters = reactive<Filters>({
    type: undefined,
    age: undefined,
    year: undefined,
    minRating: undefined,
});

const validateSelectedYear = () => {
    if (selectedFilters.year)
        selectedFilters.year = Math.max(
            Math.min(selectedFilters.year, new Date().getFullYear() + 100),
            1963
        );
};

const submit = () => emit("apply", selectedFilters);
</script>

<template>
    <section class="relative">
        <button
            id="filter-button"
            class="flex h-11 w-11 items-center justify-center rounded-full ring-2 shadow-md hover:bg-first/50 transition-all"
            :class="isActive ? ' ring-second' : ' bg-white  ring-first'"
            @click="$emit('updateActive')"
        >
            <Filter class="fill-second"></Filter>
        </button>

        <Transition name="change">
            <form
                v-if="isActive"
                class="absolute top-14 right-0 bg-white p-6 rounded-lg shadow-lg w-[300px] z-50"
                @submit.prevent="submit"
            >
                <h2 class="text-lg font-bold mb-3">Фильтры</h2>

                <label class="block font-bold text-sm">Тип:</label>
                <select
                    class="border rounded-lg p-2 w-full mb-3"
                    v-model="selectedFilters.type"
                >
                    <option :value="undefined">Все</option>
                    <option value="tv">TV</option>
                    <option value="movie">Фильм</option>
                    <option value="ova">OVA</option>
                    <option value="special">Спецвыпуск</option>
                </select>

                <label class="block font-bold text-sm">Возраст:</label>
                <select
                    class="border rounded-lg p-2 w-full mb-3"
                    v-model="selectedFilters.age"
                >
                    <option :value="undefined">Все</option>
                    <option value="g">G - All Ages</option>
                    <option value="pg">PG - Дети</option>
                    <option value="pg13">PG-13 - Подростки > 13</option>
                    <option value="r17">R - 17+</option>
                    <option value="r">R+ - Mild Nudity</option>
                    <option value="rx">Rx - Hentai</option>
                </select>

                <label class="block font-bold text-sm">Год:</label>
                <input
                    type="number"
                    class="border rounded-lg p-2 w-full mb-3"
                    placeholder="Введите год"
                    min="1963"
                    :max="new Date().getFullYear() + 100"
                    @change="validateSelectedYear"
                    v-model="selectedFilters.year"
                />

                <label class="block font-bold text-sm">Мин. рейтинг:</label>
                <input
                    type="number"
                    class="border rounded-lg p-2 w-full mb-4"
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="От 0 до 10"
                    v-model="selectedFilters.minRating"
                />

                <button
                    type="submit"
                    class="w-full bg-second/90 text-white p-2 rounded-lg hover:bg-second transition"
                >
                    Применить
                </button>
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
