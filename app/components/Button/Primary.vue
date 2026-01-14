<template>
  <UButton
    color="primary"
    variant="ghost"
    class="btn-gradient h-10 border border-white/20 outline-none font-bold rounded-lg cursor-pointer bg-transparent hover:bg-transparent duration-300">
    <slot />
  </UButton>
</template>

<style scoped>
.btn-gradient {
  background-image: linear-gradient(135deg, #3ce569 0%, #399e39 100%);
  color: #0c1a39;
}

.btn-gradient:hover {
  background-image: linear-gradient(135deg, #3ce5691a 0%, #3ce5691a 100%);
  border: 1px solid #3ce569;
  color: #3ce569;
}

.btn-gradient:active {
  background-image: linear-gradient(135deg, #3ce56980 0%, #3ce56980 100%);
  color: #0c1a39;
}
</style>
