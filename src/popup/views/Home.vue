<template>
  <div class="home">
    <PopupHeader />

    <PopupContent>
      <div class="vendor-list">
        <VendorItem
          v-for="vendor in vendors"
          :key="vendor.id"
          :name="vendor.name"
          :url="vendor.url"
          :color="vendor.color"
          @edit="handleEdit(vendor.id)"
          @delete="handleDelete(vendor.id)"
          @copy="handleCopy(vendor.id)"
          @open="handleOpen(vendor.id)"
          @favorite="handleFavorite(vendor.id)"
        />
      </div>
    </PopupContent>
    <PopupFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import PopupHeader from '../components/PopupHeader.vue'
import PopupContent from '../components/PopupContent.vue'
import PopupFooter from '../components/PopupFooter.vue'
import VendorItem from '../../components/VendorItem.vue'
import { useVendorStore } from '../../store/vendor'

const vendorStore = useVendorStore()

// 使用 computed 获取响应式数据
const vendors = computed(() => 
  vendorStore.vendors.map(v => ({
    id: v.id,
    name: v.vendorName,
    url: v.websiteUrl.replace(/^https?:\/\//, ''), 
    color: v.brandColor
  }))
)

// 页面加载时从 Chrome Storage 加载数据
onMounted(async () => {
  await vendorStore.loadVendors()
})

const handleEdit = (id: string) => {
  console.log('Edit vendor:', id)
}

const handleDelete = async (id: string) => {
  if (confirm('确定要删除这个模型吗？')) {
    await vendorStore.removeVendor(id)
  }
}

const handleCopy = (id: string) => {
  const vendor = vendorStore.getVendorById(id)
  if (vendor) {
    navigator.clipboard.writeText(vendor.websiteUrl)
  }
}

const handleOpen = (id: string) => {
  const vendor = vendorStore.getVendorById(id)
  if (vendor) {
    window.open(vendor.websiteUrl, '_blank')
  }
}

const handleFavorite = (id: string) => {
  console.log('Favorite vendor:', id)
}
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
</style>
