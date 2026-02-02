<template>
  <footer class="footer">
    <slot>
      <p>底部区域</p>
    </slot>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer {
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  text-align: center;
  font-size: 12px;
  color: #666;
}

.footer p {
  margin: 0;
}
</style>
