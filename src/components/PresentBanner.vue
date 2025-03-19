<script setup>
import { defineProps } from "vue";

const { link } = defineProps(["link"]);
</script>

<template>
  <section
    class="bg-white flex flex-col max-w-[50%] gap-2 py-7 px-10 rounded-2xl shadow-xl"
  >
    <img :src="link" alt="" class="size-36 text-left rounded-xl mx-auto" />
    <h1 class="text-black text-2xl font-bold text-center">
      <slot name="header"></slot>
    </h1>
    <p class="text-center">
      <slot name="description"> </slot>
    </p>
  </section>
</template>
