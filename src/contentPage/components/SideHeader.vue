<template>
  <div class="side-header">
    <div class="header-content">
      <h2 class="title">{{ title }}</h2>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'AI 模型'
})
</script>

<style scoped>
.side-header {
  flex-shrink: 0; /* 防止被压缩 */
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.actions {
  display: flex;
  gap: 8px;
}
</style>
