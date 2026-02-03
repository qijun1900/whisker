import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Vendor {
  id: string
  vendorName: string
  websiteUrl: string
  brandColor: string
  createdAt: number
}

export const useVendorStore = defineStore('vendor', () => {
  // State
  const vendors = ref<Vendor[]>([])
  const isLoading = ref(false)

  // Getters
  const vendorCount = computed(() => vendors.value.length)
  
  // 改为普通函数，不使用 computed
  function getVendorById(id: string) {
    return vendors.value.find(v => v.id === id)
  }

  // Actions
  // 从 Chrome Storage 加载数据
  async function loadVendors() {
    isLoading.value = true
    try {
      // 检查 Chrome Extension API 是否可用
      if (typeof chrome === 'undefined' || !chrome.storage) {
        const stored = localStorage.getItem('vendors')
        vendors.value = stored ? JSON.parse(stored) : []
        return
      }
      
      const result = await chrome.storage.local.get('vendors')
      const loadedVendors = result.vendors
      vendors.value = Array.isArray(loadedVendors) ? loadedVendors : []
    } catch (error) {
      console.error('加载模型列表失败:', error)
      vendors.value = []
    } finally {
      isLoading.value = false
    }
  }

  // 保存到 Chrome Storage
  async function saveVendors() {
    try {
      // 检查 Chrome Extension API 是否可用
      if (typeof chrome === 'undefined' || !chrome.storage) {
        localStorage.setItem('vendors', JSON.stringify(vendors.value))
        return
      }
      
      // 转换为普通数组（去除 Vue 响应式代理）
      const plainVendors = JSON.parse(JSON.stringify(vendors.value))
      await chrome.storage.local.set({ vendors: plainVendors })//({key: 'vendors', value: plainVendors })
    } catch (error) {
      console.error('保存模型列表失败:', error)
      throw error
    }
  }

  // 添加新模型
  async function addVendor(vendor: Omit<Vendor, 'id' | 'createdAt'>) {
    const newVendor: Vendor = {
      ...vendor,
      id: `vendor_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      createdAt: Date.now()
    }
    
    // 确保 vendors 是数组
    if (!Array.isArray(vendors.value)) {
      vendors.value = []
    }
    
    vendors.value.push(newVendor)
    await saveVendors()
    
    return newVendor
  }

  // 删除模型
  async function removeVendor(id: string) {
    const index = vendors.value.findIndex(v => v.id === id)
    if (index > -1) {
      vendors.value.splice(index, 1)
      await saveVendors()
    }
  }

  // 更新模型
  async function updateVendor(id: string, updates: Partial<Vendor>) {
    const vendor = vendors.value.find(v => v.id === id)
    if (vendor) {
      Object.assign(vendor, updates)
      await saveVendors()
    }
  }

  return {
    // State
    vendors,
    isLoading,
    // Getters
    vendorCount,
    getVendorById,
    // Actions
    loadVendors,
    saveVendors,
    addVendor,
    removeVendor,
    updateVendor
  }
})
