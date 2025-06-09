
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Maya Tools - 便捷高效的Web工具集',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '提供各种常用的在线工具，提高您的工作效率，简化您的日常任务' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})