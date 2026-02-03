<template>
  <div class="vendor-item">
    <!-- 左侧：图标和信息 -->
    <div class="vendor-info">
      <div class="vendor-icon" :style="{ backgroundColor: color }">
        {{ initial }}
      </div>
      <div class="vendor-details">
        <h3 class="vendor-name">{{ name }}</h3>
        <p class="vendor-url">{{ url }}</p>
      </div>
    </div>

    <!-- 右侧：操作按钮 -->
    <div class="vendor-actions">
      <button class="action-btn" @click="handleEdit" title="编辑">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="action-btn delete-btn" @click="handleDelete" title="删除">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="3 6 5 6 21 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="more-menu-wrapper">
        <button class="action-btn" @click="toggleMenu" title="更多操作">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="1" stroke-width="2"/>
            <circle cx="12" cy="5" r="1" stroke-width="2"/>
            <circle cx="12" cy="19" r="1" stroke-width="2"/>
          </svg>
        </button>
        
        <!-- 下拉菜单 -->
        <div v-if="showMenu" class="more-menu" @click.stop>
          <button class="menu-item" @click="handleCopy">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-width="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-width="2"/>
            </svg>
            复制链接
          </button>
          <button class="menu-item" @click="handleOpen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="15 3 21 3 21 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="10" y1="14" x2="21" y2="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            打开网站
          </button>
          <button class="menu-item" @click="handleFavorite">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            收藏
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  /** Vendor 名称 */
  name: string
  /** Vendor 网址 */
  url: string
  /** 品牌颜色 */
  color: string
  /** 图标首字母（可选，默认取 name 的第一个字母） */
  initial?: string
}

const props = withDefaults(defineProps<Props>(), {
  initial: ''
})

interface Emits {
  /** 点击编辑按钮时触发 */
  (e: 'edit'): void
  /** 点击删除按钮时触发 */
  (e: 'delete'): void
  /** 点击复制链接时触发 */
  (e: 'copy'): void
  /** 点击打开网站时触发 */
  (e: 'open'): void
  /** 点击收藏时触发 */
  (e: 'favorite'): void
}

const emit = defineEmits<Emits>()

// 获取首字母
const initial = props.initial || props.name.charAt(0).toUpperCase()

// 更多菜单状态
const showMenu = ref(false)

const handleEdit = () => {
  emit('edit')
}

const handleDelete = () => {
  emit('delete')
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const handleCopy = () => {
  emit('copy')
  showMenu.value = false
}

const handleOpen = () => {
  emit('open')
  showMenu.value = false
}

const handleFavorite = () => {
  emit('favorite')
  showMenu.value = false
}

// 点击外部关闭菜单
const handleClickOutside = (_event: MouseEvent) => {
  if (showMenu.value) {
    showMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.vendor-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.vendor-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.vendor-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.vendor-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
}

.vendor-details {
  flex: 1;
  min-width: 0;
}

.vendor-name {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.vendor-url {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #9ca3af;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.vendor-actions {
  display: flex;
  gap: 6px;
  opacity: 0;
  transition: opacity 0.2s;
}

.vendor-item:hover .vendor-actions {
  opacity: 1;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background-color: #f3f4f6;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-btn svg {
  width: 16px;
  height: 16px;
  stroke: #6b7280;
}

.action-btn:hover {
  background-color: #e5e7eb;
}

.action-btn:hover svg {
  stroke: #374151;
}

.delete-btn:hover {
  background-color: #fee2e2;
}

.delete-btn:hover svg {
  stroke: #dc2626;
}

/* 更多菜单 */
.more-menu-wrapper {
  position: relative;
}

.more-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 4px;
  min-width: 140px;
  z-index: 10;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #374151;
  text-align: left;
  transition: background-color 0.2s;
}

.menu-item svg {
  width: 16px;
  height: 16px;
  stroke: #6b7280;
  flex-shrink: 0;
}

.menu-item:hover {
  background-color: #f3f4f6;
}

.menu-item:hover svg {
  stroke: #374151;
}
</style>
