<script setup>
import { RouterLink } from "vue-router";
import Logo from "@/components/SVG/Logo.vue";
import MovingBtn from "@/components/MovingBtn.vue";
</script>

<template>
    <section
        class="flex max-w-[1200px] w-full mx-auto py-3 justify-around items-center"
    >
        <RouterLink class="flex gap-2 items-center" to="/">
            <Logo class="size-14 fill-third cursor-pointer"></Logo>
            <h1 class="text-sm font-logo cursor-pointer">
                <span class="text-xl font-semibold">Otaku</span><br />Notes
            </h1>
        </RouterLink>
        <div class="flex gap-5 font-primary text-md">
            <MovingBtn link="/">Главная</MovingBtn>
            <MovingBtn link="/collections">Подборки</MovingBtn>
            <MovingBtn link="/my-reviews">Мои обзоры</MovingBtn>
            <MovingBtn link="/my-list">Мой список</MovingBtn>
        </div>
        <div class="size-10 rounded-full bg-third"></div>
    </section>
</template>
