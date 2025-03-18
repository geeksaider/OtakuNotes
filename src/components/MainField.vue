<script setup>
import TextHeader from "./TextHeader.vue";
import PresentBanner from "./PresentBanner.vue";
import Button from "@/components/Button.vue";
</script>

<template>
    <article class="flex flex-col gap-5">
        <TextHeader>Добро пожаловать в OtakuNotes</TextHeader>
        <span class="text-center"
            >Простой аниме-блокнот без лишних функций!</span
        >
    </article>
    <div class="flex gap-6">
        <PresentBanner link="writer.svg">
            <template #header>Отмечай просмотренное</template>
            <template #description
                >Ведите подробный учет всех аниме-сериалов, которые вы смотрели,
                планируете посмотреть или смотрите в настоящее время.</template
            >
        </PresentBanner>
        <PresentBanner link="notes.svg">
            <template #header>Сортируй как нравится!</template>
            <template #description
                >Создавайте персонализированные заметки для каждого аниме,
                дополняя их своими мыслями, оценками и памятными
                цитатами.</template
            >
        </PresentBanner>
    </div>
    <Button></Button>
</template>
