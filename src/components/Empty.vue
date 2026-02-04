<template>
  <div class="empty">
    <div class="empty-icon" :class="{ 'no-animation': !animated }">
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- 文件夹 -->
        <path d="M8 16C8 13.7909 9.79086 12 12 12H24L28 16H52C54.2091 16 56 17.7909 56 20V48C56 50.2091 54.2091 52 52 52H12C9.79086 52 8 50.2091 8 48V16Z" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="2"/>
        <!-- 空文件夹线条 -->
        <line x1="20" y1="28" x2="44" y2="28" stroke="#E5E7EB" stroke-width="2" stroke-linecap="round"/>
        <line x1="20" y1="36" x2="36" y2="36" stroke="#E5E7EB" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <p class="empty-text">{{ text }}</p>
    <p v-if="description" class="empty-description">{{ description }}</p>
    <slot name="action"></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  description?: string
  animated?: boolean
}

withDefaults(defineProps<Props>(), {
  text: '暂无数据',
  description: '',
  animated: true
})
</script>

<style scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-icon {
  margin-bottom: 16px;
  animation: float 3s ease-in-out infinite;
}

.empty-icon.no-animation {
  animation: none;
}

.empty-icon svg {
  width: 80px;
  height: 80px;
}

.empty-text {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
}

.empty-description {
  margin: 0 0 16px 0;
  font-size: 12px;
  color: #9CA3AF;
  max-width: 240px;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
