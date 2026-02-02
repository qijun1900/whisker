<template>
  <div class="home">
    <PopupHeader />

    <PopupContent>
      <p>主页内容</p>
    </PopupContent>

    <PopupFooter>
      <p>底部区域</p>
    </PopupFooter>
  </div>
</template>

<script setup lang="ts">
import PopupHeader from '../components/PopupHeader.vue'
import PopupContent from '../components/PopupContent.vue'
import PopupFooter from '../components/PopupFooter.vue'
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
