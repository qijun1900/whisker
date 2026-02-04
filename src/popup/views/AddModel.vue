<template>
  <div class="add-vendor">
    <!-- 头部 -->
    <header class="header">
      <button 
        class="back-btn" 
        @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h1 class="title">{{ isEditing ? '编辑模型' : '添加新模型' }}</h1>
    </header>

    <!-- 表单内容 -->
    <div class="form-content">
      <!-- 模型名称 -->
      <div class="form-group">
        <label class="label">模型名称</label>
        <input 
          v-model="vendorName"
          type="text" 
          class="input"
          :class="{ 'input-error': errors.vendorName }"
          placeholder="e.g. OpenAI"
        />
        <span v-if="errors.vendorName" class="error-message">{{ errors.vendorName }}</span>
      </div>

      <!-- 网站网址 -->
      <div class="form-group">
        <label class="label">网站网址</label>
        <input 
          v-model="websiteUrl"
          type="url" 
          class="input"
          :class="{ 'input-error': errors.websiteUrl }"
          placeholder="https://chat.openai.com"
        />
        <span v-if="errors.websiteUrl" class="error-message">{{ errors.websiteUrl }}</span>
      </div>

      <!-- 图标选择 -->
      <div class="form-group">
        <label class="label">图标</label>
        
        <!-- 如果有 favicon，显示预览和切换选项 -->
        <div v-if="faviconUrl" class="icon-preview-section">
          <div class="icon-preview">
            <div class="preview-icon" :style="{ backgroundColor: useFavicon ? '#f3f4f6' : selectedColor }">
              <img v-if="useFavicon" :src="faviconUrl" alt="favicon" class="favicon-preview" />
              <span v-else class="initial-preview">{{ vendorName.charAt(0).toUpperCase() || '?' }}</span>
            </div>
            <div class="preview-info">
              <p class="preview-title">{{ useFavicon ? '网站图标' : '字母图标' }}</p>
              <p class="preview-desc">{{ useFavicon ? '使用网站原始图标' : '使用首字母和颜色' }}</p>
            </div>
          </div>
          
          <button 
            type="button"
            class="toggle-icon-btn" 
            @click="useFavicon = !useFavicon"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            切换为{{ useFavicon ? '字母图标' : '网站图标' }}
          </button>
        </div>

        <!-- 如果没有 favicon 或选择不使用，显示颜色选择器 -->
        <div v-if="!faviconUrl || !useFavicon" class="color-section">
          <p class="color-label">选择图标颜色</p>
          <div class="color-grid">
            <div 
              v-for="color in colors" 
              :key="color"
              class="color-item"
              :class="{ active: selectedColor === color }"
              :style="{ backgroundColor: color }"
              @click="selectedColor = color"
            >
              <svg 
                v-if="selectedColor === color" 
                class="check-icon" 
                viewBox="0 0 24 24" 
                fill="none" stroke="white">
                <path d="M20 6L9 17l-5-5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 保存按钮 -->
    <div class="footer">
      <button class="save-btn" @click="handleSave" :disabled="isSaving">
        <svg v-if="!isSaving" class="save-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke-width="2"/>
          <polyline points="17 21 17 13 7 13 7 21" stroke-width="2"/>
          <polyline points="7 3 7 8 15 8" stroke-width="2"/>
        </svg>
        <span v-if="isSaving">{{ isEditing ? '保存中...' : '添加中...' }}</span>
        <span v-else>{{ isEditing ? '保存' : '添加' }}</span>
      </button>
    </div>
  </div>  
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { BRAND_COLORS, getRandomColor } from '../../utils/color'
import { getCurrentTabInfo } from '../../utils/tab'
import { useVendorStore } from '../../store/vendor'
import {getFaviconFromActiveTab}  from '../../utils/favicon'

const router = useRouter()
const vendorStore = useVendorStore()

const vendorName = ref('')
const websiteUrl = ref('')
const selectedColor = ref('')
const faviconUrl = ref<string | undefined>(undefined)  // 新增：存储 favicon URL
const useFavicon = ref(true)  // 新增：是否使用 favicon
const colors = BRAND_COLORS
const isSaving = ref(false)
const isEditing = ref(false)
const editingId = ref<string | null>(null)

// 错误信息
const errors = reactive({
  vendorName: '',
  websiteUrl: ''
})

