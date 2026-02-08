<template>
  <div class="side-header">
    <div class="header-content">
      <WInput 
        v-model="searchText" 
        placeholder="搜索内容 ..."
        :show-search-icon="true"
        :clearable="true"
        shape="round"
        @update:model-value="handleSearch"

        />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WInput from '../../components/WInput.vue';

const searchText = ref<string>('');

const handleSearch = (value: string) => {
  console.log('搜索内容:', value)
}
  

</script>

<style scoped>
.side-header {
  flex-shrink: 0;
  padding: 8px 10px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
