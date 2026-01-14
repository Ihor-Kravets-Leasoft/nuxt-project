<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AuthLayout from '~/layouts/AuthLayout.vue';
import logoSrc from '~/assets/icons/logo.svg?url';

definePageMeta({
  middleware: 'guest',
});

const show = useState('showPassword', () => false);
const fullName = useState('fullName', () => '');
const password = useState('password', () => '');
const confirmPassword = useState('confirmPassword', () => '');
const email = useState('email', () => '');

onMounted(() => {
  if (typeof window !== 'undefined') {
    show.value = sessionStorage.getItem('showPassword') === 'true';
    fullName.value = sessionStorage.getItem('fullName') || '';
    password.value = sessionStorage.getItem('password') || '';
    confirmPassword.value = sessionStorage.getItem('confirmPassword') || '';
    email.value = sessionStorage.getItem('email') || '';
  }
});

watch(show, newVal => {
  if (typeof window !== 'undefined')
    sessionStorage.setItem('showPassword', newVal.toString());
});

watch(fullName, newVal => {
  if (typeof window !== 'undefined') sessionStorage.setItem('fullName', newVal);
});

watch(password, newVal => {
  if (typeof window !== 'undefined') sessionStorage.setItem('password', newVal);
});

watch(confirmPassword, newVal => {
  if (typeof window !== 'undefined')
    sessionStorage.setItem('confirmPassword', newVal);
});

watch(email, newVal => {
  if (typeof window !== 'undefined') sessionStorage.setItem('email', newVal);
});
const loading = ref(false);
const error = ref('');

const { register } = useAuth();

const submit = async (e: Event) => {
  e.preventDefault();
  loading.value = true;
  error.value = '';
  const success = await register({
    email: email.value,
    password: password.value,
    fullName: fullName.value,
  });
  loading.value = false;
  if (success) {
    navigateTo('/register-verify');
  } else {
    error.value = 'Registration failed';
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

const passwordMatch = computed(() => password.value === confirmPassword.value);

const isFormValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    fullName.value.trim() !== '' &&
    email.value.trim() !== '' &&
    emailRegex.test(email.value) &&
    score.value === 4 &&
    passwordMatch.value
  );
});

const text = computed(() => {
  if (score.value === 0) return 'Enter a password. Must contain:';
  if (score.value <= 2) return 'Weak password. Must contain:';
  if (score.value === 3) return 'Medium password';
  return 'Strong password';
});

onMounted(() => {
  document.title = 'Sign Up - NoPayn';
});
</script>

<template>
  <AuthLayout>
    <div class="flex flex-col justify-between items-center w-full h-full py-9">
      <div
        class="flex flex-col items-center space-y-4 w-full max-w-100 mx-auto">
        <img :src="logoSrc" class="mb-20" width="150" height="36" alt="Logo" />
        <h1 class="text-3xl font-semibold text-center">Sign Up</h1>
        <p class="text-center text-sm text-white/70">
          Create your personal account in just a few minutes and get full access
          to all features
        </p>
        <UForm @submit="submit" class="flex flex-col gap-4 w-full">
          <UFormField label="Full Name" name="fullName" required>
            <UInput
              color="primary"
              variant="subtle"
              icon="i-lucide-user"
              class="w-full"
              size="xl"
              v-model="fullName"
              placeholder="Enter your full name"
              autocomplete="name" />
          </UFormField>
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
          <div
            v-if="!passwordMatch && confirmPassword"
            class="text-red-500 text-sm">
            Passwords do not match
          </div>
          <UFormField label="Confirm Password">
            <UInput
              v-model="confirmPassword"
              placeholder="Confirm Password"
              :color="passwordMatch ? 'primary' : 'error'"
              variant="subtle"
              class="w-full"
              size="xl"
              icon="i-lucide-lock"
              :type="show ? 'text' : 'password'"
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
          <ButtonPrimary
            size="xl"
            type="submit"
            class="flex justify-center"
            :disabled="loading || !isFormValid"
            >{{ loading ? 'Signing up...' : 'Sign Up' }}</ButtonPrimary
          >
        </UForm>
      </div>
      <p>
        Already have an account?
        <ButtonPrimaryNoBg
          ><NuxtLink to="/login">Login</NuxtLink></ButtonPrimaryNoBg
        >
      </p>
    </div>
  </AuthLayout>
</template>
