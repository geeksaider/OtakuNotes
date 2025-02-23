<script>
import { RouterLink } from "vue-router";
</script>

<template>
    <RouterLink class="py-1 px-4 bg-white relative group">
        <div
            class="w-2 h-2 border-l border-t border-third transition-all duration-500 absolute left-0 top-0 group-hover:w-[50%] group-hover:h-[50%]"
        />
        <div
            class="w-2 h-2 border-r border-t border-third transition-all duration-500 absolute right-0 top-0 group-hover:w-[50%] group-hover:h-[50%]"
        />
        <slot></slot>
        <div
            class="w-2 h-2 border-l border-b border-third transition-all duration-500 absolute left-0 bottom-0 group-hover:w-[50%] group-hover:h-[50%]"
        />
        <div
            class="w-2 h-2 border-r border-b border-third transition-all duration-500 absolute right-0 bottom-0 group-hover:w-[50%] group-hover:h-[50%]"
        />
    </RouterLink>
</template>
