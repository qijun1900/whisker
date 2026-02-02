<template>
  <footer class="footer">
    <div class="footer-buttons">
      <button class="settings-btn" @click="handleOpenSettings" title="设置">
        <svg 
        class="settings-icon" 
        viewBox="0 0 48 48" fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <path d="M18.2838 43.1713C14.9327 42.1736 11.9498 40.3213 9.58787 37.867C10.469 36.8227 11 35.4734 11 34.0001C11 30.6864 8.31371 28.0001 5 28.0001C4.79955 28.0001 4.60139 28.01 4.40599 28.0292C4.13979 26.7277 4 25.3803 4 24.0001C4 21.9095 4.32077 19.8938 4.91579 17.9995C4.94381 17.9999 4.97188 18.0001 5 18.0001C8.31371 18.0001 11 15.3138 11 12.0001C11 11.0488 10.7786 10.1493 10.3846 9.35011C12.6975 7.1995 15.5205 5.59002 18.6521 4.72314C19.6444 6.66819 21.6667 8.00013 24 8.00013C26.3333 8.00013 28.3556 6.66819 29.3479 4.72314C32.4795 5.59002 35.3025 7.1995 37.6154 9.35011C37.2214 10.1493 37 11.0488 37 12.0001C37 15.3138 39.6863 18.0001 43 18.0001C43.0281 18.0001 43.0562 17.9999 43.0842 17.9995C43.6792 19.8938 44 21.9095 44 24.0001C44 25.3803 43.8602 26.7277 43.594 28.0292C43.3986 28.01 43.2005 28.0001 43 28.0001C39.6863 28.0001 37 30.6864 37 34.0001C37 35.4734 37.531 36.8227 38.4121 37.867C36.0502 40.3213 33.0673 42.1736 29.7162 43.1713C28.9428 40.752 26.676 39.0001 24 39.0001C21.324 39.0001 19.0572 40.752 18.2838 43.1713Z" fill="none" stroke="#333" stroke-width="3" stroke-linejoin="round"/><path d="M24 31C27.866 31 31 27.866 31 24C31 20.134 27.866 17 24 17C20.134 17 17 20.134 17 24C17 27.866 20.134 31 24 31Z" fill="none" stroke="#333" stroke-width="3" stroke-linejoin="round"/></svg>
      </button>
      <button class="sidebar-btn" @click="handleOpenSidebar">
        <svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
          <line x1="9" y1="3" x2="9" y2="21" stroke-width="2"/>
        </svg>
        打开侧边栏
      </button>
    </div>
    
    <div class="footer-info">
      <span class="version">v1.0.0</span>
      <span class="separator">•</span>
      <a 
        href="https://github.com/qijun1900/whisker" 
        target="_blank" 
        class="github-link"
        title="View on GitHub"
      >
       <github-one theme="outline" size="18" fill="#333" class="github-icon"/>
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {GithubOne} from '@icon-park/vue-next';

const handleOpenSidebar = () => {
  // 打开侧边栏
}

const handleOpenSettings = () => {
  console.log('Open settings')
  // 这里可以跳转到设置页面或打开设置弹窗
}
</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 12px;
  background-color: #f8f9fa;
}

.footer-buttons {
  display: flex;
  gap: 8px;
}

.sidebar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.sidebar-btn:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.sidebar-btn:active {
  transform: translateY(0);
}

.sidebar-icon {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.settings-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  padding: 10px;
  color: #374151;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.settings-btn:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.settings-btn:active {
  transform: translateY(0);
}

.settings-icon {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

.footer-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  color: #9ca3af;
}

.version {
  font-weight: 500;
}

.separator {
  color: #d1d5db;
}

.github-link {
  display: flex;
  align-items: center;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
}

.github-link:hover {
  color: #374151;
}

.github-icon {
  width: 16px;
  height: 16px;
}
</style>
