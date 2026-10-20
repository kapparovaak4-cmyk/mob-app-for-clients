<template>
  <div
    ref="tabsContainer"
    class="relative flex w-full justify-around border-b border-[#E2E8F0] bg-white"
    role="tablist"
  >
    <button
      v-for="(tab, index) in tabs"
      :key="tab.id"
      :ref="el => setTabRef(el, index)"
      type="button"
      role="tab"
      :aria-selected="activeTab === tab.id"
      class="relative px-3 py-[12px] text-[13px] font-semibold uppercase transition-colors duration-300"
      :class="[
        activeTab === tab.id
          ? 'text-primary'
          : 'text-grey hover:text-primary',
        customClass,
      ]"
      @click="selectTab(tab.id)"
    >
      {{ tab.label }}
    </button>

    <!-- Animated indicator -->
    <span
      class="absolute -bottom-px left-0 h-[1.5px] bg-primary transition-[transform,width] duration-300 ease-out"
      :style="indicatorStyle"
    />
  </div>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

export interface TabItem {
  id: string
  label: string
}

const props = defineProps<{
  tabs: TabItem[]
  modelValue?: string
  customClass?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const route = useRoute()
const router = useRouter()

const tabRefs = ref<HTMLElement[]>([])

const indicatorLeft = ref(0)
const indicatorWidth = ref(0)

const activeTab = computed(() => {
  const hash = route.hash.replace('#', '')

  if (hash && props.tabs.some(tab => tab.id === hash)) {
    return hash
  }

  return props.modelValue || props.tabs[0]?.id || ''
})

const activeIndex = computed(() => {
  const index = props.tabs.findIndex(
    tab => tab.id === activeTab.value
  )

  return index === -1 ? 0 : index
})

const indicatorStyle = computed(() => ({
  width: `${indicatorWidth.value}px`,
  transform: `translateX(${indicatorLeft.value}px)`,
}))

function setTabRef(
  el: Element | ComponentPublicInstance | null,
  index: number
) {
  if (el instanceof HTMLElement) {
    tabRefs.value[index] = el
  }
}

function updateIndicator() {
  const element = tabRefs.value[activeIndex.value]

  if (!element) return

  indicatorLeft.value = element.offsetLeft
  indicatorWidth.value = element.offsetWidth
}

function selectTab(id: string) {
  if (id === activeTab.value) return

  emit('update:modelValue', id)
  emit('change', id)

  router.replace({
    hash: `#${id}`,
  })
}

watch(
  activeIndex,
  async () => {
    await nextTick()
    updateIndicator()
  },
)

onMounted(async () => {
  await nextTick()

  updateIndicator()
  window.addEventListener('resize', updateIndicator)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIndicator)
})
</script>