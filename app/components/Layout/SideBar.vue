<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import Logo from '~/assets/icons/logo.svg';

const items: NavigationMenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-house',
    active: true,
  },
  {
    label: 'Inbox',
    icon: 'i-lucide-inbox',
  },
  {
    label: 'Contacts',
    icon: 'i-lucide-users',
  },
];

const collapsed = ref(false);

defineShortcuts({
  c: () => (collapsed.value = !collapsed.value),
});
</script>

<template>
  <UDashboardSidebar
    v-model:collapsed="collapsed"
    open
    toggle-side="right"
    class="w-full max-w-55">
    <template #header>
      <Logo />
    </template>
    <UNavigationMenu
      :collapsed="collapsed"
      :items="items"
      orientation="vertical"
      class="min-h-10" />
  </UDashboardSidebar>
</template>
