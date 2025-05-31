<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useApi } from "@/composables/useAPI";
import RatingBlock from "@/components/RatingBlock.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

interface Props {
  id: string;
  totalEpisodes?: number;
}

const { id, totalEpisodes } = defineProps<Props>();

const status = ref("0");
const rating = ref<number | null>(null);
const episodesWatched = ref<number>(0);

const loadUserData = async () => {
  try {
    const { body } = await useApi<{
      status: string;
      rating: number;
      episodes: number;
    }>(
      "api/title_status",
      {
        queryParams: {
          anime_id: id,
          user_id: 1,
        },
      },
      undefined,
      "api"
    );

    status.value = body.status || "0";
    rating.value = body.rating || null;
    episodesWatched.value = body.episodes || 0;
  } catch (error) {
    console.error("Error loading user data:", error);
  }
};
</script>

<template>
  <section class="flex flex-col gap-4">
    <div class="grid grid-cols-3 gap-4">
      <RatingBlock>
        <template v-slot:header> 📺 Status</template>
        <select
          v-model="status"
          class="bg-transparent text-center text-primary-500 text-xl"
        >
          <option value="0" disabled>—</option>
          <option value="watching">Смотрю</option>
          <option value="watched">Завершено</option>
          <option value="dropped">Брошено</option>
          <option value="planning">В планах</option>
        </select>
      </RatingBlock>

      <RatingBlock>
        <template v-slot:header>⭐ U Score</template>
        <input
          v-model="rating"
          type="number"
          min="0"
          max="10"
          step="0.5"
          class="bg-transparent font-logo appearance-none border-0 outline-none shadow-none hover:border-b active:border-b text-center text-primary-500 text-xl"
          placeholder="-"
        />
      </RatingBlock>

      <RatingBlock>
        <template v-slot:header>🎯 Progress</template>
        <div class="flex items-center">
          <input
            v-model="episodesWatched"
            type="number"
            min="0"
            :max="totalEpisodes"
            class="bg-transparent text-right pr-0.5 font-logo text-primary-500 text-xl"
            :style="`width:${String(totalEpisodes).length + 0.5}em`"
          />
          <span class="text-sm text-black/40 -ml-1"
            >/ {{ totalEpisodes || "?" }}</span
          >
        </div>
      </RatingBlock>
    </div>
    <PrimaryButton :disabled="true" @click="">
      <span class="text-primary-500">Update</span>
    </PrimaryButton>
  </section>
</template>
