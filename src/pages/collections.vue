<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import ContentTemplate from "@/components/ContentTemplate.vue";
import Header from "@/components/Header.vue";
import SelectionCard from "@/components/SelectionCard.vue";
import Loading from "@/components/Loading.vue";
import collectionsMoving from "@/components/collectionsMoving.vue";

const collections = ref<
  { title: string; imageUrl: string; route: string; titleCount: number }[]
>([]);
const loading = ref<boolean>(true);
const TranslateSeason: string = {
  winter: "Зима",
  spring: "Весна",
  fall: "Осень",
  summer: "Лето",
};

const fetchCollections = async () => {
  try {
    const recommendationsResponse = await fetch(
      "https://api.jikan.moe/v4/recommendations/anime"
    );
    const topAnimeResponse = await fetch("https://api.jikan.moe/v4/top/anime");
    const nowSeasonResponse = await fetch(
      "https://api.jikan.moe/v4/seasons/now"
    );

    if (
      !topAnimeResponse.ok ||
      !nowSeasonResponse.ok ||
      !recommendationsResponse.ok
    )
      throw new Error("Ошибка сети");

    const topAnimeJson = await topAnimeResponse.json();
    const nowSeasonJson = await nowSeasonResponse.json();
    const recommendationsJson = await recommendationsResponse.json();

    collections.value = [
      {
        title: "Рекомендации от Otaku Notice",
        imageUrl: recommendationsJson.data[0].entry[0].images.webp.image_url,
        route: "/recommendations",
        titleCount: 200,
      },
      {
        title: "Топ всех лет",
        imageUrl: topAnimeJson.data[0].images.webp.image_url,
        route: "/top-anime",
        titleCount: topAnimeJson.pagination.items.total,
      },
      {
        title: "Топ сезона",
        imageUrl: nowSeasonJson.data[0].images.webp.image_url,
        route: "/current-season",
        titleCount: nowSeasonJson.pagination.items.total,
      },
    ];

    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 10; year--) {
      const seasons = ["winter", "spring", "summer", "fall"];
      for (const season of seasons) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const seasonResponse = await fetch(
          `https://api.jikan.moe/v4/seasons/${year}/${season}`
        );
        if (seasonResponse.ok) {
          const seasonJson = await seasonResponse.json();
          collections.value.push({
            title: `Сезон ${TranslateSeason[season]} ${year}`,
            imageUrl: seasonJson.data[0].images.webp.image_url,
            route: `/seasons/${year}/${season}`,
            titleCount: seasonJson.pagination.items.total,
          });
        }
      }
    }
  } catch (error) {
    console.warn("Ошибка при загрузке подборок:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCollections();
});
</script>

<template>
  <div class="min-h-[101vh] text-third flex flex-col">
    <Header />
    <ContentTemplate>
      <div class="pt-12 max-w-[1200px] mx-auto flex flex-col gap-16">
        <div class="flex gap-16 justify-center">
          <collectionsMoving link="/collections"
            >Рекоменадции</collectionsMoving
          >
          <collectionsMoving link="/collections/all-time"
            >Топ за все время</collectionsMoving
          >
          <collectionsMoving link="/collections/season-time"
            >Топ сезона</collectionsMoving
          >
        </div>

        <section v-if="loading" class="flex justify-center min-h-screen">
          <Loading></Loading>
        </section>
      </div>
      <router-views></router-views>
    </ContentTemplate>
    <Header />
  </div>
</template>
