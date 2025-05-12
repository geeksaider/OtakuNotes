<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Props {
  type?: string;
  duration?: number;
  autoClose?: boolean;
}

const {
  type = "info",
  duration = 3000,
  autoClose = true,
} = defineProps<Props>();

const isVisible = ref<boolean>(false);

const show = () => {
  isVisible.value = true;
  if (autoClose) {
    setTimeout(() => {
      hide();
    }, duration);
  }
};

const hide = () => {
  isVisible.value = false;
};

onMounted(() => {
  show();
});
</script>

<template>
  <div
    class="fixed right-6 bottom-6 py-4 px-6 bg-white font-semibold min-w-64 max-w-xs rounded-lg transition-all shadow-md border-l-4 flex items-center justify-between"
    :class="{
      'border-green-500 text-green-500': type === 'success',
      'border-red-500 text-red-700': type === 'error',
      'border-primary-500/70 text-primary-500': type === 'info',
      'opacity-100': isVisible,
      'opacity-0 translate-y-2': !isVisible,
    }"
  >
    <slot></slot>
    <button
      @click="hide"
      class="ml-2 text-gray-400 hover:text-gray-500 focus:outline-none"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>
