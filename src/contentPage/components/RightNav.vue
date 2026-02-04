<template>
  <nav class="right-nav">
    <div class="nav-items">
      <div 
        v-for="item in navItems" 
        :key="item.id"
        class="nav-item"
        :class="{ active: activeItem === item.id }"
        @click="handleNavClick(item)"
        :title="item.title"
      >
        <div class="nav-item-content">
          <VendorIcon 
            :text="item.icon" 
            :color="item.color || '#42b983'" 
            size="medium" 
          />
          <span class="nav-label">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VendorIcon from '../../components/VendorIcon.vue'

export interface NavItem {
  id: number
  icon: string
  title: string
  color?: string
}

interface Props {
  items?: NavItem[]
  defaultActive?: number
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [
    { id: 1, icon: 'H', title: '首页', color: '#3b82f6' },
    { id: 2, icon: 'N', title: '笔记', color: '#8b5cf6' },
    { id: 3, icon: 'F', title: '文件', color: '#ec4899' },
    { id: 4, icon: 'S', title: '收藏', color: '#f59e0b' },
    { id: 5, icon: 'T', title: '标签', color: '#10b981' },
    { id: 6, icon: 'C', title: '统计', color: '#06b6d4' },
    { id: 7, icon: 'G', title: '设置', color: '#6366f1' },
    { id: 8, icon: 'B', title: '通知', color: '#ef4444' },
    { id: 9, icon: 'U', title: '用户', color: '#14b8a6' },
    { id: 10, icon: 'M', title: '消息', color: '#f97316' },
    { id: 11, icon: 'Q', title: '搜索', color: '#84cc16' },
    { id: 12, icon: 'R', title: '日历', color: '#a855f7' },
    { id: 13, icon: 'P', title: '相册', color: '#ec4899' },
    { id: 14, icon: 'Y', title: '音乐', color: '#f43f5e' },
    { id: 15, icon: 'V', title: '视频', color: '#0ea5e9' },
    { id: 16, icon: 'W', title: '购物', color: '#22c55e' },
    { id: 17, icon: 'L', title: '灵感', color: '#eab308' },
    { id: 18, icon: 'K', title: '分类', color: '#8b5cf6' },
    { id: 19, icon: 'D', title: '钉住', color: '#ef4444' },
    { id: 20, icon: 'A', title: '快速访问', color: '#06b6d4' },
  ],
  defaultActive: 1
})

const emit = defineEmits<{
  navClick: [item: NavItem]
}>()

const navItems = ref(props.items)
const activeItem = ref(props.defaultActive)

const handleNavClick = (item: NavItem) => {
  activeItem.value = item.id
  emit('navClick', item)
}
</script>

<style scoped>
/* 右侧导航栏 */
.right-nav {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 63px;
  background: #f5f5f5;
  border-left: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.nav-items {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 0;
  
  /* 隐藏滚动条但保持滚动功能 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.nav-items::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.nav-item {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  padding: 9px 0;
}

.nav-item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.nav-item:hover {
  background: #e8e8e8;
}

.nav-item.active {
  background: #d4d4d4;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 40px;
  background: #42b983;
  border-radius: 0 2px 2px 0;
}

.nav-label {
  font-size: 10px;
  color: #666;
  user-select: none;
  text-align: center;
  line-height: 1;
}
</style>
