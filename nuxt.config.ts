export default defineNuxtConfig({
  css: ["~/assets/css/main.css","@/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: ["~/plugins/element-plus", "~/plugins/pinia-persistedstate"],
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    public: {
      googleClientId: "519092715425-725koi7qiqephplo3ur4cd9cu656j145.apps.googleusercontent.com",
    },
  },
  app: {
    head: {
      title: "kithubs - Kittools Hub",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { "http-equiv": "content-language", content: "en-GB" },
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        {
          name: "msapplication-TileImage",
          content: "https://kithubs.com/logo.png",
        },
        {
          name: "robots",
          content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        { property: "og:type", content: "website" },
        {
          name: "google-adsense-account",
          content: "ca-pub-5032705196359857",
        },
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
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5032705196359857",
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
        },
      ],
    },
  },
  nitro: {
    preset: "static",
  },
  experimental: {
    payloadExtraction: false,
  },
});
