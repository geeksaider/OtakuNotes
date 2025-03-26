<script setup lang="ts">
import ContentTemplate from "@/components/ContentTemplate.vue";
import Header from "@/components/Header.vue";
import CollectionsMoving from "@/components/collectionsMoving.vue";
</script>

<template>
  <div class="min-h-screen text-black flex flex-col font-primary bg-background">
    <Header />

    <ContentTemplate class="flex-grow">
      <div class="pt-8 pb-24 max-w-6xl mx-auto">
        <nav class="flex flex-col mb-4 border-b border-primary-500/10 pb-8">
          <div class="max-w-3xl space-y-4">
            <h2 class="text-2xl font-semibold text-primary-500/90">
              Подборки коллекций
            </h2>
            <div class="flex gap-6 -ml-3.5">
              <CollectionsMoving
                link="/collections"
                class="hover:bg-primary-500/5 px-4 py-2 rounded-lg"
              >
                Рекомендации
              </CollectionsMoving>

              <CollectionsMoving
                link="/collections/season-time"
                class="hover:bg-primary-500/5 px-4 py-2 rounded-lg"
              >
                Сезонный топ
              </CollectionsMoving>
            </div>
          </div>
        </nav>

        <router-view />
      </div>
    </ContentTemplate>
  </div>
</template>
