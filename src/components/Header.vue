<script setup>
import Logo from "./SVG/logo.vue";
import MovingBtn from "@/components/MovingBtn.vue";
</script>

<template>
    <section
        class="flex max-w-[1200px] mx-auto py-3 justify-around items-center"
    >
        <div class="flex gap-2 items-center">
            <Logo class="size-14 fill-third"></Logo>
            <h1 class="text-sm font-logo">
                <span class="text-xl font-semibold">Otaku</span><br />Notes
            </h1>
        </div>
        <div class="flex gap-5 font-primary text-md">
            <MovingBtn>Главная</MovingBtn>
            <MovingBtn>Мой список</MovingBtn>
            <MovingBtn>Обзоры</MovingBtn>
        </div>
        <div></div>
    </section>
</template>
