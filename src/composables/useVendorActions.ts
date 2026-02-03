import { useVendorStore } from '../store/vendor'
import { useRouter } from 'vue-router'

/**
 * 模型操作的组合式函数
 * 封装了编辑、删除、打开网站、查看对话等操作
 */
export function useVendorActions() {
  const vendorStore = useVendorStore()
  const router = useRouter()

  /**
   * 编辑模型
   * @param id 模型ID
   */
  const handleEdit = (id: string) => {
    router.push({ 
      path: '/add', 
      query: { id } 
    })
  }

  /**
   * 删除模型
   * @param id 模型ID
   */
  const handleDelete = async (id: string) => {
    if (confirm('确定要删除这个模型吗？')) {
      await vendorStore.removeVendor(id)
    }
  }

  /**
   * 打开网站
   * @param id 模型ID
   */
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

  /**
   * 查看对话
   * @param id 模型ID
   */
  const handleCheck = (id: string) => {
    const vendor = vendorStore.getVendorById(id)
    if (vendor) {
      console.log('查看对话模型:', vendor)
      // TODO: 实现查看对话功能
    }
  }

  return {
    handleEdit,
    handleDelete,
    handleOpen,
    handleCheck
  }
}
