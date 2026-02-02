<template>
  <header class="header">
    <div>
      <WInput 
        v-model="searchText" 
        placeholder="Search models..."
        :show-search-icon="true"
        :clearable="true"
        shape="round"
        width="280px"
        @update:model-value="handleSearch"
      />
    </div>
    <div 
    @click="handleGoAdd"
    class="icon" 
    title="添加新项目">
      <AddOne 
        theme="multi-color" 
        size="28" 
        :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import {AddOne} from '@icon-park/vue-next';
import {ref} from 'vue';
import WInput from '../../components/WInput.vue';
import { useRouter } from 'vue-router'

const searchText = ref<string>('');

const handleSearch = (value:string)=>{
  console.log(value)
}

const router = useRouter()

const handleGoAdd = () => {
  router.push('/add')
}

</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px 8px 5px;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 2px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.icon:hover {
  background-color: #f0f0f0;
  transform: scale(1.1) rotate(90deg);
}

.icon:active {
  transform: scale(0.95) rotate(90deg);
}
</style>
