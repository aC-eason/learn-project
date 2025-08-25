<!-- app/error.vue -->
<template>
  <div class="error-page">
    <div class="error-content">
      <h1 class="error-code">{{ error.statusCode }}</h1>
      <p class="error-message" v-if="error.statusCode === 404">
        Oops! The page you are looking for does not exist.
      </p>
      <p class="error-message" v-else>
        Sorry! Something went wrong. Status: {{ error.statusCode }}
      </p>
      <NuxtLink to="/" class="home-link">← Go Back Home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #885ecc 0%, #ACB6E5 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.error-content {
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 50px 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  animation: fadeIn 1s ease-in-out;
}

.error-code {
  font-size: 96px;
  font-weight: bold;
  color: #ff6b6b;
  margin: 0;
}

.error-message {
  font-size: 20px;
  margin: 20px 0;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  color: #fff;
  background-color: #ff6b6b;
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.home-link:hover {
  background-color: #ff8787;
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
}
</style>
