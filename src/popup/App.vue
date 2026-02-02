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
  width: 350px;
  height: 490px;
  max-height: 490px;
  overflow: hidden;
}
</style>
