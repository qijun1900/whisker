<template>
  <div class="home">
    <div class="main-container">
      <SideHeader/>

      <SideContent>
        <div v-if="activeVendorId" class="vendor-info">
          <p class="info-label">当前激活的模型ID:</p>
          <p class="info-value">{{ activeVendorId }}</p>
        </div>
        <div v-else class="empty-state">
          <p>请从右侧导航选择一个模型</p>
        </div>
      </SideContent>

      <SideFooter />
    </div>
    
    <RightNav 
      v-model="activeVendorId"
      @nav-click="handleNavClick" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RightNav, { type NavItem } from '../components/RightNav.vue'
import SideHeader from '../components/SideHeader.vue'
import SideContent from '../components/SideContent.vue'
import SideFooter from '../components/SideFooter.vue'
import { useActiveVendor } from '../../composables/useActiveVendor'

const msg = ref('AI 模型对话')

// 使用封装的激活 vendor 功能
const { activeVendorId } = useActiveVendor()

const handleNavClick = (item: NavItem) => {
  console.log('导航项点击:', item)
  activeVendorId.value = item.id
  msg.value = item.title
}
</script>

<style scoped>
.home {
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-right: 63px; /* 为右侧导航栏留出空间 */
}


.vendor-info {
  background: #fff;
  padding: 14px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.info-label {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.info-value {
  margin: 0;
  font-size: 16px;
  color: #1f2937;
  font-family: monospace;
  background: #f3f4f6;
  padding: 8px 12px;
  border-radius: 4px;
  word-break: break-all;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9ca3af;
  font-size: 14px;
}
</style>
