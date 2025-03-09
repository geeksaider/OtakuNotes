<script setup>
import { defineModel } from "vue";
const query = defineModel();
</script>

<template>
    <input
        type="text "
        class="w-[800px] h-12 px-5 bg-white border-third border-1 rounded-full ring-inset ring-2 ring-first text-third/80 mx-auto focus:outline-none focus:ring-second transition-all duration-200"
        placeholder="Начните писать.."
        v-model="query"
    />
</template>
