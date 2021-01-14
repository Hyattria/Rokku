/* eslint-disable no-param-reassign */
module.exports = {
  name: 'Rokku',
  build: {
    css: {
      preprocessor: 'less',
    },
    site: {
      publicPath: './',
    },
  },
  site: {
    defaultLang: 'zh-CN',
    locales: {
      'zh-CN': {
        title: 'Rokku',
        description: '轻量、可靠的移动端 React 组件库',
        logo: 'http://www.rokku.icu/image/logo.png',
        langLabel: '中文',
        links: [
          {
            logo: 'http://www.rokku.icu/image/github.png',
            url: 'https://github.com/Hyattria/rokku',
          },
        ],
        searchConfig: {
          apiKey: '90067aecdaa2c85220e2783cd305caac',
          indexName: 'vant',
          placeholder: '搜索文档...',
          transformData(hits) {
            if (window.location.hostname === 'vant-contrib.gitee.io') {
              hits.forEach((hit) => {
                if (hit.url) {
                  hit.url = hit.url.replace('youzan.github.io', 'vant-contrib.gitee.io');
                }
              });
            }
          },
        },
        nav: [
          {
            title: '开发指南',
            items: [
              {
                path: 'home',
                title: '介绍',
              },
              {
                path: 'quickstart',
                title: '快速上手',
              },
              {
                path: 'theme',
                title: '定制主题',
              },
              {
                path: 'contribution',
                title: '开发指南',
              },
            ],
          },
          {
            title: '布局组件',
            items: [
              {
                path: 'flex',
                title: 'Flex 布局',
              },
            ],
          },
          {
            title: '基础组件',
            items: [
              {
                path: 'button',
                title: 'Button 按钮',
              },
              {
                path: 'cell',
                title: 'Cell 单元格',
              },
              {
                path: 'icon',
                title: 'Icon 图标',
              },
              {
                path: 'popup',
                title: 'Popup 弹出层',
              },
              {
                path: 'styles',
                title: 'Style 内置样式',
              },
              {
                path: 'toast',
                title: 'Toast 轻提示',
              },
            ],
          },
          {
            title: '表单组件',
            items: [
              {
                path: 'field',
                title: 'Field 输入框',
              },
              {
                path: 'search',
                title: 'Search 搜索',
              },
            ],
          },
          {
            title: '反馈组件',
            items: [
              {
                path: 'dialog',
                title: 'Dialog 弹出框',
              },
              {
                path: 'loading',
                title: 'Loading 加载',
              },
              {
                path: 'overlay',
                title: 'Overlay 遮罩层',
              },
              {
                path: 'pull-refresh',
                title: 'PullRefresh 下拉刷新',
              },
            ],
          },
          {
            title: '展示组件',
            items: [
              {
                path: 'collapse',
                title: 'Collapse 折叠面板',
              },
              {
                path: 'empty',
                title: 'Empty 空状态',
              },
              {
                path: 'list',
                title: 'List 列表',
              },
              {
                path: 'notice-bar',
                title: 'NoticeBar 通知栏',
              },
              {
                path: 'sticky',
                title: 'Sticky 粘性布局',
              },
              {
                path: 'swipe',
                title: 'Swipe 轮播',
              },
              {
                path: 'tag',
                title: 'Tag 标签',
              },
            ],
          },
          {
            title: '导航组件',
            items: [
              {
                path: 'index-bar',
                title: 'IndexBar 索引栏',
              },
              {
                path: 'nav-bar',
                title: 'NavBar 导航栏',
              },
              {
                path: 'tabs',
                title: 'Tabs 标签页',
              },
            ],
          },
          {
            title: '业务组件',
            items: [
              {
                path: 'complain',
                title: 'Complain 问题申诉',
              },
            ],
          },
        ],
      },
      'en-US': {
        title: 'Rokku',
        description: 'Mobile UI Components built on React',
        logo: 'http://www.rokku.icu/logo.png',
        langLabel: 'En',
        links: [
          {
            logo: 'http://www.rokku.icu/github.png',
            url: 'https://github.com/Hyattria/rokku',
          },
        ],
        searchConfig: {
          apiKey: '90067aecdaa2c85220e2783cd305caac',
          indexName: 'vant',
          placeholder: 'Search...',
        },
        nav: [
          {
            title: 'Essentials',
            items: [
              {
                path: 'home',
                title: 'Introduction',
              },
              {
                path: 'quickstart',
                title: 'Quickstart',
              },
              {
                path: 'theme',
                title: 'Custom Theme',
              },
            ],
          },
          {
            title: 'Basic Components',
            items: [
              {
                path: 'button',
                title: 'Button',
              },
            ],
          },
        ],
      },
    },
  },
};
