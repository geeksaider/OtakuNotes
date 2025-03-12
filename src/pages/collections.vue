<script setup lang="ts">
import ContentTemplate from "@/components/ContentTemplate.vue";
import Header from "@/components/Header.vue";
import CollectionsMoving from "@/components/collectionsMoving.vue";
</script>

<template>
    <div class="min-h-[101vh] text-third flex flex-col">
        <Header />
        <ContentTemplate>
            <div class="pt-12 max-w-[1200px] mx-auto flex flex-col gap-16">
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
</template>
