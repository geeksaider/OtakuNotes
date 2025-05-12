<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useApi } from "@/composables/useAPI";
import Delete from "@/components/SVG/Delete.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import ModalComment from "./ModalComment.vue";

interface Props {
  id: string;
}

const { id } = defineProps<Props>();
const commentText = ref<string>("");
let dbCommentText: string = "";
const maxLength: number = 500;
const textarea = ref<HTMLTextAreaElement | null>(null);
const senderState = ref<Boolean>(true);
const createdAt = ref<Date>();
const buttonType = ref<string>("creator");

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
    dbCommentText = body[0].comment_text;
    commentText.value = dbCommentText;
    createdAt.value = new Date(body[0].created_at);
    commentText.value.length > 0
      ? (senderState.value = false)
      : (senderState.value = true);
  });
};

const responseStatus = ref<number>();
const responseMessage = ref<string>("");

const createComment = async () => {
  await useApi<string>(
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
  ).then(({ status, response, body }) => {
    if (response.ok) {
      responseStatus.value = status;
      responseMessage.value = body.message;
    } else {
      responseStatus.value = 900;
      responseMessage.value = "Ошибка!!!";
    }
  });
  getApiResponse();
};

const editComment = async () => {
  await useApi<string>(
    "api/commentEditor",
    {
      method: "PUT",
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
  ).then(({ status, response, body }) => {
    if (response.ok) {
      responseStatus.value = status;
      responseMessage.value = body.message;
    } else {
      responseStatus.value = 900;
      responseMessage.value = "Ошибка!!!";
    }
  });
  getApiResponse();
};

onMounted(() => {
  getApiResponse();
});

const remainingChars = computed(
  () => maxLength - (commentText.value ? commentText.value.length : 0)
);

const formatDate = (date: Date) => {
  const formatNum = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };
  return (
    formatNum(date.getDate()) +
    "." +
    formatNum(date.getMonth() + 1) +
    " " +
    formatNum(date.getHours()) +
    ":" +
    formatNum(date.getMinutes())
  );
};

const modelType = (state: number) => {
  if (state >= 200 && state < 300) {
    return "success";
  } else {
    return "error";
  }
};

const disabled = computed(() => {
  if (
    commentText.value.length > maxLength ||
    !commentText.value.trim() ||
    commentText.value == dbCommentText
  ) {
    return true;
  } else {
    return false;
  }
});
</script>

<template>
  <section class="flex flex-col gap-5" v-if="senderState">
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
      :disabled="disabled"
      v-if="buttonType == 'creator'"
    >
      <span class="text-primary-500">Оставить комментарий</span>
    </PrimaryButton>
    <PrimaryButton
      @click="editComment"
      :disabled="disabled"
      v-if="buttonType == 'editor'"
    >
      <span class="text-primary-500">Отредактировать!</span>
    </PrimaryButton>
  </section>
  <section class="flex flex-col gap-5" v-else>
    <div class="flex justify-between items-center">
      <p class="text-black leading-relaxed pl-5">- {{ commentText }}</p>
      <span class="text-xs text-stone-300">{{
        createdAt ? formatDate(createdAt) : ""
      }}</span>
    </div>
    <div class="flex items-center gap-4">
      <PrimaryButton
        @click="
          () => {
            senderState = true;
            buttonType = 'editor';
          }
        "
      >
        <span class="text-primary-500">Редактировать</span>
      </PrimaryButton>
      <PrimaryButton classes="bg-rose-100 hover:bg-rose-200">
        <Delete class="fill-primary-500" />
      </PrimaryButton>
    </div>
  </section>
  <ModalComment :type="modelType(responseStatus)" v-if="responseStatus">
    >{{ responseStatus }} {{ responseMessage }}</ModalComment
  >
</template>
