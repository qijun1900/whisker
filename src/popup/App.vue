<template>
  <div class="popup-container">
    <router-view />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.popup-container {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  min-height: 480px;
}
</style>
