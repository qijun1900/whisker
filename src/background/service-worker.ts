import { getRandomColor } from '../utils/color'
import { extractSiteName } from '../utils/tab'
import { getFaviconFromTab } from '../utils/favicon'

console.log("Whisker background service worker started")

/**
 * 创建右键菜单
 */
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed, creating context menus...");

  // 创建父菜单
  chrome.contextMenus.create({
    id: "whisker-menu",
    title: "Whisker",
    contexts: ["page", "selection", "link"],
  });

  // 子菜单：添加网址
  chrome.contextMenus.create({
    id: "open-add-url",
    parentId: "whisker-menu",
    title: "添加网址",
    contexts: ["page"],
  });

  // 子菜单：打开侧边栏
  chrome.contextMenus.create({
    id: "open-sidebar",
    parentId: "whisker-menu",
    title: "打开侧边栏",
    contexts: ["page"],
  });
});

/**
 * 处理右键菜单点击事件
 */
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  switch (info.menuItemId) {
    case "open-sidebar":
      // 打开侧边栏
      if (tab?.windowId) {
        chrome.sidePanel
          .open({ windowId: tab.windowId })
          .then(() => console.log("Sidebar opened"))
          .catch((err) => console.error("Failed to open sidebar:", err));
      }
      break;
      
    case "open-add-url":
      // 添加当前网站
      if (tab?.url && tab?.title && tab?.id) {
        try {
          const url = new URL(tab.url)
          const hostname = url.hostname
          
          // 使用工具函数提取网站名称
          const siteName = extractSiteName(hostname)
          
          // 获取 favicon
          const faviconUrl = await getFaviconFromTab(tab.id)
          
          // 获取当前存储的模型列表
          chrome.storage.local.get('vendors', (result) => {
            const vendors: any[] = Array.isArray(result.vendors) ? result.vendors : []
            
            // 检查是否已存在（比较完整 URL）
            const exists = vendors.some((v) => {
              try {
                const existingUrl = new URL(v.websiteUrl)
                return existingUrl.hostname === hostname
              } catch {
                return false
              }
            })
            
            if (exists) {
              // 显示已存在提示
              chrome.notifications.create({
                type: 'basic',
                iconUrl: 'public/icons/icon48.png',
                title: 'Whisker',
                message: `${siteName} 已存在于列表中`,
                priority: 1
              })
              return
            }
            
            // 添加新模型
            const newVendor = {
              id: `vendor_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
              vendorName: siteName,
              websiteUrl: url.origin,
              brandColor: getRandomColor(), // 使用随机颜色（作为备用）
              faviconUrl: faviconUrl, // 添加 favicon URL
              createdAt: Date.now()
            }
            
            vendors.push(newVendor)
            
            // 保存到 Chrome Storage
            chrome.storage.local.set({ vendors }, () => {
              // 显示成功提示
              const iconType = faviconUrl ? '使用网站图标' : '使用字母图标'
              chrome.notifications.create({
                type: 'basic',
                iconUrl: 'public/icons/icon48.png',
                title: 'Whisker',
                message: `✅ 已添加 ${siteName} (${iconType})`,
                priority: 1
              })
            })
          })
        } catch (error) {
          console.error('❌ Failed to add site:', error)
          // 显示错误提示
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'public/icons/icon48.png',
            title: 'Whisker',
            message: '❌ 添加失败，请重试',
            priority: 2
          })
        }
      }
      break
  }
});

/**
 * 监听来自 popup 的消息打开侧边栏
 */
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "openSidePanel") {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs[0];
      if (tab?.windowId) {
        try {
          await chrome.sidePanel.open({ windowId: tab.windowId });
          sendResponse({ success: true });
        } catch (error) {
          console.error("打开侧边栏失败:", error);
          sendResponse({ success: false, error: String(error) });
        }
      }
    });
    return true; // 保持消息通道开启以支持异步响应
  }
});
