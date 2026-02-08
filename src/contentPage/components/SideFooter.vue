<template>
  <div class="side-footer">
    <div class="footer-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.side-footer {
  flex-shrink: 0; /* 防止被压缩 */
  padding: 12px 20px;
  border-top: 1px solid #e5e7eb;
  background: #fff;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
}
</style>
