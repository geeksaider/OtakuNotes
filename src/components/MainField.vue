<script setup>
import SearchInput from "./SearchInput.vue";
import TextHeader from "./TextHeader.vue";
import PresentBanner from "./PresentBanner.vue";
import AnimeBanner from "@/components/AnimeBanner.vue";
import Button from "@/components/Button.vue";
</script>

<template>
  <div class="min-h-screen max-w-[1200px] mx-auto pt-12 flex flex-col gap-16">
    <SearchInput class="justify-center"></SearchInput>
    <article class="flex flex-col gap-5">
      <TextHeader>Добро пожаловать в OtakuNotes</TextHeader>
      <span class="text-center">Простой аниме-блокнот без лишних функций!</span>
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
          >Создавайте персонализированные заметки для каждого аниме, дополняя их
          своими мыслями, оценками и памятными цитатами.</template
        >
      </PresentBanner>
    </div>
    <Button></Button>
  </div>
</template>
