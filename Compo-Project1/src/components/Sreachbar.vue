<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { NewsItem } from '@/types'
import { getNewsList } from '@/service/api'

const props = withDefaults(defineProps<{ modelValue?: string; resultsLimit?: number; placeholder?: string }>(), {
  modelValue: '',
  resultsLimit: 8,
  placeholder: 'Search news topics...',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'select', value: NewsItem): void
}>()

const query = ref(props.modelValue)
const allNews = ref<NewsItem[]>([])
const isLoading = ref(false)
const isOpen = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    allNews.value = await getNewsList()
  } finally {
    isLoading.value = false
  }
})

function normalize(v: unknown): string {
  return String(v ?? '').toLowerCase().trim()
}

const results = computed(() => {
  const q = normalize(query.value)
  if (!q) return []
  return allNews.value
    .filter(n => normalize(n.topic).includes(q))
    .slice(0, props.resultsLimit)
})

function onInput(e: Event) {
  const v = (e.target as HTMLInputElement).value
  query.value = v
  emit('update:modelValue', v)
  isOpen.value = !!v && results.value.length > 0
}

function selectItem(item: NewsItem) {
  emit('select', item)
  isOpen.value = false
}
</script>

<template>
      <div class="relative w-full mx-auto max-w-[1250px]">
      <!-- Search status -->
      <div v-if="query && results.length > 0" class="mb-2 text-sm text-slate-600 dark:text-slate-400">
        🔍 Found {{ results.length }} result{{ results.length !== 1 ? 's' : '' }} for "{{ query }}"
      </div>
    <input
      type="search"
      :value="query"
      :placeholder="props.placeholder"
      @input="onInput"
      @focus="isOpen = results.length > 0"
      @keydown.escape="isOpen = false"
      @keydown.enter="results.length > 0 && selectItem(results[0])"
      class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
      :aria-label="`Search news topics. Press Enter to select first result, Escape to close.`"
    />

    <div v-if="isLoading" class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">Loading…</div>

    <ul
      v-if="isOpen"
      class="absolute z-10 mt-1 max-h-80 w-full overflow-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"
      role="listbox"
    >
      <li
        v-for="item in results"
        :key="item.id"
        @click="selectItem(item)"
        class="cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
        role="option"
      >
        {{ item.topic }}
      </li>
      <li v-if="!results.length" class="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">No results</li>
      <li v-if="results.length > 0" class="px-3 py-2 text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-slate-700">
        💡 Press Enter to select first result, Escape to close
      </li>
    </ul>
  </div>
</template>


