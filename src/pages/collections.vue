<!-- <script setup lang="ts">
import ContentTemplate from "@/components/ContentTemplate.vue";
import Header from "@/components/Header.vue";
import CollectionsMoving from "@/components/collectionsMoving.vue";
</script>

<template>
    <div class="min-h-[101vh] text-third flex flex-col font-primary">
        <Header />
        <ContentTemplate>
            <div class="pt-12 max-w-[1200px] mx-auto flex flex-col gap-12">
                <div class="flex gap-16 justify-center">
                    <CollectionsMoving link="/collections"
                        >Рекоменадции</CollectionsMoving
                    >
                    <CollectionsMoving link="/collections/all-time"
                        >Топ за все время</CollectionsMoving
                    >
                    <CollectionsMoving link="/collections/season-time"
                        >Топ сезона</CollectionsMoving
                    >
                </div>
                <router-view class="flex"></router-view>
            </div>
        </ContentTemplate>
        <Header />
    </div>
</template> -->

<script setup lang="ts">
import ContentTemplate from "@/components/ContentTemplate.vue";
import Header from "@/components/Header.vue";
import CollectionsMoving from "@/components/collectionsMoving.vue";
</script>

<template>
    <div
        class="min-h-screen text-third flex flex-col font-primary bg-background"
    >
        <Header />

        <ContentTemplate class="flex-grow">
            <div class="pt-8 pb-24 max-w-6xl mx-auto">
                <nav class="flex flex-col mb-4 border-b border-second/10 pb-8">
                    <div class="max-w-3xl space-y-4">
                        <h2 class="text-2xl font-semibold text-second/90">
                            Подборки коллекций
                        </h2>
                        <div class="flex gap-6 -ml-3.5">
                            <CollectionsMoving
                                link="/collections"
                                class="hover:bg-second/5 px-4 py-2 rounded-lg"
                            >
                                Рекомендации
                            </CollectionsMoving>

                            <CollectionsMoving
                                link="/collections/all-time"
                                class="hover:bg-second/5 px-4 py-2 rounded-lg"
                            >
                                Исторический топ
                            </CollectionsMoving>

                            <CollectionsMoving
                                link="/collections/season-time"
                                class="hover:bg-second/5 px-4 py-2 rounded-lg"
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
