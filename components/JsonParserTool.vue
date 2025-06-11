<template>
  <div class="json-parser-container">
    <!-- 标题区域 -->
    <div class="header">
      <h1 class="title">JSON 结构解析器</h1>
      <p class="subtitle">输入JSON字符串，实时解析并格式化展示结构</p>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-grid">
      <!-- 左侧：JSON输入区域 -->
      <div class="input-panel">
        <div class="panel-header">
          <h2 class="panel-title">JSON 输入</h2>
          <div class="header-buttons">
            <button @click="loadExample" class="btn btn-example">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
              </svg>
              示例
            </button>
            <button @click="formatInput" :disabled="!jsonText.trim()" class="btn btn-format">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              格式化
            </button>
            <button @click="clearAll" class="btn btn-clear">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
              </svg>
              清空
            </button>
          </div>
        </div>
        
        <div class="input-content">
          <textarea
            v-model="jsonText"
            @input="handleInputChange"
            placeholder="请输入JSON字符串..."
            class="json-textarea"
          ></textarea>
          
          <!-- 状态信息 -->
          <div v-if="parseError" class="error-info">
            <svg class="error-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <div class="error-text">
              <strong>解析错误:</strong> {{ parseError }}
            </div>
          </div>
          
          <div v-else-if="parsedData" class="success-info">
            <svg class="success-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div class="success-text">
              <strong>解析成功:</strong> 
              字符 {{ jsonText.length }} | 
              对象 {{ objectCount }} | 
              数组 {{ arrayCount }} | 
              深度 {{ maxDepth }}
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：结构展示区域 -->
      <div class="output-panel">
        <div class="panel-header">
          <h2 class="panel-title">结构展示</h2>
        </div>
        
        <div class="output-content">
          <!-- 空状态 -->
          <div v-if="!jsonText.trim()" class="empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <h3>等待JSON输入</h3>
            <p>请在左侧输入JSON字符串</p>
          </div>

          <!-- 错误状态 -->
          <div v-else-if="parseError" class="error-state">
            <svg class="error-state-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <h3>无法解析JSON</h3>
            <p>请检查JSON格式</p>
          </div>

          <!-- 结构树 -->
          <div v-else class="tree-view">
            <!-- <JsonTreeNode
              :node="parsedData"
              @toggle="toggleNode"
            /> -->
            <TreeShow  :data="parsedData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// 响应式数据
const jsonText = ref('')
const parsedData = ref(null)
const parseError = ref('')
const expandedNodes = ref(new Set())

// 示例数据
const exampleData = {
  "user": {
    "id": 1001,
    "name": "张三",
    "email": "zhang@example.com",
    "active": true,
    "profile": {
      "age": 28,
      "city": "北京",
      "hobbies": ["阅读", "游泳", "编程"],
      "avatar": null
    }
  },
  "products": [
    {
      "id": "p001",
      "name": "笔记本电脑",
      "price": 5999.99,
      "inStock": true
    },
    {
      "id": "p002",
      "name": "无线鼠标",
      "price": 99.99,
      "inStock": false
    }
  ],
  "settings": {
    "theme": "dark",
    "language": "zh-CN",
    "notifications": true
  }
}

// 计算属性
const objectCount = computed(() => {
  return parsedData.value ? countObjects(parsedData.value) : 0
})

const arrayCount = computed(() => {
  return parsedData.value ? countArrays(parsedData.value) : 0
})

const maxDepth = computed(() => {
  return parsedData.value ? getDepth(parsedData.value) : 0
})

// 方法
const handleInputChange = () => {
  parseJson()
}

const parseJson = () => {
  if (!jsonText.value.trim()) {
    parsedData.value = null
    parseError.value = ''
    return
  }

  try {
    parsedData.value = JSON.parse(jsonText.value)
    parseError.value = ''
    console.log(parsedData.value)
  } catch (error) {
    parsedData.value = null
    parseError.value = error.message
  }
}

const formatInput = () => {
  if (!jsonText.value.trim()) return
  
  try {
    const parsed = JSON.parse(jsonText.value)
    jsonText.value = JSON.stringify(parsed, null, 2)
    parseJson()
  } catch (error) {
    parseError.value = error.message
  }
}

const loadExample = () => {
  jsonText.value = JSON.stringify(exampleData, null, 2)
  parseJson()
  // 自动展开根节点
  setTimeout(() => {
    expandedNodes.value = new Set(['root_0'])
  }, 100)
}

const clearAll = () => {
  jsonText.value = ''
  parsedData.value = null
  parseError.value = ''
  expandedNodes.value.clear()
}


const toggleNode = (nodeId) => {
  if (expandedNodes.value.has(nodeId)) {
    expandedNodes.value.delete(nodeId)
  } else {
    expandedNodes.value.add(nodeId)
  }
}

