<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Hello Whisker!')
</script>

<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <p>Welcome to your extension popup.</p>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  min-width: 300px;
  text-align: center;
}
</style>
