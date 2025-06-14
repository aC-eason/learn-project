export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title:"kithubs - Kittools Hub",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        {
          name: "msapplication-TileImage",
          content: "/logo.png",
        },
        {
          name: "robots",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        { property: "og:type", content: "website" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/logo.png",
        },
        {
          rel: "apple-touch-icon",
          type: "image/png",
          href: "/logo.png",
        },
      ],
      script: [
        // 第三方脚本
        {
          src: "https://g.alicdn.com/sls/sls-js-sdk/0.3.5/web-track-browser.js",
          async: true,
        },
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-K0SZ0R79SM",
          async: true,
        },
        //Google Analytics
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K0SZ0R79SM');
          `,
        }
      ],
    },
  },
});
