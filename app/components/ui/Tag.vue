<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'expired',
  },
  isDotHidden: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <p
    v-if="props.type === 'expired'"
    class="py-1 text-[10px] px-2 bg-[rgba(136,34,0,1)] border border-[rgba(255,129,32,1)] rounded-full">
    <UChip
      v-if="!isDotHidden"
      color="custom"
      size="xs"
      standalone
      inset
      class="mr-1" />
    <slot />
  </p>
  <p
    v-else-if="props.type === 'canceled'"
    class="py-1 text-[10px] px-2 bg-[rgba(128,0,2,1)] border border-[rgba(249,29,33,1)] rounded-full">
    <UChip
      v-if="!isDotHidden"
      color="custom"
      size="xs"
      standalone
      inset
      class="mr-1" />
    <slot />
  </p>
  <p
    v-else-if="props.type === 'captured'"
    class="py-1 text-[10px] px-2 bg-[rgba(0,89,45,1)] border border-[rgba(46,225,124,1)] rounded-full">
    <UChip
      v-if="!isDotHidden"
      color="custom"
      size="xs"
      standalone
      inset
      class="mr-1" />
    <slot />
  </p>
  <p
    v-else-if="props.type === 'open'"
    class="py-1 text-[10px] px-2 bg-[rgba(0,13,89,1)] border border-[rgba(46,103,225,1)] rounded-full">
    <UChip
      v-if="!isDotHidden"
      color="custom"
      size="xs"
      standalone
      inset
      class="mr-1" />
    <slot />
  </p>
</template>
