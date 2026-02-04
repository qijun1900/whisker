/**
 * 获取网站的 favicon 图标
 */

/**
 * 方法1: 使用 Google 的 favicon 服务（推荐）
 * @param url 网站 URL
 * @returns favicon 图标 URL
 */
export function getFaviconByGoogle(url: string): string {
  const domain = extractDomain(url)
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}

/**
 * 方法2: 使用 DuckDuckGo 的 favicon 服务
 * @param url 网站 URL
 * @returns favicon 图标 URL
 */
export function getFaviconByDuckDuckGo(url: string): string {
  const domain = extractDomain(url)
  return `https://icons.duckduckgo.com/ip3/${domain}.ico`
}

/**
 * 方法3: 直接从网站根目录获取
 * @param url 网站 URL
 * @returns favicon 图标 URL
 */
export function getFaviconDirect(url: string): string {
  const domain = extractDomain(url)
  return `https://${domain}/favicon.ico`
}

/**
 * 方法4: 使用 Favicon Kit API
 * @param url 网站 URL
 * @returns favicon 图标 URL
 */
export function getFaviconByFaviconKit(url: string): string {
  const domain = extractDomain(url)
  return `https://api.faviconkit.com/${domain}/144`
}

/**
 * 方法5: 从当前标签页获取 favicon（仅在 content script 中使用）
 * @returns favicon 图标 URL 或 null
 */
export function getFaviconFromCurrentTab(): string | null {
  // 尝试从 link 标签获取
  const linkElements = document.querySelectorAll('link[rel*="icon"]')
  
  for (const link of linkElements) {
    const href = link.getAttribute('href')
    if (href) {
      // 如果是相对路径，转换为绝对路径
      if (href.startsWith('http')) {
        return href
      } else if (href.startsWith('//')) {
        return `https:${href}`
      } else if (href.startsWith('/')) {
        return `${window.location.origin}${href}`
      } else {
        return `${window.location.origin}/${href}`
      }
    }
  }
  
  // 如果没找到，返回默认路径
  return `${window.location.origin}/favicon.ico`
}

/**
 * 方法6: 使用 Chrome API 获取标签页 favicon（在 background/popup 中使用）
 * @param tabId 标签页 ID
 * @returns Promise<string | undefined>
 */
export async function getFaviconFromTab(tabId: number): Promise<string | undefined> {
  try {
    const tab = await chrome.tabs.get(tabId)
    return tab.favIconUrl
  } catch (error) {
    console.error('获取标签页 favicon 失败:', error)
    return undefined
  }
}

/**
 * 方法7: 获取当前活动标签页的 favicon
 * @returns Promise<string | undefined>
 */
export async function getFaviconFromActiveTab(): Promise<string | undefined> {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    return tab?.favIconUrl
  } catch (error) {
    console.error('获取活动标签页 favicon 失败:', error)
    return undefined
  }
}

/**
 * 智能获取 favicon（推荐使用）
 * 优先使用 Chrome API，失败则使用第三方服务
 * @param url 网站 URL
 * @param tabId 可选的标签页 ID
 * @returns Promise<string>
 */
export async function getFavicon(url: string, tabId?: number): Promise<string> {
  // 如果提供了 tabId，尝试从标签页获取
  if (tabId) {
    const faviconUrl = await getFaviconFromTab(tabId)
    if (faviconUrl) return faviconUrl
  }
  
  // 否则使用 Google 服务（最稳定）
  return getFaviconByGoogle(url)
}

/**
 * 从 URL 中提取域名
 * @param url 完整 URL
 * @returns 域名
 */
function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    // 如果 URL 格式不正确，尝试简单提取
    const cleaned = url.replace(/^https?:\/\//, '').split('/')[0]
    return cleaned || 'unknown'
  }
}

/**
 * 检查 favicon 是否可用
 * @param faviconUrl favicon URL
 * @returns Promise<boolean>
 */
export async function isFaviconAvailable(faviconUrl: string): Promise<boolean> {
  try {
    const response = await fetch(faviconUrl, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/**
 * 获取 favicon 并验证可用性，失败则返回备用方案
 * @param url 网站 URL
 * @returns Promise<string>
 */
export async function getFaviconWithFallback(url: string): Promise<string> {
  const methods = [
    () => getFaviconByGoogle(url),
    () => getFaviconByDuckDuckGo(url),
    () => getFaviconByFaviconKit(url),
    () => getFaviconDirect(url)
  ]
  
  for (const method of methods) {
    const faviconUrl = method()
    const isAvailable = await isFaviconAvailable(faviconUrl)
    if (isAvailable) {
      return faviconUrl
    }
  }
  
  // 所有方法都失败，返回 Google 的（即使失败也会显示默认图标）
  return getFaviconByGoogle(url)
}
