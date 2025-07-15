<script setup>
import { ref } from 'vue'

const props = defineProps({
  span: {
    type: String,
    default: ""
  },
  h2: {
    type: String,
    default: "Frequently Asked Questions"
  },
  faqs_data: {
    type: Array,
    default: () => [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our customer service team to initiate a return."
      },
      {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 3-5 business days, while express shipping takes 1-2 business days. International shipping may take 7-14 business days."
      },
      {
        question: "Do you offer customer support?",
        answer: "Yes, we provide 24/7 customer support through live chat, email, and phone. Our support team is always ready to help you with any questions or concerns."
      },
      {
        question: "Can I track my order?",
        answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website."
      }
    ]
  }
})

const activeIndex = ref(null)
const handleClick = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
  // 保留原有的handleAlicdn调用
  const handleAlicdn = window.handleAlicdn; // 声明handleAlicdn变量
  if (typeof handleAlicdn === 'function') {
    handleAlicdn(`question${index + 1}`)
  }
}
</script>

<template>
  <div class="faq-container">
    <!-- 标题区域 -->
    <div class="faq-header">
      <div class="faq-subtitle" v-if="span">{{ span }}</div>
      <h2 class="faq-title">{{ h2 }}</h2>
      <div class="faq-divider"></div>
    </div>

    <!-- FAQ内容区域 -->
    <div class="faq-content">
      <div class="faq-wrapper">
        <div 
          v-for="(faq, index) in faqs_data" 
          :key="index"
          class="faq-item"
          :class="{ 'active': activeIndex === index }"
        >
          <!-- 问题标题 -->
          <button 
            class="faq-question"
            @click="handleClick(index)"
            :aria-expanded="activeIndex === index"
            :aria-controls="`faq-answer-${index}`"
          >
            <div class="question-content">
              <div class="question-number">
                {{ String(index + 1).padStart(2, '0') }}
              </div>
              <span class="question-text">{{ faq.question }}</span>
            </div>
            <div class="question-icon">
              <svg 
                class="icon-chevron" 
                :class="{ 'rotated': activeIndex === index }"
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
              >
                <path 
                  d="M5 7.5L10 12.5L15 7.5" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </button>

          <!-- 答案内容 -->
          <div 
            class="faq-answer"
            :id="`faq-answer-${index}`"
            :class="{ 'expanded': activeIndex === index }"
          >
            <div class="answer-content">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.faq-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.faq-header {
  text-align: center;
  margin-bottom: 3rem;
  
  .faq-subtitle {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #6366f1;
    margin-bottom: 0.5rem;
  }
  
  .faq-title {
    font-size: clamp(1.875rem, 4vw, 2.5rem);
    font-weight: 700;
    line-height: 1.2;
    color: #1f2937;
    margin: 0 0 1.5rem 0;
    background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .faq-divider {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    margin: 0 auto;
    border-radius: 2px;
  }
}

.faq-content {
  display: flex;
  justify-content: center;
}

.faq-wrapper {
  width: 100%;
  max-width: 800px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  border: 1px solid #f3f4f6;
}

.faq-item {
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &.active {
    background: linear-gradient(135deg, #fef7ff 0%, #faf5ff 100%);
  }
}

.faq-question {
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  text-align: left;
  
  &:hover {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    padding-left: 2rem;
  }
  
  &:focus {
    outline: 2px solid #6366f1;
    outline-offset: -2px;
  }
  
  .question-content {
    display: flex;
    align-items: center;
    flex: 1;
    
    .question-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
      border-radius: 50%;
      font-size: 0.875rem;
      font-weight: 600;
      margin-right: 1rem;
      flex-shrink: 0;
    }
    
    .question-text {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      line-height: 1.5;
    }
  }
  
  .question-icon {
    margin-left: 1rem;
    flex-shrink: 0;
    
    .icon-chevron {
      color: #6b7280;
      transition: transform 0.3s ease;
      
      &.rotated {
        transform: rotate(180deg);
      }
    }
  }
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  
  &.expanded {
    max-height: 500px;
  }
  
  .answer-content {
    padding: 0 1.5rem 1.5rem 4.5rem;
    font-size: 1rem;
    line-height: 1.7;
    color: #6b7280;
    
    @media (max-width: 640px) {
      padding: 0 1rem 1.5rem 1rem;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .faq-container {
    padding: 1rem 0.5rem;
  }
  
  .faq-header {
    margin-bottom: 2rem;
  }
  
  .faq-question {
    padding: 1rem;
    
    &:hover {
      padding-left: 1.25rem;
    }
    
    .question-content {
      .question-number {
        width: 28px;
        height: 28px;
        font-size: 0.75rem;
        margin-right: 0.75rem;
      }
      
      .question-text {
        font-size: 1rem;
      }
    }
  }
  
  .faq-answer .answer-content {
    font-size: 0.875rem;
    padding: 0 1rem 1rem 3rem;
  }
}

@media (max-width: 480px) {
  .faq-question .question-content .question-text {
    font-size: 0.9rem;
  }
  
  .faq-answer .answer-content {
    padding: 0 1rem 1rem 1rem;
  }
}

// 动画增强
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.faq-item {
  animation: fadeInUp 0.6s ease forwards;
  
  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
}
</style>