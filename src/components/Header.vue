<script setup>
import { RouterLink } from "vue-router";
import Logo from "@/components/SVG/Logo.vue";
import MovingBtn from "@/components/MovingBtn.vue";
</script>

<template>
  <header class="bg-white border-b-2 border-primary-500/10 shadow-md">
    <nav
      class="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between gap-6"
    >
      <RouterLink to="/" class="flex items-center gap-3 group">
        <Logo class="size-10 fill-primary-500" />
        <h1 class="font-logo text-primary-500 text-2xl tracking-tight">
          OTAKU<span class="text-black font-light">NOTES</span>
        </h1>
      </RouterLink>

      <div class="flex items-center gap-4 flex-1 justify-center">
        <MovingBtn link="/">Главная</MovingBtn>
        <MovingBtn link="/collections" :exact="false">Подборки</MovingBtn>
        <MovingBtn link="/my-reviews">Обзоры</MovingBtn>
        <MovingBtn link="/my-list">Список</MovingBtn>
      </div>

      <div class="size-10 rounded-full bg-primary-500"></div>
    </nav>
  </header>
</template>
