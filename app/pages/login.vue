<script setup>
import { ref, onMounted } from 'vue';
import AuthLayout from '~/layouts/AuthLayout.vue';

definePageMeta({
  middleware: 'guest',
});
const show = useState('showPassword', () => false);
const password = useState('password', () => '');
const email = useState('email', () => '');
const name = useState('name', () => '');

const test = ref(''); // for debug
const { login } = useAuth();

const submit = async e => {
  e.preventDefault();
  login({ email });
  navigateTo('/');
};

onMounted(() => {
  document.title = 'Sign Up - NoPayn';
});
</script>

<template>
  <AuthLayout>
    <div class="flex w-full h-full">
      <Trustpilot />
      <div class="flex flex-col space-y-4 w-full max-w-sm mx-auto mt-20">
        <h1>Sign Up</h1>
        <UForm @submit="submit" class="flex flex-col space-y-4 w-full">
          <UFormField label="Full Name" name="name" required>
            <UInput
              class="w-full"
              size="xl"
              v-model="name"
              placeholder="Enter your full name"
              autocomplete="name" />
          </UFormField>
          <UFormField label="Email" name="email" required>
            <UInput
              class="w-full"
              size="xl"
              v-model="email"
              placeholder="Enter your email"
              autocomplete="email" />
          </UFormField>
          <UFormField label="Password" name="password" required>
            <UInput
              size="xl"
              class="w-full"
              v-model="password"
              placeholder="Password"
              :type="show ? 'text' : 'password'"
              autocomplete="new-password"
              :ui="{ trailing: 'pe-1' }">
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="show ? 'Hide password' : 'Show password'"
                  :aria-pressed="show"
                  aria-controls="password"
                  @click="show = !show" />
              </template>
            </UInput>
          </UFormField>
          <UButton size="xl" type="submit" class="flex justify-center"
            >Sign Up</UButton
          >
        </UForm>
      </div>
    </div>
  </AuthLayout>
</template>
