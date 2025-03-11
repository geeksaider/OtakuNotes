<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
    title: string;
    imageUrl: string;
    route: string;
    titleCount: number;
}>();
</script>

<template>
    <section
        class="relative bg-white ring ring-first aspect-square w-72 justify-center flex rounded-lg cursor-pointer overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
    >
        <img
            :src="imageUrl"
            alt="Anime Collection"
            class="object-cover w-full h-full"
        />
        <div
            class="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center"
        >
            <h3 class="text-2xl font-extrabold text-white mb-2 text-center">
                {{ title }}
            </h3>
            <p class="text-lg text-white">{{ titleCount }} тайтлов</p>
        </div>
    </section>
</template>
