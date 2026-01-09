<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
});

const email = ref('');
const password = ref('');

const submit = async () => {
  // регистрация
  navigateTo('/login');
};
</script>

<template>
  <div>
    <h1>Регистрация</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Пароль" />
    <button @click="submit">Зарегистрироваться</button>
  </div>
</template>
