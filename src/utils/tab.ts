/**
 * 标签页相关工具函数
 */

/**
 * 获取当前活动标签页的信息
 * @returns Promise<{ hostname: string, siteName: string } | null>
 * 
 * @example
 * const tabInfo = await getCurrentTabInfo()
 * if (tabInfo) {
 *   console.log(tabInfo.hostname) // 'chat.openai.com'
 *   console.log(tabInfo.siteName) // 'Openai'
 * }
 */
export async function getCurrentTabInfo(): Promise<{ hostname: string; siteName: string } | null> {
  try {
    const [tab] = await chrome.tabs.query({ 
      active: true,      // 仅获取活动标签页
      currentWindow: true // 仅获取当前窗口的标签页
    })
    
    if (!tab?.url) {
      return null
    }
    
    const url = new URL(tab.url)
    const hostname = url.hostname
    
    // 提取网站名称
    const siteName = extractSiteName(hostname)
    
    return {
      hostname,
      siteName
    }
  } catch (error) {
    console.error('获取当前标签页信息失败:', error)
    return null
  }
}

/**
 * 从域名中提取网站名称
 * @param hostname - 域名，例如 'chat.openai.com'
 * @returns 网站名称，首字母大写，例如 'Openai'
 * 
 * @example
 * extractSiteName('chat.openai.com') // 'Openai'
 * extractSiteName('www.google.com') // 'Google'
 * extractSiteName('github.com') // 'Github'
 */
export function extractSiteName(hostname: string): string {
  // 移除 www. 前缀
  const cleanHostname = hostname.replace(/^www\./, '')
  
  // 分割域名
  const parts = cleanHostname.split('.')
  
  if (parts.length >= 2) {
    // 取倒数第二个部分作为名称（主域名）
    const siteName = parts[parts.length - 2] || ''
    // 首字母大写
    return siteName.charAt(0).toUpperCase() + siteName.slice(1)
  }
  
  // 如果只有一个部分，直接返回首字母大写
  return cleanHostname.charAt(0).toUpperCase() + cleanHostname.slice(1)
}
