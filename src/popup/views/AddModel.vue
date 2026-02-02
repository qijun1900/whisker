<template>
  <div class="add-model">
    <h3>添加新模型</h3>
    <p>这是添加模型的页面</p>
    <button @click="goBack">返回</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.add-model {
  padding: 15px;
}

h3 {
  margin-top: 0;
  color: #333;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #35a372;
}
</style>
