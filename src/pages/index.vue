<script setup>
import Header from "@/components/Header.vue";
import MainField from "@/components/MainField.vue";
import AnimeBanner from "@/components/AnimeBanner.vue";
</script>

<template>
  <div class="min-h-screen text-third">
    <Header></Header>
    <div class="bg-background">
      <MainField></MainField>
      <AnimeBanner></AnimeBanner>
    </div>
  </div>
</template>