onMounted(async () => {
  // 先加载数据
  await vendorStore.loadVendors()
  
  // 检查是否是编辑模式
  const routeId = router.currentRoute.value.query.id as string
  
  if (routeId) {
    // 编辑模式
    isEditing.value = true
    editingId.value = routeId
    
    const vendor = vendorStore.getVendorById(routeId)
    
    if (vendor) {
      vendorName.value = vendor.vendorName
      websiteUrl.value = vendor.websiteUrl
      selectedColor.value = vendor.brandColor
      faviconUrl.value = vendor.faviconUrl  // 加载已保存的 favicon
      useFavicon.value = !!vendor.faviconUrl  // 如果有 favicon 则默认使用
    } else {
      // 如果找不到对应的模型，返回首页
      alert('未找到该模型')
      goBack()
    }
  } else {
    // 添加模式：随机选择颜色并获取当前标签页信息
    selectedColor.value = getRandomColor()
    
    const tabInfo = await getCurrentTabInfo()
    if (tabInfo) {
      websiteUrl.value = tabInfo.hostname
      vendorName.value = tabInfo.siteName
    }
    
    // 获取当前标签页的 favicon
    const favicon = await getFaviconFromActiveTab()
    if (favicon) {
      faviconUrl.value = favicon
      useFavicon.value = true  // 如果获取到 favicon，默认使用
    } else {
      useFavicon.value = false  // 没有 favicon，使用颜色
    }
  }
})

const goBack = () => {
  router.push('/')
}

// 验证表单
const validateForm = (): boolean => {
  // 清空之前的错误
  errors.vendorName = ''
  errors.websiteUrl = ''
  
  let isValid = true
  
  // 验证模型名称
  if (!vendorName.value.trim()) {
    errors.vendorName = '请输入模型名称'
    isValid = false
  }
  
  // 验证网站网址
  if (!websiteUrl.value.trim()) {
    errors.websiteUrl = '请输入网站网址'
    isValid = false
  }
  
  return isValid
}

const handleSave = async () => {
  // 验证表单
  if (!validateForm()) {
    return
  }
  
  isSaving.value = true
  
  try {
    // 根据用户选择决定是否保存 favicon
    const finalFaviconUrl = useFavicon.value ? faviconUrl.value : undefined
    
    if (isEditing.value && editingId.value) {
      // 编辑模式：更新现有模型
      await vendorStore.updateVendor(editingId.value, {
        vendorName: vendorName.value.trim(),
        websiteUrl: websiteUrl.value.trim(),
        brandColor: selectedColor.value,
        faviconUrl: finalFaviconUrl  // 保存 favicon（如果用户选择使用）
      })
    } else {
      // 添加模式：创建新模型
      await vendorStore.addVendor({
        vendorName: vendorName.value.trim(),
        websiteUrl: websiteUrl.value.trim(),
        brandColor: selectedColor.value,
        faviconUrl: finalFaviconUrl  // 保存 favicon（如果用户选择使用）
      })
    }
    
    // 保存成功后返回
    goBack()
  } catch (error) {
    console.error('保存失败:', error)
    alert(`保存失败: ${error instanceof Error ? error.message : '未知错误'}`)
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.add-vendor {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f8f9fa;
}

/* 头部 */
.header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.back-btn:hover {
  background-color: #f3f4f6;
}

.back-btn svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

/* 表单内容 */
.form-content {
  flex: 1;
  padding: 16px 12px;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.input {
  width: 100%;
  padding: 10px 12px;
  font-size: 13px;
  color: #6b7280;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.input:focus {
  border-color: #3B82F6;
}

.input::placeholder {
  color: #9ca3af;
}

.input-error {
  border-color: #EF4444;
}

.input-error:focus {
  border-color: #DC2626;
}

.error-message {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #EF4444;
}

/* 颜色选择器 */
.color-section {
  margin-top: 12px;
}

.color-label {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #6b7280;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  max-width: 280px;
}

.color-item {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-item:hover {
  transform: scale(1.1);
}

.color-item.active {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.check-icon {
  width: 18px;
  height: 18px;
  stroke-width: 3;
}

/* 图标预览区域 */
.icon-preview-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.icon-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.preview-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.favicon-preview {
  width: 70%;
  height: 70%;
  object-fit: contain;
}

.initial-preview {
  font-size: 20px;
  font-weight: 600;
  color: white;
}

.preview-info {
  flex: 1;
}

.preview-title {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.preview-desc {
  margin: 2px 0 0 0;
  font-size: 11px;
  color: #9ca3af;
}

.toggle-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 10px;
  font-size: 13px;
  font-weight: 500;
  color: #3B82F6;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-icon-btn:hover {
  background: #f9fafb;
  border-color: #3B82F6;
}

.toggle-icon-btn svg {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

/* 底部按钮 */
.footer {
  padding: 12px 12px 10px 12px;
  background-color: white;
  border-top: 1px solid #e5e7eb;
}

.save-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: #3B82F6;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-btn:hover {
  background-color: #2563EB;
}

.save-btn:active {
  transform: scale(0.98);
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.save-icon {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}
</style>
