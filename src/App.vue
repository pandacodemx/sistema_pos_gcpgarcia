<template>
  <ThemeProvider>
    <SidebarProvider>
      <RouterView />
    </SidebarProvider>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
auth.loadFromStorage()
import ThemeProvider from './components/layout/ThemeProvider.vue'
import SidebarProvider from './components/layout/SidebarProvider.vue'
</script>
