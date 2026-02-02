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
      <h1 class="title">添加新模型</h1>
    </header>

    <!-- 表单内容 -->
    <div class="form-content">
      <!-- 供应商名称 -->
      <div class="form-group">
        <label class="label">供应商名称</label>
        <input 
          v-model="vendorName"
          type="text" 
          class="input" 
          placeholder="e.g. OpenAI"
        />
      </div>

      <!-- 网站网址 -->
      <div class="form-group">
        <label class="label">网站网址</label>
        <input 
          v-model="websiteUrl"
          type="url" 
          class="input" 
          placeholder="https://chat.openai.com"
        />
      </div>

      <!-- 图标颜色 --> 
      <div class="form-group">
        <label class="label">图标颜色</label>
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

    <!-- 保存按钮 -->
    <div class="footer">
      <button class="save-btn" @click="handleSave">
        <svg class="save-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke-width="2"/>
          <polyline points="17 21 17 13 7 13 7 21" stroke-width="2"/>
          <polyline points="7 3 7 8 15 8" stroke-width="2"/>
        </svg>
        保存
      </button>
    </div>
  </div>  
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { BRAND_COLORS, getRandomColor } from '../../utils/color'

const router = useRouter()

const vendorName = ref('')
const websiteUrl = ref('')
const selectedColor = ref('')
const colors = BRAND_COLORS

// 页面加载时随机选择一个颜色
onMounted(() => {
  selectedColor.value = getRandomColor()
})


const goBack = () => {
  router.push('/')
}

const handleSave = () => {
  console.log({
    vendorName: vendorName.value,
    websiteUrl: websiteUrl.value,
    brandColor: selectedColor.value
  })
  // 保存后返回
  goBack()
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

/* 颜色选择器 */
.color-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  max-width: 200px;
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

.save-icon {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}
</style>
