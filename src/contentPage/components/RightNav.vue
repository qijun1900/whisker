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
            :color="item.color" 
            :favicon-url="item.faviconUrl"
            size="medium" 
          />
          <span class="nav-label">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import VendorIcon from '../../components/VendorIcon.vue'
import { useVendorStore } from '../../store/vendor'

export interface NavItem {
  id: string
  icon: string
  title: string
  color: string
  faviconUrl?: string
}

interface Props {
  defaultActive?: string
  modelValue?: string  // 新增：支持 v-model
}

const props = withDefaults(defineProps<Props>(), {
  defaultActive: '',
  modelValue: ''
})

const emit = defineEmits<{
  navClick: [item: NavItem]
  'update:modelValue': [id: string]  // 新增：支持 v-model
}>()

const vendorStore = useVendorStore()
const activeItem = ref(props.defaultActive || props.modelValue)

// 监听外部传入的 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  if (newValue && newValue !== activeItem.value) {
    activeItem.value = newValue
  }
})

// 从 store 加载导航项
const navItems = computed(() => 
  vendorStore.vendors.map(v => ({
    id: v.id,
    icon: v.vendorName.charAt(0).toUpperCase(), // 使用首字母
    title: v.vendorName,
    color: v.brandColor,
    faviconUrl: v.faviconUrl
  }))
)

const handleNavClick = (item: NavItem) => {
  activeItem.value = item.id
  emit('navClick', item)
  emit('update:modelValue', item.id)  // 支持 v-model
}

// 加载数据
onMounted(async () => {
  await vendorStore.loadVendors()
  
  // 如果没有设置默认激活项，激活第一个
  if (!activeItem.value && navItems.value.length > 0) {
    activeItem.value = navItems.value[0]?.id || ''
  }
})
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
  padding: 10px 0;
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
  background: #cda63b;
  border-radius: 0 2px 2px 0;
}

.nav-label {
  font-size: 10px;
  color: #666;
  user-select: none;
  text-align: center;
  line-height: 1;
  max-width: 50px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
