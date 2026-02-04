<template>
  <div 
    class="vendor-icon" 
    :data-size="size" 
    :style="{ backgroundColor: faviconUrl && showFavicon ? '#f3f4f6' : color }"
  >
    <img 
      v-if="faviconUrl && showFavicon" 
      :src="faviconUrl" 
      :alt="text" 
      class="favicon-img" 
      @error="handleImageError" 
    />
    <span v-else>{{ displayText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  /** 显示的文本内容 */
  text?: string
  /** 背景颜色 */
  color?: string
  /** 图标大小，可选值：small(32px), medium(48px), large(64px) */
  size?: 'small' | 'medium' | 'large'
  /** Favicon URL */
  faviconUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  color: '#42b983',
  size: 'medium',
  faviconUrl: undefined
})

const showFavicon = ref(true)

const displayText = computed(() => {
  return props.text || '?'
})

const handleImageError = () => {
  // 如果图片加载失败，显示文字
  showFavicon.value = false
}
</script>

<style scoped>
.vendor-icon {
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
  overflow: hidden;
}

.vendor-icon {
  width: 48px;
  height: 48px;
  font-size: 20px;
}

.favicon-img {
  width: 70%;
  height: 70%;
  object-fit: contain;
}

/* 可以通过 size prop 控制大小 */
.vendor-icon[data-size="small"] {
  width: 32px;
  height: 32px;
  font-size: 14px;
  border-radius: 8px;
}

.vendor-icon[data-size="small"] .favicon-img {
  width: 65%;
  height: 65%;
}

.vendor-icon[data-size="large"] {
  width: 64px;
  height: 64px;
  font-size: 28px;
  border-radius: 16px;
}

.vendor-icon[data-size="large"] .favicon-img {
  width: 75%;
  height: 75%;
}
</style>