// 辅助函数
const countObjects = (data) => {
  let count = 0
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    count = 1
    Object.values(data).forEach(value => {
      count += countObjects(value)
    })
  } else if (Array.isArray(data)) {
    data.forEach(item => {
      count += countObjects(item)
    })
  }
  return count
}

const countArrays = (data) => {
  let count = 0
  if (Array.isArray(data)) {
    count = 1
    data.forEach(item => {
      count += countArrays(item)
    })
  } else if (typeof data === 'object' && data !== null) {
    Object.values(data).forEach(value => {
      count += countArrays(value)
    })
  }
  return count
}

const getDepth = (data, depth = 0) => {
  if (typeof data !== 'object' || data === null) {
    return depth
  }
  
  let maxDepth = depth
  const values = Array.isArray(data) ? data : Object.values(data)
  
  values.forEach(value => {
    maxDepth = Math.max(maxDepth, getDepth(value, depth + 1))
  })
  
  return maxDepth
}

let nodeCounter = 0

const buildTree = (data, key, level, parentId) => {
  const nodes = []
  const nodeId = `${parentId}_${nodeCounter++}`
  const dataType = getType(data)
  const isExpandable = typeof data === 'object' && data !== null
  const isExpanded = expandedNodes.value.has(nodeId)
  
  // 当前节点
  const node = {
    id: nodeId,
    key: key,
    type: dataType,
    level: level,
    expandable: isExpandable,
    expanded: isExpanded,
    preview: getPreview(data)
  }
  
  nodes.push(node)
  
  // 子节点
  if (isExpandable && isExpanded) {
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        nodes.push(...buildTree(item, `[${index}]`, level + 1, nodeId))
      })
    } else {
      Object.entries(data).forEach(([objKey, objValue]) => {
        nodes.push(...buildTree(objValue, objKey, level + 1, nodeId))
      })
    }
  }
  
  return nodes
}

const getType = (value) => {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value
}

const getPreview = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'string') {
    return value.length > 30 ? `"${value.substring(0, 30)}..."` : `"${value}"`
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  if (Array.isArray(value)) {
    return `Array(${value.length})`
  }
  if (typeof value === 'object') {
    return `Object(${Object.keys(value).length})`
  }
  return String(value)
}

const collectNodeIds = (data, parentId, nodeIds, counter = { value: 0 }) => {
  const nodeId = `${parentId}_${counter.value++}`
  nodeIds.add(nodeId)
  
  if (typeof data === 'object' && data !== null) {
    const values = Array.isArray(data) ? data : Object.values(data)
    values.forEach(() => {
      collectNodeIds(data, nodeId, nodeIds, counter)
    })
  }
}

// 监听数据变化
watch(parsedData, () => {
  nodeCounter = 0
})
</script>

<style scoped>
.json-parser-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a202c;
  margin: 0 0 8px 0;
}

.subtitle {
  font-size: 1.1rem;
  color: #4a5568;
  margin: 0;
}

.main-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 1024px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
}

.input-panel,
.output-panel {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  overflow: hidden;
}

.panel-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.header-buttons {
  display: flex;
  gap: 8px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-example,
.btn-expand {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
}

.btn-format {
  background: white;
  color: #667eea;
}

.btn-clear,
.btn-collapse {
  background: rgba(255,255,255,0.1);
  color: white;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn-icon {
  width: 14px;
  height: 14px;
  stroke-width: 2;
}

.input-content,
.output-content {
  padding: 24px;
}

.json-textarea {
  width: 100%;
  height: 400px;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  outline: none;
  transition: border-color 0.2s ease;
  background: #f8fafc;
}

.json-textarea:focus {
  border-color: #667eea;
  background: white;
}

.json-textarea::placeholder {
  color: #a0aec0;
}

.error-info,
.success-info {
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.error-info {
  background: #fed7d7;
  border: 1px solid #feb2b2;
  color: #c53030;
}

.success-info {
  background: #c6f6d5;
  border: 1px solid #9ae6b4;
  color: #2f855a;
}

.error-icon,
.success-icon {
  width: 18px;
  height: 18px;
}

.output-content {
  height: 500px;
  overflow: auto;
}

.empty-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #718096;
}

.empty-icon,
.error-state-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-state h3,
.error-state h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.empty-state p,
.error-state p {
  margin: 0;
  opacity: 0.8;
}

.tree-view {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 14px;
}

/* 滚动条 */
.output-content::-webkit-scrollbar,
.json-textarea::-webkit-scrollbar {
  width: 8px;
}

.output-content::-webkit-scrollbar-track,
.json-textarea::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.output-content::-webkit-scrollbar-thumb,
.json-textarea::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.output-content::-webkit-scrollbar-thumb:hover,
.json-textarea::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>