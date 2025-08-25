<template>
  <div class="how">
    <h2>{{ how_to_title }}</h2>

    <div class="how-desc">{{ how_to_desc }}</div>
    <div class="how-items">
      <div class="how-item" v-for="(item, index) in how_data" :key="index">
        <img :src="item.img" :alt="item.src" />
        <h3>{{ item.h3_title }}</h3>
        <div class="item-desc">
          {{ item.desc }}
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  how_to_title: {
    default: "",
  },
  how_to_desc: {
    default: "",
  },
  how_data: {
    default: () => [],
  },
});
</script>
  
  <style>
h2 {
  font-size: 32px;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  letter-spacing: 0px;
  font-feature-settings: "kern" on;
  color: #332929;
}

.how {
  max-width: 1300px;
  margin: 180px auto;
}

.how-desc {
  font-size: 16px;
  font-weight: normal;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0.16px;
  font-variation-settings: "opsz" auto;
  color: #5f5f64;
  margin: 28px 0 74px 0;
}

.how-items {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.how-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.how-items .how-item img {
  max-width: 100%;
  height: 333px;
  object-fit: contain;
}

.how-items .how-item h3 {
  margin: 44px 0 18px 0;
}

.item-desc {
  font-size: 18px;
  font-weight: normal;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.16px;
  font-variation-settings: "opsz" auto;
  color: #5f5f64;
  max-width: 330px;
}

@media (max-width: 768px) {
  .how-items {
    flex-direction: column;
  }
  .how-items .how-item img {
    height: auto;
  }
}
</style>