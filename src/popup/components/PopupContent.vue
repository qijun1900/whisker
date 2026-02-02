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
  padding: 15px;
  overflow-y: auto;
}
</style>
