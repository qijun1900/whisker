<template>
  <main class="content">
    <slot>
      <p>内容区域</p>
    </slot>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
.content {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f8f9fa;
}

/* 隐藏滚动条但保留滚动功能 */
.content::-webkit-scrollbar {
  display: none;
}

.content {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
