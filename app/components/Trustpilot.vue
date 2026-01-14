<script setup lang="ts">
import TopRatedIcon from '~/assets/icons/top-rated.svg';
</script>

<template>
  <SharedContentContainer class="p-6">
    <template #title
      ><UIcon name="i-lucide-star" class="mr-1" />Trustpilot</template
    >
    <template #description>4.8/5 Based on 2,400+ reviews</template>
    <template #content>
      <div class="w-84 h-125 relative mx-auto">
        <NuxtImg
          src="/reviews.webp"
          width="335"
          height="265"
          format="webp"
          class="mt-8"
          preload
          loading="eager"
          fetch-priority="high"
          alt="Comments" />
      </div>
    </template>
    <template #footer>
      <div class="w-84">
        <div class="flex items-center justify-between mb-3 w-full">
          <p class="flex items-center text-[16px] font-semibold">
            <TopRatedIcon class="mr-1" />Top Rated
          </p>
          <UiTag :is-dot-hidden="true" type="expired">Excellent</UiTag>
        </div>
        <div class="w-full">
          <p class="text-2xl font-semibold">Excellent on Trustpilot</p>
          <p class="text-sm text-gray-400">
            Thousands of growing businesses trust us for effortless payments,
            fast support, and total transparency — every step of the way.
          </p>
        </div>
      </div>
    </template>
  </SharedContentContainer>
</template>
