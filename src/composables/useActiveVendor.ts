import { ref, onMounted } from 'vue'

/**
 * 管理侧边栏激活的 vendor ID
 * 从 Chrome Storage 读取并监听变化
 */
export function useActiveVendor() {
  const activeVendorId = ref<string>('')

  /**
   * 初始化：读取激活的 vendor ID 并设置监听器
   */
  const initActiveVendor = async () => {
    // 读取激活的 vendor ID
    const result = await chrome.storage.local.get('activeSidePanelVendorId')
    if (result.activeSidePanelVendorId) {
      activeVendorId.value = result.activeSidePanelVendorId as string
      
      // 清除标记，避免下次打开时还是这个
      await chrome.storage.local.remove('activeSidePanelVendorId')
    }
    
    // 监听 storage 变化（实时更新）
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes.activeSidePanelVendorId) {
        const newId = changes.activeSidePanelVendorId.newValue
        if (newId && typeof newId === 'string') {
          activeVendorId.value = newId
          console.log('侧边栏激活更新:', newId)
        }
      }
    })
  }

  // 自动初始化
  onMounted(async () => {
    await initActiveVendor()
  })

  return {
    activeVendorId,
    initActiveVendor
  }
}
