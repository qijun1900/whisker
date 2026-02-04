import { computed, ref } from 'vue'
import { useVendorStore } from '../store/vendor'

/**
 * 模型列表的组合式函数
 * 封装了模型列表的获取、搜索、过滤等功能
 */
export function useVendorList() {
  const vendorStore = useVendorStore()
  const searchQuery = ref('')
  
  /**
   * 格式化后的模型列表
   * 将 store 中的数据转换为视图需要的格式
   */
  const vendors = computed(() => 
    vendorStore.vendors.map(v => ({
      id: v.id,
      name: v.vendorName,
      url: v.websiteUrl.replace(/^https?:\/\//, ''), 
      color: v.brandColor,
      faviconUrl: v.faviconUrl  // 添加 faviconUrl
    }))
  )

  /**
   * 过滤后的模型列表
   * 根据搜索关键词过滤模型名称和网址
   */
  const filteredVendors = computed(() => {
    if (!searchQuery.value.trim()) {
      return vendors.value
    }
    
    const query = searchQuery.value.toLowerCase()
    return vendors.value.filter(vendor => 
      vendor.name.toLowerCase().includes(query)
    )
  })

  /**
   * 处理搜索
   * @param value 搜索关键词
   */
  const handleSearch = (value: string) => {
    searchQuery.value = value
  }

  /**
   * 加载模型列表
   * 从 Chrome Storage 加载数据
   */
  const loadVendors = async () => {
    await vendorStore.loadVendors()
  }

  return {
    vendors,
    filteredVendors,
    searchQuery,
    handleSearch,
    loadVendors
  }
}
