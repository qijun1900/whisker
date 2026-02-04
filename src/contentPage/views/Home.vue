<template>
  <div class="home">
    <div class="content">
      <h1>{{ msg }}</h1>
      <p v-if="activeVendorId">当前激活的模型ID: {{ activeVendorId }}</p>
    </div>
    
    <RightNav 
      v-model="activeVendorId"
      @nav-click="handleNavClick" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RightNav, { type NavItem } from '../components/RightNav.vue'

const msg = ref('侧边栏内容页面')
const activeVendorId = ref<string>('')

const handleNavClick = (item: NavItem) => {
  console.log('导航项点击:', item)
  activeVendorId.value = item.id
  msg.value = `当前选中: ${item.title}`
}

// 监听从 popup 传来的 vendorId
onMounted(async () => {
  // 读取激活的 vendor ID
  const result = await chrome.storage.local.get('activeSidePanelVendorId')
  if (result.activeSidePanelVendorId) {
    activeVendorId.value = result.activeSidePanelVendorId as string
    
    // 清除标记，避免下次打开时还是这个
    await chrome.storage.local.remove('activeSidePanelVendorId')
  }
  
  // 监听 storage 变化（实时更新）
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.activeSidePanelVendorId) {
      const newId = changes.activeSidePanelVendorId.newValue
      if (newId && typeof newId === 'string') {
        activeVendorId.value = newId
        console.log('侧边栏激活更新:', newId)
      }
    }
  })
})
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
