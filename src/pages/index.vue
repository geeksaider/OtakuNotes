<script setup lang="ts">
import Header from "@/components/Header.vue";
import MainField from "@/components/MainField.vue";
import SearchInput from "@/components/SearchInput.vue";
import CardField from "@/components/CardField.vue";
import { ref } from "vue";

const query = ref<string>("");
</script>

<template>
  <div class="min-h-[101vh] text-third flex flex-col">
    <Header></Header>
    <div class="bg-background flex-grow">
      <div class="pt-12 max-w-[1200px] mx-auto flex flex-col gap-16">
        <SearchInput class="justify-center" v-model="query"></SearchInput>
        <MainField v-if="query == ''"></MainField>
        <CardField v-else :query="query"></CardField>
      </div>
    </div>
    <Header></Header>
  </div>
</template>
