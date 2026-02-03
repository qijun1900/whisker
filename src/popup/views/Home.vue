<template>
  <div class="home">
    <PopupHeader />

    <PopupContent>
      <div class="vendor-list">
        <VendorItem
          v-for="vendor in vendors"
          :key="vendor.id"
          :name="vendor.name"
          :url="vendor.url"
          :color="vendor.color"
          @edit="handleEdit(vendor.id)"
          @delete="handleDelete(vendor.id)"
          @copy="handleCopy(vendor.id)"
          @open="handleOpen(vendor.id)"
          @favorite="handleFavorite(vendor.id)"
        />
      </div>
    </PopupContent>
    <PopupFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PopupHeader from '../components/PopupHeader.vue'
import PopupContent from '../components/PopupContent.vue'
import PopupFooter from '../components/PopupFooter.vue'
import VendorItem from '../../components/VendorItem.vue'

interface Vendor {
  id: number
  name: string
  url: string
  color: string
}

// 示例数据
const vendors = ref<Vendor[]>([
  {
    id: 1,
    name: 'ChatGPT',
    url: 'chat.openai.com',
    color: '#10B981'
  },
  {
    id: 2,
    name: 'Claude',
    url: 'claude.ai',
    color: '#F59E0B'
  },
  {
    id: 3,
    name: 'Gemini',
    url: 'gemini.google.com',
    color: '#3B82F6'
  },
  {
    id: 4,
    name: 'Midjourney',
    url: 'www.midjourney.com',
    color: '#475569'
  },
  {
    id: 5,
    name: 'DeepSeek',
    url: 'chat.deepseek.com',
    color: '#6366F1'
  },
  {
    id: 6,
    name: 'Perplexity',
    url: 'www.perplexity.ai',
    color: '#14B8A6'
  },
  {
    id: 7,
    name: 'Copilot',
    url: 'copilot.microsoft.com',
    color: '#0EA5E9'
  },
  {
    id: 8,
    name: 'Llama',
    url: 'www.llama.com',
    color: '#8B5CF6'
  },
  {
    id: 9,
    name: 'Cohere',
    url: 'cohere.com',
    color: '#EC4899'
  },
  {
    id: 10,
    name: 'Mistral',
    url: 'mistral.ai',
    color: '#F97316'
  },
  {
    id: 11,
    name: 'Anthropic',
    url: 'www.anthropic.com',
    color: '#EAB308'
  },
  {
    id: 12,
    name: 'Hugging Face',
    url: 'huggingface.co',
    color: '#22C55E'
  }
])

const handleEdit = (id: number) => {
  console.log('Edit vendor:', id)
}

const handleDelete = (id: number) => {
  console.log('Delete vendor:', id)
  vendors.value = vendors.value.filter(v => v.id !== id)
}

const handleCopy = (id: number) => {
  const vendor = vendors.value.find(v => v.id === id)
  if (vendor) {
    navigator.clipboard.writeText(`https://${vendor.url}`)
    console.log('Copied:', vendor.url)
  }
}

const handleOpen = (id: number) => {
  const vendor = vendors.value.find(v => v.id === id)
  if (vendor) {
    window.open(`https://${vendor.url}`, '_blank')
  }
}

const handleFavorite = (id: number) => {
  console.log('Favorite vendor:', id)
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.vendor-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
