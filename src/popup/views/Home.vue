<template>
  <div class="home">
    <PopupHeader @search="handleSearch" />

    <PopupContent>
      <div v-if="filteredVendors.length > 0" class="vendor-list">
        <VendorItem
          v-for="vendor in filteredVendors"
          :key="vendor.id"
          :name="vendor.name"
          :url="vendor.url"
          :color="vendor.color"
          @open="handleOpen(vendor.id)"
          @edit="handleEdit(vendor.id)"
          @delete="handleDelete(vendor.id)"
          @check="handleCheck(vendor.id)"
        />
      </div>
      <div v-else class="empty-state">
        <p>{{ searchQuery ? '未找到匹配的模型' : '暂无模型，点击右上角添加' }}</p>
      </div>
    </PopupContent>
    <PopupFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PopupHeader from '../components/PopupHeader.vue'
import PopupContent from '../components/PopupContent.vue'
import PopupFooter from '../components/PopupFooter.vue'
import VendorItem from '../../components/VendorItem.vue'
import { useVendorActions } from '../../composables/useVendorActions'
import { useVendorList } from '../../composables/useVendorList'

// 使用封装的列表功能
const { 
  filteredVendors, 
  searchQuery, 
  handleSearch, 
  loadVendors  
} = useVendorList()

// 使用封装的操作函数
const { 
  handleEdit, 
  handleDelete, 
  handleOpen, 
  handleCheck 
} = useVendorActions()

// 页面加载时从 Chrome Storage 加载数据
onMounted(async () => {
  await loadVendors()
})
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.vendor-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #9ca3af;
  font-size: 14px;
  text-align: center;
}
</style>
