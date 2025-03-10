<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";

const { showFilters } = defineProps<{ showFilters: boolean }>();
const selectedType = ref<string | undefined>(undefined);
const selectedYear = ref<number | undefined>(undefined);
const selectedMinRating = ref<number | undefined>(undefined);
const selectedAge = ref<string | undefined>(undefined);
const emit = defineEmits(["apply"]);

const validateSelectedYear = () => {
    if (selectedYear.value)
        selectedYear.value = Math.max(
            Math.min(selectedYear.value, new Date().getFullYear() + 100),
            1963
        );
};
</script>

<template>
    <Transition name="change">
        <div
            v-if="showFilters"
            id="filter-modal"
            class="absolute top-14 right-0 bg-white p-6 rounded-lg shadow-lg w-[300px] z-50"
        >
            <h2 class="text-lg font-bold mb-3">Фильтры</h2>

            <label class="block font-bold text-sm">Тип:</label>
            <select
                class="border rounded-lg p-2 w-full mb-3"
                v-model="selectedType"
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
                v-model="selectedAge"
            >
                <option :value="undefined">Все</option>
                <option value="g">G - All Ages</option>
                <option value="pg">PG - Дети</option>
                <option value="pg13 ">PG-13 - Подростки > 13</option>
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
                :max="new Date().getFullYear()"
                @change="validateSelectedYear"
                v-model="selectedYear"
            />

            <label class="block font-bold text-sm">Мин. рейтинг:</label>
            <input
                type="number"
                class="border rounded-lg p-2 w-full mb-4"
                min="0"
                max="10"
                step="0.1"
                placeholder="От 0 до 10"
                v-model="selectedMinRating"
            />

            <button
                class="w-full bg-second/90 text-white p-2 rounded-lg hover:bg-second transition"
                @click="
                    emit(
                        'apply',
                        selectedType,
                        selectedAge,
                        selectedYear,
                        selectedMinRating
                    )
                "
            >
                Применить
            </button>
        </div>
    </Transition>
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
