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
          @open="handleOpen(vendor.id)"
          @edit="handleEdit(vendor.id)"
          @delete="handleDelete(vendor.id)"
          @check="handleCheck(vendor.id)"
        />
      </div>
    </PopupContent>
    <PopupFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import router from '../router'
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

// 编辑模型
const handleEdit = (id: string) => {
  // 跳转到编辑页面，通过 query 参数传递 id
  router.push({ 
    path: '/add', query: { id } 
  })
}

// 删除模型
const handleDelete = async (id: string) => {
  if (confirm('确定要删除这个模型吗？')) {
    await vendorStore.removeVendor(id)
  }
}

// 打开网站
const handleOpen = (id: string) => {
  const vendor = vendorStore.getVendorById(id)
  if (vendor) {
    // 确保 URL 包含协议
    let url = vendor.websiteUrl
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }
    // 在新标签页打开
    window.open(url, '_blank')
  }
}

// 查看对话
const handleCheck = (id: string) => {
 console.log('查看对话模型ID：', id)
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
