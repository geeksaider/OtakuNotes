<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useApi } from "@/composables/useAPI";

interface Props {
  id: string;
}

const { id } = defineProps<Props>();
const commentText = ref("");
const maxLength = 500;

const getApiResponse = () => {
  useApi<string>(
    "api/comments",
    {
      queryParams: {
        anime_id: id,
        user_id: 1,
      },
    },
    undefined,
    "api"
  ).then(({ data, body }) => {
    commentText.value = body[0].comment_text;
  });
};

onMounted(() => {
  getApiResponse();
});

const remainingChars = computed(
  () => maxLength - (commentText.value ? commentText.value.length : 0)
);

const createComment = () => {
  useApi<string>(
    "api/comments",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment_text: commentText.value,
        anime_id: id,
        user_id: 1,
      }),
    },
    undefined,
    "api"
  ).then(({ data, body }) => {
    console.log(data);
  });
};
</script>

<template>
  <div class="flex flex-col gap-5">
    <textarea
      v-model="commentText"
      placeholder="Введите ваш комментарий к аниме..."
      class="w-full ring-primary-500/30 ring rounded-lg resize-none p-4 h-40 bg-background text-black/80 placeholder:text-black/50 focus:outline-none focus:ring-2 focus:bg-background/70 focus:ring-primary-500/50"
      maxlength="500"
    ></textarea>
    <p class="text-sm text-black mt-1">
      {{ remainingChars }} символов осталось
    </p>

    <button
      @click="createComment"
      :disabled="!commentText.trim()"
      class="py-3 px-4 w-fit bg-background rounded-lg disabled:pointer-events-none disabled:opacity-60 hover:bg-primary-300/30 transition-colors border border-primary-500/10"
    >
      <div class="flex items-center justify-between">
        <span class="text-primary-500">Оставить комментарий</span>
      </div>
    </button>
  </div>
</template>
