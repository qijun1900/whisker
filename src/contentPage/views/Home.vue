<template>
  <div class="home">
    <div class="content">
      <h1>{{ msg }}</h1>
      <p>这是侧边栏内容页面</p>
    </div>
    
    <RightNav 
    @nav-click="handleNavClick" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RightNav, { type NavItem } from '../components/RightNav.vue'

const msg = ref('Content Page')

const handleNavClick = (item: NavItem) => {
  console.log('导航项点击:', item)
}
</script>

<style scoped>
.home {
  display: flex;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: hidden;
  
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

h1 {
  color: #42b983;
}
</style>
