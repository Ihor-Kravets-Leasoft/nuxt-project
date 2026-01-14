<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AuthLayout from '~/layouts/AuthLayout.vue';
import logoSrc from '~/assets/icons/logo.svg?url';

definePageMeta({
  middleware: 'guest',
});

const show = useState('showPassword', () => false);
const password = useState('password', () => '');
const email = useState('email', () => '');

onMounted(() => {
  if (typeof window !== 'undefined') {
    show.value = sessionStorage.getItem('showPassword') === 'true';
    password.value = sessionStorage.getItem('password') || '';
    email.value = sessionStorage.getItem('email') || '';
  }
});

watch(show, newVal => {
  if (typeof window !== 'undefined')
    sessionStorage.setItem('showPassword', newVal.toString());
});

watch(password, newVal => {
  if (typeof window !== 'undefined') sessionStorage.setItem('password', newVal);
});

watch(email, newVal => {
  if (typeof window !== 'undefined') sessionStorage.setItem('email', newVal);
});
const loading = ref(false);
const error = ref('');

const { login } = useAuth();

const submit = async (e: Event) => {
  e.preventDefault();
  loading.value = true;
  error.value = '';
  const success = await login({ email: email.value, password: password.value });
  loading.value = false;
  if (success) {
    navigateTo('/');
  } else {
    error.value = 'Invalid email or password';
  }
};

function checkStrength(str: string) {
  const requirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /\d/, text: 'At least 1 number' },
    { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
    { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
  ];

  return requirements.map(req => ({
    met: req.regex.test(str),
    text: req.text,
  }));
}

const strength = computed(() => checkStrength(password.value));
const score = computed(() => strength.value.filter(req => req.met).length);

const color = computed(() => {
  if (score.value === 0) return 'neutral';
  if (score.value <= 1) return 'error';
  if (score.value <= 2) return 'warning';
  if (score.value === 3) return 'warning';
  return 'success';
});

const text = computed(() => {
  if (score.value === 0) return 'Enter a password. Must contain:';
  if (score.value <= 2) return 'Weak password. Must contain:';
  if (score.value === 3) return 'Medium password';
  return 'Strong password';
});

onMounted(() => {
  document.title = 'Sign In - NoPayn';
});
</script>

<template>
  <AuthLayout>
    <div class="flex flex-col justify-between items-center w-full h-full py-9">
      <div
        class="flex flex-col items-center space-y-4 w-full max-w-100 mx-auto">
        <img :src="logoSrc" class="mb-20" width="150" height="36" alt="Logo" />
        <h1 class="text-3xl font-semibold text-center">Login with Email</h1>
        <p class="text-center text-sm text-white/70">
          Enter your details below to securely access your account and continue
          your journey with us
        </p>
        <UForm @submit="submit" class="flex flex-col gap-4 w-full">
          <UFormField label="Email" name="email" required>
            <UInput
              color="primary"
              variant="subtle"
              icon="i-lucide-mail"
              class="w-full"
              size="xl"
              v-model="email"
              placeholder="Enter your email"
              autocomplete="email" />
          </UFormField>
          <UFormField label="Password">
            <UInput
              v-model="password"
              placeholder="Password"
              :color="color"
              variant="subtle"
              class="w-full"
              size="xl"
              icon="i-lucide-lock"
              :type="show ? 'text' : 'password'"
              :aria-invalid="score < 4"
              aria-describedby="password-strength"
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
          <div class="bg-white/10 p-4 gap-4 rounded-lg flex flex-col">
            <UProgress
              :color="color"
              :indicator="text"
              :model-value="score"
              :max="4"
              size="sm" />

            <p id="password-strength" class="text-sm font-medium">
              {{ text }}
            </p>

            <ul
              class="space-y-1 grid grid-cols-2 gap-4"
              aria-label="Password requirements">
              <li
                v-for="(req, index) in strength"
                :key="index"
                class="flex items-center gap-1.5"
                :class="req.met ? 'text-success' : 'text-muted'">
                <UIcon
                  :name="
                    req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'
                  "
                  class="size-4 shrink-0" />

                <span class="text-xs font-light">
                  {{ req.text }}
                  <span class="sr-only">
                    {{
                      req.met ? ' - Requirement met' : ' - Requirement not met'
                    }}
                  </span>
                </span>
              </li>
            </ul>
          </div>
          <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
          <ButtonPrimary
            size="xl"
            type="submit"
            class="flex justify-center"
            :disabled="loading"
            >{{ loading ? 'Logging in...' : 'Login' }}</ButtonPrimary
          >
        </UForm>
        <ButtonPrimaryNoBg>Forgot password?</ButtonPrimaryNoBg>
      </div>
      <p>
        Don't have an account?
        <ButtonPrimaryNoBg
          ><NuxtLink to="/register"
            >Sign Up for free</NuxtLink
          ></ButtonPrimaryNoBg
        >
      </p>
    </div>
  </AuthLayout>
</template>
