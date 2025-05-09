<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useApi } from "@/composables/useAPI";
import Delete from "@/components/SVG/Delete.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

interface Props {
  id: string;
}

const { id } = defineProps<Props>();
const commentText = ref("");
const maxLength = 500;
const textarea = ref<HTMLTextAreaElement | null>(null);
const senderState = ref<Boolean>(true);
const createdAt = ref<Date>();

const formatDate = (date: Date) => {
  return (
    (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()) +
    "." +
    (date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()) +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes()
  );
};

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
  ).then(({ body }) => {
    commentText.value = body[0].comment_text;
    createdAt.value = new Date(body[0].created_at);
    commentText.value.length > 0
      ? (senderState.value = false)
      : (senderState.value = true);
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
  );
};
</script>

<template>
  <div class="flex flex-col gap-5" v-if="senderState">
    <textarea
      v-model="commentText"
      placeholder="Введите ваш комментарий к аниме..."
      class="w-full ring-primary-500/30 ring rounded-lg resize-none p-4 h-40 bg-background text-black/80 placeholder:text-black/50 focus:outline-none focus:ring-2 focus:bg-background/70 focus:ring-primary-500/50"
      maxlength="500"
      ref="textarea"
    />
    <p class="text-sm text-black mt-1">
      {{ remainingChars }} символов осталось
    </p>

    <PrimaryButton
      @click="createComment"
      :disabled="!commentText.trim()"
      class="py-3 px-4 w-fit bg-background rounded-lg disabled:pointer-events-none disabled:opacity-60 hover:bg-primary-300/30 transition-colors border border-primary-500/10"
    >
      <span class="text-primary-500">Оставить комментарий</span>
    </PrimaryButton>
  </div>
  <div class="flex flex-col gap-5" v-else>
    <div class="flex justify-between items-center">
      <p class="text-black leading-relaxed pl-5">- {{ commentText }}</p>
      <span class="text-xs text-stone-300">{{ formatDate(createdAt) }}</span>
    </div>
    <div class="flex items-center gap-4">
      <PrimaryButton @click="createComment" :disabled="!commentText.trim()">
        <span class="text-primary-500">Редактировать</span>
      </PrimaryButton>
      <PrimaryButton classes="bg-rose-100 hover:bg-rose-200">
        <Delete class="fill-primary-500" />
      </PrimaryButton>
    </div>
  </div>
</template>
