<script setup lang="ts">
import { defineEmits, defineModel, defineProps, onMounted, ref } from "vue";
import Filter from "./SVG/Filter.vue";
import Reset from "./SVG/Reset.vue";
import type { Filters } from "@/composables/filters";

// center: "left-1/2 transform -translate-x-1/2",
// left: "left-0",
// right: "right-0",

type Variant = "search" | "collections";

interface Props {
  variant?: Variant;
  className?: string;
}

const { variant = "search", className = "right-0" } = defineProps<Props>();
const filters = defineModel<Filters>({ default: {} });
const isActive = ref<boolean>(false);
const emit = defineEmits(["apply"]);

const submit = () => {
  isActive.value = false;
  emit("apply");
};

filters.value = {
  search: {
    type: undefined,
    age: undefined,
    year: undefined,
    minRating: undefined,
  },
  collections: {
    type: undefined,
    age: undefined,
    filter: undefined,
  },
}[variant];

const validateSelectedYear = () => {
  if (filters.value.year)
    filters.value.year = Math.max(
      Math.min(filters.value.year, new Date().getFullYear() + 100),
      1963
    );
};

const updateActive = () => {
  isActive.value = !isActive.value;
};

const reset = () => {
  for (let key in filters.value) {
    filters.value[key] = undefined;
  }
  submit();
};

onMounted(() => {
  window.onclick = () => (isActive.value = false);
  document.onkeydown = (e) => {
    e.key == "Escape" && (isActive.value = false);
  };
});
</script>

<template>
  <section class="relative" @click.stop>
    <button
      id="filter-button"
      class="flex h-11 w-11 items-center justify-center rounded-full ring-2 shadow-md hover:bg-primary-300/50 transition-all"
      :class="isActive ? ' ring-primary-500' : ' bg-white  ring-primary-300'"
      @click="updateActive"
    >
      <Filter class="fill-primary-500"></Filter>
    </button>

    <Transition name="change">
      <form
        v-if="isActive"
        class="absolute top-16 bg-white p-6 rounded-lg shadow-lg w-[300px] z-50"
        :class="className"
        @submit.prevent="submit"
      >
        <h2 class="text-lg font-bold mb-3">Фильтры</h2>

        <div v-if="'type' in filters">
          <label class="font-bold text-sm">Тип:</label>
          <select
            class="border rounded-lg p-2 w-full mb-3"
            v-model="filters.type"
          >
            <option :value="undefined">Все</option>
            <option value="tv">TV</option>
            <option value="movie">Фильм</option>
            <option value="ova">OVA</option>
            <option value="special">Спецвыпуск</option>
          </select>
        </div>

        <div v-if="'age' in filters">
          <label class="font-bold text-sm">Возраст:</label>
          <select
            class="border rounded-lg p-2 w-full mb-3"
            v-model="filters.age"
          >
            <option :value="undefined">Все</option>
            <option value="g">G - All Ages</option>
            <option value="pg">PG - Дети</option>
            <option value="pg13">PG-13 - Подростки > 13</option>
            <option value="r17">R - 17+</option>
            <option value="r">R+ - Mild Nudity</option>
            <option value="rx">Rx - Hentai</option>
          </select>
        </div>

        <div v-if="'filter' in filters">
          <label class="font-bold text-sm">Фильтрация:</label>
          <select
            class="border rounded-lg p-2 w-full mb-3"
            v-model="filters.filter"
          >
            <option :value="undefined" selected>Все</option>
            <option value="airing">Выходят</option>
            <option value="upcoming">Ждем всей деревней</option>
            <option value="bypopularity">По популярности</option>
            <option value="favorite">Любимки</option>
          </select>
        </div>

        <div v-if="'year' in filters">
          <label class="font-bold text-sm">Год:</label>
          <input
            type="number"
            class="border rounded-lg p-2 w-full mb-3"
            placeholder="Введите год"
            min="1963"
            :max="new Date().getFullYear() + 100"
            @change="validateSelectedYear"
            v-model="filters.year"
          />
        </div>

        <div v-if="'minRating' in filters">
          <label class="font-bold text-sm">Мин. рейтинг:</label>
          <input
            type="number"
            class="border rounded-lg p-2 w-full"
            min="0"
            max="10"
            step="0.1"
            placeholder="От 0 до 10"
            v-model="filters.minRating"
          />
        </div>

        <div class="flex justify-center items-center gap-3 mt-4">
          <button
            type="submit"
            class="basis-[85%] bg-primary-500/90 text-white p-2 rounded-lg hover:bg-primary-500 transition"
          >
            Применить
          </button>

          <Reset @click="reset()" class="fill-primary-500 my-auto" />
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
