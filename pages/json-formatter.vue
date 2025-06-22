<script setup>
useHead({
  title: "JSON Formatter - Free Online Tool | Kithubs",
  meta: [
    {
      name: "description",
      content:
        "Format and validate JSON instantly with Kithubs' free online tool. Beautify, edit, and parse JSON data easily. Try now!",
    },
    { charset: "UTF-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
    {
      name: "robots",
      content:
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    { property: "og:url", content: "https://kithubs.com/json-formatter" },
    {
      property: "og:title",
      content: "JSON Formatter - Free Online Tool | Kithubs",
    },
    {
      property: "og:description",
      content:
        "Format and validate JSON instantly with Kithubs' free online tool. Beautify, edit, and parse JSON data easily. Try now!",
    },
    {
      property: "og:image",
      content: "https://kithubs.com/logo.png",
    },
  ],
  link: [{ rel: "canonical", href: "https://kithubs.com/json-formatter" }],
  script: [
    // JSON-LD
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Kithubs JSON Formatter - Free Online Utility",
        description:
          "Easily format, validate, and beautify JSON data with Kithubs’ free online tool. Parse and edit JSON effortlessly, no signup required!",
        url: "https://kithubs.com/json-formatter",
        logo: "https://kithubs.com/logo.png",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "JSON Formatter",
          "JSON Validator",
          "JSON Beautifier",
          "JSON Minifier",
          "JSON Viewer",
        ],
        author: {
          "@type": "Organization",
          name: "Chenyx",
        },
      }),
    },
  ],
});
</script>
<template>
  <div>
    <json-parser-tool />
  </div>
</template>

<style scoped>
</style>