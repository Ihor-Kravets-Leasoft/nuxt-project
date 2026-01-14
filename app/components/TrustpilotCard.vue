<script setup lang="ts">
const props = defineProps({
  name: { type: String },
  company: { type: String },
  comment: { type: String },
});
</script>

<template>
  <UCard
    :ui="{
      header: 'border-none p-0 py-[10px] sm:px-[10px]',
      body: 'p-[10px] sm:p-[10px]',
    }"
    variant="subtle"
    class="absolute w-56 h-25 bg-white/10 border rounded-[11px] overflow-hidden backdrop-blur-md">
    <template #header>
      <p class="text-[9px]">{{ props.name }}</p>
      <p class="text-[9px] text-gray-400">{{ props.company }}</p>
    </template>

    <p class="text-[9px] text-gray-400 truncate whitespace-pre-line">
      {{ props.comment }}
    </p>
  </UCard>
</template>
