<template>
  <div class="flex flex-col w-[384px] h-full rounded-2xl p-6 bg-white/10">
    <div class="mb-8">
      <h3>Trustpilot</h3>
      <p>4.8/5 Based on 2,400+ reviews</p>
    </div>
    <div class="w-84 h-125 relative mx-auto overflow-hidden">
      <TrustpilotCard />
    </div>
    <div class="flex items-center justify-between mt-8">
      <p>Top Rated</p>
      <UiTag :is-dot-hidden="true" type="expired">Excellent</UiTag>
    </div>
  </div>
</template>
