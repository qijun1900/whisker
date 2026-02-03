console.log('this is background service worker file')
/**
    运行在扩展的后台，独立于任何网页。

    作用：

    处理扩展的全局逻辑
    监听浏览器事件（标签页、书签、下载等）
    管理扩展状态
    作为 popup 和 content script 之间的消息中转站
    特点：

    始终在后台运行（按需激活）
    可以访问完整的 Chrome API
    打印输出在扩展管理页面的控制台（chrome://extensions/ → 点击"service worker"）
    使用场景：

    监听浏览器事件
    数据存储和管理
    定时任务
    消息通信中心
 */