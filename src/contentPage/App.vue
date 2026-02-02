<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Content Page')
</script>

<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <p>这是内容页面</p>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}

h1 {
  color: #42b983;
}
</style>
