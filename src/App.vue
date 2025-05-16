<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* Reset and base styles */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: url('/casino-background.jpg') no-repeat center center fixed;
  background-size: cover;
  color: #ffffff;
  font-family: 'Playfair Display', serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

a {
  color: #d4af37;
  transition: color 0.3s;
}

a:hover {
  color: #b7953a;
}
</style>
