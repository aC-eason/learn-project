<script setup>
const props = defineProps({
  who_title: {
    default: "",
  },

  who_data: {
    default: () => [],
  },
  color: {
    default: () => "#f23345",
  },
});
</script>
<template>
  <div class="who">
    <h2 class="who-title">{{ who_title }}</h2>
    <div class="who-items">
      <div class="who-item" v-for="(item, index) in who_data" :key="index">
        <img :src="item.img" :alt="item.alt" />
        <h3 :style="index % 2 == 0 ? { color: color } : {}">
          {{ item.h3_title }}
        </h3>
        <div class="who-item-desc">
          {{ item.desc }}
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  
  <style scoped>
.who {
  max-width: 1200px;
  margin: 50px auto;
}

.who-title{
       color: #fff;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: center; 
}

.who-items {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 56px;
  
}

.who-item {
  max-width: 350px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}

.who-item img {
  width: 60px;
  height: 60px;
}

.who-item h3 {
  margin: 28px 0 28px 0;
  font-size: 20px;
  font-weight: 500;
  font-variation-settings: "opsz" auto;
  max-width: 270px;
  height: 25px;
  text-align: center;
}

/* .who-h3-red {
  color: #f23345;
}

.who-h3 {
  color: #1f293b;
} */

.who-item-desc {
  font-size: 18px;
  font-weight: normal;
  line-height: 28px;
  letter-spacing: 0px;
  font-feature-settings: "kern" on;
  color: #5f5f64;
}
@media  (max-width: 768px) {
  .who-item{
    width:95%;
  }
}
</style>