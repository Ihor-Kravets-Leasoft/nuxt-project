<template>
  <div
    class="flex flex-col justify-between items-center bg-white/5 rounded-2xl p-4">
    <div>
      <h3 class="flex items-center text-2xl font-semibold leading-[1.3]">
        <slot name="title"></slot>
      </h3>
      <p class="text-gray-400 text-sm leading-[1.4]">
        <slot name="description"></slot>
      </p>
      <slot name="content" />
    </div>
    <slot name="footer" />
  </div>
</template>
