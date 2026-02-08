<template>
  <div class="side-content">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.side-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f9fafb;
  min-height: 0; /* 关键：允许 flex 子项收缩 */
  
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.side-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
