<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue';
import logoSrc from '~/assets/icons/logo.svg?url';

definePageMeta({
  middleware: 'guest',
});

onMounted(() => {
  document.title = 'Verify Your Email - NoPayn';
});
</script>

<template>
  <AuthLayout>
    <div class="flex flex-col items-center w-full h-full py-9">
      <div class="w-full flex justify-around items-center mb-20">
        <ButtonPrimaryNoBg
          ><NuxtLink to="/register">< Back</NuxtLink></ButtonPrimaryNoBg
        >
        <img :src="logoSrc" class="" width="150" height="36" alt="Logo" />
        <div class="w-15.75"></div>
      </div>
      <div
        class="flex flex-col items-center space-y-4 w-full max-w-100 mx-auto">
        <h1 class="text-3xl font-semibold text-center">Verify Email</h1>
        <p class="text-center text-sm text-white/70">
          The code was sent to <span class="text-white">email@gmail.com</span>.
          Please check your email and enter the code on fields below
        </p>

        <UPinInput
          :length="6"
          size="xl"
          color="neutral"
          variant="soft"
          type="number"
          otp />
        <ButtonPrimaryNoBg class="mt-2"
          >Resend Verification Email</ButtonPrimaryNoBg
        >
        <ButtonPrimary class="w-full mt-6">Submit</ButtonPrimary>
      </div>
    </div>
  </AuthLayout>
</template>
