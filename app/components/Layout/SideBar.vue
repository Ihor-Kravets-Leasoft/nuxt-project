<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import Logo from '~/assets/icons/logo.svg';
import LogoCollapsed from '~/assets/icons/logo-collapsed.svg';

const items: NavigationMenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-chart-pie',
    defaultOpen: true,
    active: true,
  },
  {
    label: 'Websites',
    icon: 'i-lucide-globe',
  },
  {
    label: 'Transactions',
    icon: 'i-lucide-credit-card',
  },
  {
    label: 'Invoices',
    icon: 'i-lucide-file-text',
  },
  {
    label: 'Integrations',
    icon: 'i-lucide-blocks',
  },
  {
    label: 'Team',
    icon: 'i-lucide-users',
  },
];

const collapsed = ref(false);

function collapseSidebar() {
  collapsed.value = !collapsed.value;
}

defineShortcuts({
  c: () => (collapsed.value = !collapsed.value),
});
</script>

<template>
  <UDashboardSidebar
    v-model:collapsed="collapsed"
    collapsible
    open
    toggle-side="right"
    class="w-full max-w-55 relative duration-300"
    :class="[collapsed ? 'max-w-21' : '']">
    <template #header="{ collapsed }">
      <div class="p-4 flex items-center justify-center h-14">
        <Logo v-if="!collapsed" />
        <LogoCollapsed v-else />
      </div>
    </template>
    <UNavigationMenu
      :collapsed="collapsed"
      :items="items"
      variant="pill"
      orientation="vertical"
      class="flex w-full items-start justify-center duration-300"
      :class="[collapsed ? 'items-center' : '']" />
    <UDashboardSidebarCollapse
      @click="collapseSidebar"
      class="absolute right-0 top-1/2 translate-x-1/2" />
  </UDashboardSidebar>
</template>
