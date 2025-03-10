<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";

const { showFilters } = defineProps<{ showFilters: boolean }>();
const selectedType = ref<string>("");
const type = ref<string>("");
const selectedYear = ref<number>(undefined);
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
      <select class="border rounded-lg p-2 w-full mb-3" v-model="type">
        <option value="">Все</option>
        <option value="&tv">TV</option>
        <option value="&movie">Фильм</option>
        <option value="&ova">OVA</option>
        <option value="&special">Спецвыпуск</option>
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
      />

      <button
        class="w-full bg-first text-white p-2 rounded-lg hover:bg-first/80 transition"
        @click="emit('apply')"
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
