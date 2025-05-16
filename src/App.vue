<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* App-specific styles */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--vt-c-black);
  color: var(--vt-c-text-dark-1);
  font-family: 'Playfair Display', serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* Elegant gold accents */
::selection {
  background-color: rgba(212, 175, 55, 0.3);
  color: var(--gold-light);
}

/* Custom scrollbar for luxury feel */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--vt-c-black-soft);
}

::-webkit-scrollbar-thumb {
  background: var(--gold-dark);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gold-primary);
}
</style>
