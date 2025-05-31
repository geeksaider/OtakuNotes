<script setup lang="ts"></script>

<template>
  <div
    class="flex flex-col relative justify-center gap-2 items-center p-4 bg-background text-center rounded-lg border border-primary-500/10"
  >
    <div class="w-full bg-transparent text-sm text-black/60 mb-1">
      <slot name="header" />
    </div>
    <slot
      class="bg-transparent font-logo appearance-none border-0 outline-none shadow-none hover:border-b active:border-b text-center text-primary-500 text-xl"
    />
  </div>
</template>
