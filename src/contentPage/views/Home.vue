<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <p>这是侧边栏内容页面</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Content Page')
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}

h1 {
  color: #42b983;
}
</style>
